import React, { useEffect } from "react";
import "./Options.css";
import { Link, useLocation } from "react-router-dom";

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
				location.pathname === "/diagnosis") && (
				<>
					<Link to='/patient-registration'>Create Patient Profile</Link>
					<Link to="/patients-list">Patients List</Link>
				</>
			)}
			<Link to="/live-chat">Live Chat</Link>
			<Link to="/send-email">Send Email</Link>
			<Link to="/notifications">Notifications</Link>
		</div>
	);
}

export default OptionsBox;
