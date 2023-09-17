import React, { useState } from 'react';
import './SignUp.css';
import { auth } from './firebase';
import { Button } from "@material-ui/core";

function SignUp({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpComplete, setSignUpComplete] = useState(false);

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setSignUpComplete(true);
      alert('Sign up Successful!');
    }
    catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please use a different email.');
      }
      else {
        alert('Cannot sign up, please try again');
        console.error(error);
      }
    }
  };

  return (
    <div className="login-overlay">
        <div id="loginModal" class="modal">
            <div class="modal-content">
                <div className="modal-body">
                <h3 className="title">Create your account</h3>
                <form>
                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        class="form-control"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="at lest 6 characters"
                        required
                    />
                    </div>

                    <Button variant="outlined" className="sidebar__tweet" fullWidth  onClick={ handleSignUp }>
                        Sign up
                    </Button>

                    <a href='#' type="button" onClick={onToggle}>
                        Sign in
                    </a>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SignUp;