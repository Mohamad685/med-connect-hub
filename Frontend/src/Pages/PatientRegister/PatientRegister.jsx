import React from "react";
import OptionsBox from "../../Components/Options/Options";
import "./PatientRegister.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import InputForm from "../../Components/Input/Input";

function PatientRegister() {
	return (
		<div className="patient-reg-page">
			<OptionsBox
				margin={"4rem 2rem 2rem 2rem"}
				className="options-style"
			/>

			<form className="patient-reg-form">
				<p className="patient-reg-title">Create Patient Profile</p>
				<div className="patient-reg-section1">
					<ProfilePic
						src={""}
						className="patient-reg-pic"
					/>
					<div className="patient-reg-input">
						<InputForm
							type="text"
							width={"23rem"}
							length={"1rem"}
							placeholder={"Username"}
						/>
						<InputForm
							type="password"
							width={"23rem"}
							length={"1rem"}
							placeholder={"Password"}
						/>
						<InputForm
							type="text"
							width={"23rem"}
							length={"1rem"}
							placeholder={"First Name"}
						/>
						<InputForm
							type="text"
							width={"23rem"}
							length={"1rem"}
							placeholder={"Last Name"}
						/>
						<InputForm
							className="email-input"
							type="email"
							width={"23rem"}
							length={"1rem"}
							placeholder={"Email"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default PatientRegister;
