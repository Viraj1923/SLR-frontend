import React, { useState } from "react";
import "./Signup.css";
import { toast } from "react-toastify";


import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("Signup successful:", user);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Signup error:", error.message);
            toast.error("Signup failed: " + error.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google sign-up successful");
            toast.success("Google account created successfully!");
            navigate('/');
        } catch (error) {
            console.error("Google sign-up error:", error.message);
            toast.error("Signup failed: " + error.message);
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="form-container">
                <p className="title-signup">Sign Up</p>

                <form className="form" onSubmit={handleSignup}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="sign">Create Account</button>
                </form>

                <div className="social-message">
                    <div className="line"></div>
                    <p className="message">or sign up with</p>
                    <div className="line"></div>
                </div>

                <div className="social-icons">
                    <div className="icon" onClick={handleGoogleSignup}>
                        <img src="/google-icon.png" alt="Google" className="google-icon" />
                    </div>
                </div>


                <p className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
