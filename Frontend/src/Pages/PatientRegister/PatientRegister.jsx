import React from "react";
import OptionsBox from "../../Components/Options/Options";
import "./PatientRegister.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";

function PatientRegister() {
	return (
		<div className="patient-reg-page">
			<OptionsBox
				margin={"4rem 2rem 2rem 2rem"}
				className="options-style"
			/>

			<form className="patient-reg-form">
				<p className="patient-reg-title">Create Patient Profile</p>

				<ProfilePic src={""} 
				className="patient-reg-pic"/>
			</form>
		</div>
	);
}

export default PatientRegister;
