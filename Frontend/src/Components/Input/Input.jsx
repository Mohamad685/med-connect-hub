import React from "react";
import './Input.css';
function InputForm({ type, width, length, placeholder,onChange }) {
	const inputStyle = {
		width: width,
        height: length,
	};

	return (
		<>
			<input
				type={type}
				onChange={onChange}
				style={inputStyle}
				placeholder={placeholder}
				className="input-box"
			/>
		</>
	);
}

export default InputForm;
