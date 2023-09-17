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
    const postsRef = db.collection("posts").orderBy("timestamp", "desc");
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

    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Upload the image to Firebase Storage (if one is selected)
    if (tweetImage) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`images/${tweetImage.name}`);
      imageRef.put(tweetImage).then(() => {
        // Get the download URL for the uploaded image
        imageRef.getDownloadURL().then((imageUrl) => {
          // Add the post to Firestore with the image URL
          db.collection("posts").add({
            displayName: "sleepy",
            username: "shouldsleep",
            verified: true,
            text: tweetMessage,
            image: imageUrl, // Use the image URL
            avatar:
              "https://e0.pxfuel.com/wallpapers/136/142/desktop-wallpaper-cute-dog-pomeranian-golden-dog-thumbnail.jpg",
            timestamp: timestamp,
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
        displayName: "sleepy",
        username: "shouldsleep",
        verified: true,
        text: tweetMessage,
        avatar:
          "https://e0.pxfuel.com/wallpapers/136/142/desktop-wallpaper-cute-dog-pomeranian-golden-dog-thumbnail.jpg",
        timestamp: timestamp,
        });

      // Clear the form fields
      setTweetMessage("");
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://e0.pxfuel.com/wallpapers/136/142/desktop-wallpaper-cute-dog-pomeranian-golden-dog-thumbnail.jpg" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="มีอะไรเกิดขึ้นบ้าง"
            type="text"
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

        <div className="tweetBox__imageInput">
          <input
            onChange={handleImageChange} // Handle image file input change
            type="file"
            accept="image/*" // Allow only image files
          />
          <div className="icon">
            <div className="element">
            <InsertPhotoIcon/>
            </div>
            <div className="element">
            <GifIcon />
            </div>
            <div className="element">
            <BallotIcon />
            </div>
            <div className="element">
            <SentimentSatisfiedAltIcon />
            </div>
            <div className="element">
            <ScheduleIcon />
            </div>
          </div>
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
