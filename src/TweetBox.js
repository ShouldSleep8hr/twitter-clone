import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase/app";
import "firebase/storage";
import CancelIcon from '@material-ui/icons/Cancel';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import GifIcon from '@material-ui/icons/Gif';
import BallotIcon from '@material-ui/icons/Ballot';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import ScheduleIcon from '@material-ui/icons/Schedule';

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState(null); // Use null for the initial value of the image
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  useEffect(() => {
    // Update the image preview whenever the selected image changes
    if (tweetImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(tweetImage);
    }
    else {
      setImagePreview(null);
    }
  }, [tweetImage]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setTweetImage(e.target.files[0]);
    }
  };

  const deleteImage = () => {
    setTweetImage(null);
    setImagePreview(null);
  };

  const sendTweet = (e) => {
    e.preventDefault();

    // Upload the image to Firebase Storage (if one is selected)
    if (tweetImage) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${tweetImage.name}`);
      imageRef.put(tweetImage).then(() => {
        // Get the download URL for the uploaded image
        imageRef.getDownloadURL().then((imageUrl) => {
          // Add the post to Firestore with the image URL
          db.collection("posts").add({
            displayName: "Rafeh Qazi",
            username: "cleverqazi",
            verified: true,
            text: tweetMessage,
            image: imageUrl, // Use the image URL
            avatar:
              "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
          });

          // Clear the form fields
          setTweetMessage("");
          setTweetImage(null);
          setImagePreview(null);
        });
      });
    }
    else {
      // If no image is selected, add the post without an image URL
      db.collection("posts").add({
        displayName: "Rafeh Qazi",
        username: "cleverqazi",
        verified: true,
        text: tweetMessage,
        avatar:
          "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
      });

      // Clear the form fields
      setTweetMessage("");
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="มีอะไรเกิดขึ้นบ้าง"
            type="text"
          />
        </div>

        <div className="tweetBox__imageInput">
          <InsertPhotoIcon/>
          <input
            onChange={handleImageChange} // Handle image file input change
            type="file"
            accept="image/*" // Allow only image files
          />
        </div>

        {imagePreview && ( // Display the image preview
          <div className="tweetBox__imagePreview">
            <CancelIcon
              type="button"
              onClick={deleteImage}
              className="tweetBox__deleteButton"
            />
            <img src={imagePreview} alt="Image Preview" />
          </div>
        )}

        <div>
          <GifIcon />
          <BallotIcon />
          <SentimentSatisfiedAltIcon />
          <ScheduleIcon />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
          disabled={!tweetMessage && !imagePreview}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;


// import React, { useState, useEffect } from "react";
// import "./TweetBox.css";
// import { Avatar, Button } from "@material-ui/core";
// import db from "./firebase";
// import firebase from "firebase/app";
// import "firebase/storage";
// import CancelIcon from "@material-ui/icons/Cancel";
// import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";

// function TweetBox() {
//   const [tweetMessage, setTweetMessage] = useState("");
//   const [tweetImages, setTweetImages] = useState([]); // Use an array for image files
//   const [imagePreviews, setImagePreviews] = useState([]); // State for image previews

//   useEffect(() => {
//     // Update the image previews whenever the selected images change
//     const previews = [];
//     for (const image of tweetImages) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         previews.push(e.target.result);
//         if (previews.length === tweetImages.length) {
//           setImagePreviews(previews);
//         }
//       };
//       reader.readAsDataURL(image);
//     }
//   }, [tweetImages]);

//   const handleImageChange = (e) => {
//     const selectedImages = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
//     setTweetImages(selectedImages);
//   };

//   const deleteImage = (index) => {
//     const newImages = [...tweetImages];
//     newImages.splice(index, 1);
//     setTweetImages(newImages);
//   };

//   const sendTweet = (e) => {
//     e.preventDefault();

//     // Upload the selected images to Firebase Storage (if any)
//     const uploadPromises = tweetImages.map((image) => {
//       const storageRef = firebase.storage().ref();
//       const imageRef = storageRef.child(`images/${image.name}`);
//       return imageRef.put(image).then(() => imageRef.getDownloadURL());
//     });

//     Promise.all(uploadPromises).then((imageUrls) => {
//       const postPromises = imageUrls.map((imageUrl) =>
//         db.collection("posts").add({
//           displayName: "Rafeh Qazi",
//           username: "cleverqazi",
//           verified: true,
//           text: tweetMessage,
//           image: imageUrl,
//           avatar:
//             "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
//         })
//       );

//       Promise.all(postPromises).then(() => {
//         // Clear the form fields
//         setTweetMessage("");
//         setTweetImages([]);
//         setImagePreviews([]);
//       });
//     });
//   };

//   return (
//     <div className="tweetBox">
//       <form>
//         <div className="tweetBox__input">
//           <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
//           <input
//             onChange={(e) => setTweetMessage(e.target.value)}
//             value={tweetMessage}
//             placeholder="What's happening?"
//             type="text"
//           />
//         </div>

//         <div className="tweetBox__imageInput">
//           <InsertPhotoIcon />
//           <input
//             onChange={handleImageChange} // Handle image file input change
//             type="file"
//             accept="image/*" // Allow only image files
//             multiple // Allow multiple image selection
//           />
//         </div>

//         {imagePreviews.map((preview, index) => (
//           <div key={index} className="tweetBox__imagePreview">
//             <CancelIcon
//               type="button"
//               onClick={() => deleteImage(index)}
//               className="tweetBox__deleteButton"
//             />
//             <img src={preview} alt={`Image Preview ${index}`} />
//           </div>
//         ))}

//         <Button
//           onClick={sendTweet}
//           type="submit"
//           className="tweetBox__tweetButton"
//         >
//           Tweet
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default TweetBox;
