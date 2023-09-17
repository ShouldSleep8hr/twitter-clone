import React, { useState } from 'react';
import './SignUp.css';
import { auth } from './firebase';

function SignUp({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    }
    catch (error) {
      console.error(error);
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
                        placeholder="Enter your password"
                        required
                    />
                    </div>

                    <button type="button" onClick={() => { handleSignUp(); onToggle(); }}>
                        Sign up
                    </button>
                    <button type="button" onClick={onToggle}>
                        Sign in
                    </button>
                </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SignUp;