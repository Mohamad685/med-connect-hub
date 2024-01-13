import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";

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
			const response = await axios.post("/upload", formData, {
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
				style={{
					width: "200px",
					height: "200px",
					border: "1px solid black",
					cursor: "pointer",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
					fontSize: "16px",
				}}>
				{!preview && <span>Add Profile Pic</span>}
				{preview && (
					<img
						src={preview}
						alt="Preview"
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
