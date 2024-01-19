import React, { useEffect } from "react";
import "./Options.css";
import { useLocation } from "react-router-dom";

function OptionsBox({ margin }) {
	const location = useLocation();
	
	const optionStyle = {
		margin: margin,
	};
	return (
		<div
			style={optionStyle}
			className="options-box">
			{(location.pathname === "/patient-registration" ||
				location.pathname === "/diagnosis" )&& (
					<>
						<a href="">Create Patient Profile</a>
						<a href="">Patients List</a>
					</>
				)}
			<a href="">Live Chat</a>
			<a href="">Send Email</a>
			<a href="">Notifications</a>
		</div>
	);
}

export default OptionsBox;
