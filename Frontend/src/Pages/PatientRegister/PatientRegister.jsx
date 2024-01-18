import {React,useState} from "react";
import OptionsBox from "../../Components/Options/Options";
import "./PatientRegister.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import InputForm from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import TextArea from "../../Components/TextArea/TextArea";
import axios from "axios";

function PatientRegister() {
	const[username,setUsername]=useState("");
	const[password,setpassword]=useState("");
	const[FirstName,setFirstName]=useState("");
	const[username,setUsername]=useState("");
	const[username,setUsername]=useState("");
	const[username,setUsername]=useState("");

	return (
		<div className="patient-reg-page">
			<OptionsBox
				margin={"7rem 2rem 2rem 2rem"}
				className="options-style"
			/>

			<form className="patient-reg-form">
				<p className="patient-reg-title">Create Patient Profile</p>
				<div className="patient-reg-section1">
					<ProfilePic
					/>
					<div className="patient-form-input">
						<div className="patient-reg-input">
							<InputForm
								type="text"
								width={"23rem"}
								length={"2rem"}
								placeholder={"Username"}
							/>
							<InputForm
								type="password"
								width={"23rem"}
								length={"2rem"}
								placeholder={"Password"}
							/>
							<InputForm
								type="text"
								width={"23rem"}
								length={"2rem"}
								placeholder={"First Name"}
							/>
							<InputForm
								type="text"
								width={"23rem"}
								length={"2rem"}
								placeholder={"Last Name"}
							/>
							<InputForm
								type="email"
								width={"23rem"}
								length={"2rem"}
								placeholder={"Email"}
							/>
							<InputForm
								type="text"
								width={"23rem"}
								length={"2rem"}
								placeholder={"Phone Number"}
							/>
							<InputForm
								type="text"
								width={"23rem"}
								length={"2rem"}
								placeholder={"Gender"}
							/>
							<InputForm
								type="date"
								width={"23rem"}
								length={"2rem"}
								placeholder={"Date Of Birth"}
							/>
						</div>
						<div className="address-input-div">
							<TextArea
								width={"48rem"}
								length={"8rem"}
								textAlign={"text-top"}
								placeholder={"Address"}
							/>
							<TextArea
								width={"48rem"}
								length={"18rem"}
								placeholder={"Medical History"}
							/>
							<TextArea
								width={"48rem"}
								length={"18rem"}
								placeholder={"Medication History"}
							/>
							<Button
								width={"14rem"}
								height={"3rem"}
								color={"white"}
								fontSize='1.15rem'
								text={'Submit'}/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default PatientRegister;
