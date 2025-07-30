import React from "react";
import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {user ? (
        <div className="profile-card">
          <img
            src={
              user.photoURL
                ? user.photoURL
                : "https://via.placeholder.com/100?text=No+Image"
            }
            alt="Profile"
            className="profile-image"
          />
          <p><strong>Name:</strong> {user.displayName || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
