import React, { useState } from 'react';
import './SignIn.css';
import { auth } from './firebase';

function SignIn({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setIsSignedIn(true)
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`signin-modal ${isSignedIn ? 'fade-out' : 'fade-in'}`}>
      <div className="login-overlay">
          <div id="loginModal" class="modal">
              <div class="modal-content">
                  <div className="modal-body">
                  <h3 className="title">Sign in</h3>
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
                          placeholder="Enter your password"
                          required
                      />
                      </div>

                      <button type="button" onClick={handleSignIn}>
                        Sign in
                      </button>

                      <a href='#' type="button" onClick={onToggle}>
                        Sign up
                      </a>
                  </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default SignIn;