import React from "react";
import './Input.css';
function InputForm({ width, length, placeholder }) {
	const inputStyle = {
		width: width,
        height: length,
	};

	return (
		<>
			<input
				style={inputStyle}
				placeholder={placeholder}
				className="input-box"
			/>
		</>
	);
}

export default InputForm;
