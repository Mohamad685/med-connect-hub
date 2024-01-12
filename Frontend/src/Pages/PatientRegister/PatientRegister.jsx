import React from "react";
import OptionsBox from "../../Components/Options/Options";
import "./PatientRegister.css";

function PatientRegister() {
	return (
		<div className="patient-reg-page">
			<OptionsBox
				margin={"4rem 2rem 2rem 2rem"}
				className="options-style"
			/>
            <p>Create Patient Profile</p>
		</div>
	);
}

export default PatientRegister;
