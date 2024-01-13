import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import "./ProfilePic.css";
const ProfilePic = () => {
	const [preview, setPreview] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/")) {
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleBoxClick = () => {
		fileInputRef.current.click();
	};

	const handleUpload = async () => {
		const file = fileInputRef.current.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("image", file);

		try {
			const response= await axios.post("/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
		} catch (error) {}
	};

	return (
		<div>
			<div
				onClick={handleBoxClick}
                className="pic-box"
				>
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
			{preview && <Button onClick={handleUpload}>Upload Image</Button>}
		</div>
	);
};

export default ProfilePic;
