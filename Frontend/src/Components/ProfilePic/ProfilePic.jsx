import React from "react";

function ProfilePic({imageUrl}){
    return(
        <div>
            <img src={imageUrl} alt="profile-pic"  className="profile-pic-style"/>
        </div>
    )
}

export default ProfilePic;