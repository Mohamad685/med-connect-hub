import { React, useState } from "react";
import OptionsBox from "../../Components/Options/Options";
import "./PatientRegister.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import InputForm from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import TextArea from "../../Components/TextArea/TextArea";
import fetchHelper from "../../Components/Functions/FetchFunction";

function PatientRegister() {
	const [user_name, setUsername] = useState("");
	const [password, setpassword] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [gender, setGender] = useState("");
	const [date_of_birth, setBirthdate] = useState("");
	const [address, setAddress] = useState("");
	const [description, setMedicalHistory] = useState("");
	const [medication_description, setMedicationHistory] = useState("");

	const [userNameError, setUserNameError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [firstNameError, setFirstNameError] = useState("");
const [lastNameError, setLastNameError] = useState("");
const [emailError, setEmailError] = useState("");
const [phoneNumberError, setPhoneNumberError] = useState("");
const [genderError, setGenderError] = useState("");
const [birthDateError, setBirthdateError] = useState("");
const [addressError, setAddressError] = useState("");
const [medicalHistoryError, setMedicalHistoryError] = useState("");
const [medicationHistoryError, setMedicationHistoryError] = useState("");

const validateInput = () =>{
	let isValid=true;

	if(!user_name){
		setUserNameError('Username is required')
		isValid=false;
	}else{
		setUserNameError("");
	}

	if(!password){
		setPasswordError('Password is required')
		isValid=false;
	}else{
		setPasswordError("");
	}
	
	if(!email){
		setEmailError('Email is required')
		isValid=false;
	}else{
		setEmailError("");
	}
	if(!first_name){
		setFirstNameError('Firstname is required')
		isValid=false;
	}else{
		setFirstNameError("");
	}
	if(!last_name){
		setLastNameError('Lastname is required')
		isValid=false;
	}else{
		setLastNameError("");
	}
	if(!phone_number){
		setPhoneNumberError('Phonenumber is required')
		isValid=false;
	}else{
		setPhoneNumberError("");
	}
	if(!gender){
		setGenderError('Gender is required')
		isValid=false;
	}else{
		setGenderError("");
	}
	if(!date_of_birth){
		setBirthdateError('Birthdate is required')
		isValid=false;
	}else{
		setBirthdateError("");
	}
	if(!address){
		setAddressError('Address is required')
		isValid=false;
	}else{
		setAddressError("");
	}
	if(!description){
		setMedicalHistoryError('Medical History is required')
		isValid=false;
	}else{
		setMedicalHistoryError("");
	}
	if(!medication_description){
		setMedicationHistoryError('Medication History is required')
		isValid=false;
	}else{
		setMedicationHistoryError("");
	}

}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = {
			user_name,
			password,
			first_name,
			last_name,
			email,
			phone_number,
			gender,
			date_of_birth,
			address,
			description,
			medication_description,
		};
		try {
			const response = await fetchHelper.post("/register-patient", formData);
			console.log(response);
			clearFields();

			
		} catch (error) {
			console.error(error);
		}
		
		const clearFields= () =>{
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
		}
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
								value={user_name}
								onChange={(e) => setUsername(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Username"}
							/>
							<InputForm
								type="password"
								onChange={(e) => setpassword(e.target.value)}
								value={password}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Password"}
							/>
							<InputForm
								type="text"
								value={first_name}
								onChange={(e) => setFirstName(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"First Name"}
							/>
							<InputForm
								type="text"
								value={last_name}
								onChange={(e) => setLastname(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Last Name"}
							/>
							<InputForm
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Email"}
							/>
							<InputForm
								type="number"
								value={phone_number}
								onChange={(e) => setPhoneNumber(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Phone Number"}
							/>
							<InputForm
								type="text"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Gender"}
							/>
							<InputForm
								type="date"
								value={date_of_birth}
								onChange={(e) => setBirthdate(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Date Of Birth"}
							/>
						</div>
						<div className="address-input-div">
							<TextArea
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								width={"48rem"}
								length={"8rem"}
								textAlign={"text-top"}
								placeholder={"Address"}
							/>
							<TextArea
								value={description}
								onChange={(e) => setMedicalHistory(e.target.value)}
								width={"48rem"}
								length={"18rem"}
								placeholder={"Medical History"}
							/>
							<TextArea
								value={medication_description}
								onChange={(e) => setMedicationHistory(e.target.value)}
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
