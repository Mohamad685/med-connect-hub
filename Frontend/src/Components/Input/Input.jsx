import React from "react";

function InputForm({ width, length, placeholder }) {
	const inputStyle = {
		width: width,
        height: length,
	};

	return (
		<>
			<input
				type="text"
				style={inputStyle}
				placeholder={placeholder}
			/>
		</>
	);
}

export default InputForm;
