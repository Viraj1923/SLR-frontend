import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../pages/firebase/firebaseConfig";
import { AuthContext } from "../../Authcontext";
import { FiUser } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem("user");
            navigate("/login");
        } catch (error) {
            console.error("Logout Error:", error.message);
            alert("Failed to logout. Please try again.");
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="nav">
            <img src="/main-logo.png" alt="Logo" className="nav-logo" />
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/detect">Detect</Link>

                <div className="profile-dropdown" ref={dropdownRef}>
                    <FiUser
                        size={28}
                        className="profile-icon"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                    />
                    <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                        {currentUser ? (
                            <>
                                {currentUser.photoURL && (
                                    <img
                                        src={currentUser.photoURL}
                                        alt="Profile"
                                        className="dropdown-profile-photo"
                                    />
                                )}
                                <p className="dropdown-user-name">
                                    👤{currentUser.displayName || "No Name"}
                                </p>
                                <p className="dropdown-user-email">
                                    📧{currentUser.email}
                                </p>

                                <button className="button-dropdown" onClick={handleLogout}>🔓Logout</button>
                            </>
                        ) : (
                            <>
                                <button className="button-dropdown-out" onClick={() => navigate("/login")}>Login</button>&nbsp;
                                <button className="button-dropdown-out" onClick={() => navigate("/signup")}>Signup</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
