import React from "react";
import './TextArea.css';
function TextArea({  width, length, placeholder, onChange}) {
	const textStyle = {
		width: width,
        height: length,
	};

	return (
		<>
			<textarea
				style={textStyle}
				placeholder={placeholder}
				className="text-box"
				onChange={onChange}
			/>
		</>
	);
}

export default TextArea;
