import React from "react";
import './ProfilePic.css';
function ProfilePic({imageUrl}){
    return(
        <div className="profile-pic-container">
            <img src={imageUrl} alt="profile-pic"  className="profile-pic-style"/>
        </div>
    )
}

export default ProfilePic;