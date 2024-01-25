import React from "react";
import "./Options.css";
import { Link, useLocation } from "react-router-dom";

function OptionsBox({ margin }) {
	const location = useLocation();

	const optionStyle = {
		margin: margin,
	};

	const pattern = /^\/patient-insurance-page\/\d+$/;

	return (
		<div
			style={optionStyle}
			className="options-box">
			{(location.pathname === "/patient-registration" ||
				location.pathname === "/diagnosis" || location.pathname === "/patients-doctor" ) && (
				<>
					<Link to='/patient-registration'>Create Patient Profile</Link>
					<Link to="/patients-doctor">Patients List</Link>
				</>
			)}
            {pattern.test(location.pathname) && <Link to='/insurance-page'>Patients</Link>}
			<Link to="/live-chat">Live Chat</Link>
			<Link to="/send-email">Send Email</Link>
			<Link to="/notifications">Notifications</Link>
		</div>
	);
}

export default OptionsBox;
