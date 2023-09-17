import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import SignIn from './SignIn';
import SignUp from './SignUp';

function App() {
  // State to control the visibility of the login form
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleSignInSignUp = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="app">
      {showSignIn ? (
        <SignIn onToggle={toggleSignInSignUp} />
      ) : (
        <SignUp onToggle={toggleSignInSignUp} />
      )}

      <Sidebar />
      <Feed />
      <Widgets />

    </div>
  );
}

export default App;
