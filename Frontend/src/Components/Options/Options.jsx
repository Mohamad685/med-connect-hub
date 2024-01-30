import React from "react";
import "./Options.css";
import { Link, useLocation } from "react-router-dom";

function OptionsBox({ margin }) {
	const location = useLocation();

	const optionStyle = {
		margin: margin,
	};
	const isDiagnosisRoute = () => {
		const diagnosisPattern = /^\/diagnosis\/\d+$/;
		return diagnosisPattern.test(location.pathname);
	};
	const isPatientInsurancePage = () => {
		const insurancePattern = /^\/patient-insurance-page\/\d+$/;
		return insurancePattern.test(location.pathname);
	};
	return (
		<div
			style={optionStyle}
			className="options-box">
			{(location.pathname === "/patient-registration" ||
				isDiagnosisRoute() ||
				location.pathname === "/patients-doctor") && (
				<>
					<Link to="/patient-registration">Create Patient Profile</Link>
					<Link to="/patients-doctor">Patients List</Link>
				</>
			)}

			{isPatientInsurancePage() && <Link to="/insurance-page">Patients</Link>}

			{(location.pathname === "/patient-registration" ||
				location.pathname === "/patient-file" ||
				isDiagnosisRoute() ||
				location.pathname === "/patients-doctor") && (
				<>
					<Link to="/live-chat">Live Chat</Link>
				</>
			)}
			<Link to="/send-email">Send Email</Link>
		</div>
	);
}

export default OptionsBox;
