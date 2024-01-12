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
            <p>Create Patient Profile</p>
            {/* <div>
				<ProfilePic
				src=""/>
                
            </div> */}
		</div>
	);
}

export default PatientRegister;
