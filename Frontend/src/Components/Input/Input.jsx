import React from "react";
import './Input.css';
function InputForm({ type, width, length, placeholder,onChange,error }) {
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
			{/* <p>{error}</p> */}
		</>
	);
}

export default InputForm;
