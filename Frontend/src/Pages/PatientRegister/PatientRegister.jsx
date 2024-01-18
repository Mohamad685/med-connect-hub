import { React, useState } from "react";
import OptionsBox from "../../Components/Options/Options";
import "./PatientRegister.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import InputForm from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import TextArea from "../../Components/TextArea/TextArea";
import fetchHelper from "../../Components/Functions/FetchFunction";

function PatientRegister() {
	const [username, setUsername] = useState("");
	const [password, setpassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [gender, setGender] = useState("");
	const [birthDate, setBirthdate] = useState("");
	const [address, setAddress] = useState("");
	const [medicalHistory, setMedicalHistory] = useState("");
	const [medicationHistory, setMedicationHistory] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			username,
			password,
			firstName,
			lastname,
			email,
			phoneNumber,
			gender,
			birthDate,
			address,
			medicalHistory,
			medicationHistory,
		};
		try{
			const response= await fetchHelper.post('register-patient',formData)
			console.log(response.data);
		}catch (error) {
			console.error(error);
		}
		setUsername("");
		setpassword("");
		setFirstName("");
		setLastname("");
		setEmail("");
		setPhoneNumber("");
		setGender("");
		setBirthdate("");
		setAddress("");
		setMedicalHistory("");
		setMedicationHistory("");

	};

	return (
		<div className="patient-reg-page">
			<OptionsBox
				margin={"7rem 2rem 2rem 2rem"}
				className="options-style"
			/>

			<form className="patient-reg-form">
				<p className="patient-reg-title">Create Patient Profile</p>
				<div className="patient-reg-section1">
					<ProfilePic />
					<div className="patient-form-input">
						<div className="patient-reg-input">
							<InputForm
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Username"}
							/>
							<InputForm
								type="password"
								onChange={(e)=>setpassword(e.target.value)}
								value={password}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Password"}
							/>
							<InputForm
								type="text"
								value={firstName}
								onChange={(e)=>setFirstName(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"First Name"}
							/>
							<InputForm
								type="text"
								value={lastname}
								onChange={(e)=>setLastname(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Last Name"}
							/>
							<InputForm
								type="email"
								value={email}
								onChange={(e)=>setEmail(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Email"}
							/>
							<InputForm
								type="text"
								value={phoneNumber}
								onChange={(e)=>setPhoneNumber(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Phone Number"}
							/>
							<InputForm
								type="text"
								value={gender}
								onChange={(e)=>setGender(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Gender"}
							/>
							<InputForm
								type="date"
								value={birthDate}
								onChange={(e)=>setBirthdate(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Date Of Birth"}
							/>
						</div>
						<div className="address-input-div">
							<TextArea
								value={address}
								onChange={(e)=>setAddress(e.target.value)}
								width={"48rem"}
								length={"8rem"}
								textAlign={"text-top"}
								placeholder={"Address"}
							/>
							<TextArea
								value={medicalHistory}
								onChange={(e)=>setMedicalHistory(e.target.value)}
								width={"48rem"}
								length={"18rem"}
								placeholder={"Medical History"}
							/>
							<TextArea
								value={medicationHistory}
								onChange={(e)=>setMedicationHistory(e.target.value)}
								width={"48rem"}
								length={"18rem"}
								placeholder={"Medication History"}
							/>
							<Button
								width={"14rem"}
								height={"3rem"}
								color={"white"}
								fontSize="1.15rem"
								text={"Submit"}
								onClick={handleSubmit}
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}

export default PatientRegister;
