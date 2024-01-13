import React from "react";
import './Input.css';
function InputForm({ type, width, length, placeholder }) {
	const inputStyle = {
		width: width,
        height: length,
	};

	return (
		<>
			<input
				type={type}
				style={inputStyle}
				placeholder={placeholder}
				className="input-box"
			/>
		</>
	);
}

export default InputForm;
