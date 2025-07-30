import React, { useState } from "react";
import "./Login.css";
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";



const Form = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Google Login
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Google login successful!");
            navigate("/");
        } catch (error) {
            console.error("Google Sign-in Error:", error.message);
            toast.error("Failed to sign in with Google");
        }
    };

    // Email/Password Login
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            localStorage.setItem("user", JSON.stringify(user));
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (error) {
            console.error("Email Sign-in Error:", error.message);
            toast.error("Invalid email or password.");
        }
    };

    // Forgot Password
    const handleForgotPassword = async () => {
        if (!email) {
            toast.warn("Please enter your email first.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            toast.info("Password reset email sent!");
        } catch (error) {
            console.error("Password Reset Error:", error.message);
            toast.error("Failed to send password reset email.");
        }
    };



    return (
        <div className="login-wrapper">
            <div className="form-container">
                <p className="title-login">Login</p>

                <form className="form" onSubmit={handleEmailLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
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
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="forgot">
                            <button
                                type="button"
                                className="forgot-link"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>

                    </div>

                    <button type="submit" className="sign">Sign in</button>
                </form>

                <div className="social-message">
                    <div className="line" />
                    <p className="message">Login with Google account</p>
                    <div className="line" />
                </div>

                <div className="social-icons">
                    <button aria-label="Log in with Google" className="icon" onClick={handleGoogleLogin}>
                        <img
                            src="/google-icon.png"
                            alt="Sign in with Google"
                            className="google-icon"
                        />
                    </button>
                </div>

                <p className="signup">
                    Don't have an account? <a href="/signup">Sign up</a>
                </p>

            </div>
        </div>
    );
};

export default Form;
