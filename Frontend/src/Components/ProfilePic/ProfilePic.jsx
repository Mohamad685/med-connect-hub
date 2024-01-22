import React, { useRef, useState } from "react";
import "./ProfilePic.css";
const ProfilePic = ({ onFileSelect }) => {
	const [preview, setPreview] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setPreview(URL.createObjectURL(file));
			onFileSelect(file);
		}
	};

	const handleBoxClick = () => {
		fileInputRef.current.click();
	};

	return (
		<div
			onClick={handleBoxClick}
			className="pic-box">
			{!preview && <span>Add Profile Pic</span>}
			{preview && (
				<img
					src={preview}
					alt="Preview"
					className="profile-pic"
				/>
			)}
			<input
				type="file"
				style={{ display: "none" }}
				onChange={handleFileChange}
				ref={fileInputRef}
			/>
		</div>
	);
};

export default ProfilePic;
