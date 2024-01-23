import { React, useState } from "react";
import OptionsBox from "../../Components/Options/Options";
import "./PatientRegister.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import InputForm from "../../Components/Input/Input";
import Button from "../../Components/Button/Button";
import TextArea from "../../Components/TextArea/TextArea";
import fetchHelper from "../../Components/Functions/FetchFunction";
import { useNavigate } from "react-router-dom";

function PatientRegister() {
	const [user_name, setUsername] = useState("");
	const [password, setpassword] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [gender, setGender] = useState("");
	const [age, setAge] = useState("");
	const [address, setAddress] = useState("");
	const [description, setMedicalHistory] = useState("");
	const [medication_description, setMedicationHistory] = useState("");
	const [profile_pic, setProfilePic] = useState(null);
	const [userNameError, setUserNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");
	const [formMessage, setFormMessage] = useState("");
	const [insurance_company_id, setInsuranceCompanyId] = useState("");



	const navigate = useNavigate();

	const clearFields = () => {
		setUsername("");
		setpassword("");
		setFirstName("");
		setLastname("");
		setEmail("");
		setPhoneNumber("");
		setGender("");
		setAge("");
		setAddress("");
		setMedicalHistory("");
		setMedicationHistory("");
		setProfilePic("null");
		setInsuranceCompanyId('');
	};
	const handleProfilePicSelect = (file) => {
        setProfilePic(file);
    };

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("user_name", user_name);
		formData.append("password", password);
		formData.append("first_name", first_name);
		formData.append("last_name", last_name);
		formData.append("email", email);
		formData.append("phone_number", phone_number);
		formData.append("gender", gender);
		formData.append("age", age);
		formData.append("address", address);
		formData.append("insurance_company_id", insurance_company_id);
		formData.append("description", description);
		formData.append("medication_description", medication_description);
		
		if (profile_pic) {
			formData.append("profile_pic", profile_pic);
		}

		try {
			const response = await fetchHelper.post("/register-patient", formData);

			console.log("Registration successful:", response);
			clearFields();
			setFormMessage(response.message);

			const patientData = {
				id: response.patient.id,
				firstName: response.patient.first_name,
				lastName: response.patient.last_name,
				profilePic: response.profile_pic_url
			};

			navigate("/diagnosis", { state: { patientData: { ...patientData, profilePic: response.profile_picture_url }, description, medication_description } });
		} catch (error) {
			console.error("Error during registration:", error);
			const errors = error.response?.data?.errors;
			if (errors) {
				const errorList = (
					<ul>
						{Object.values(errors)
							.flat()
							.map((msg, index) => (
								<li
									key={index}
									style={{ color: "red" }}>
									{msg}
								</li>
							))}
					</ul>
				);
				setFormMessage(errorList);
			} else {
				setFormMessage("An error occurred during registration.");
			}
		}
	};
	return (
		<div className="patient-reg-page">
			<OptionsBox
				margin={"7rem 2rem 2rem 2rem"}
				className="options-style"
			/>

			<div className="patient-reg-form">
				<p className="patient-reg-title">Create Patient Profile</p>
				<div className="patient-reg-section1">
					<ProfilePic onFileSelect={handleProfilePicSelect}/>
					<div className="patient-form-input">
						{formMessage && <p className="error">{formMessage}</p>}

						<div className="patient-reg-input">
							<InputForm
								type="text"
								value={user_name}
								onChange={(e) => setUsername(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Username"}
							/>
							{userNameError && <p className="error">{userNameError}</p>}

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
							{emailError && <p className="error">{emailError}</p>}

							<InputForm
								type="number"
								value={phone_number}
								onChange={(e) => setPhoneNumber(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Phone Number"}
							/>
							{phoneNumberError && <p className="error">{phoneNumberError}</p>}
							
							<InputForm
								type="number"
								value={insurance_company_id}
								onChange={(e) => setInsuranceCompanyId(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Insurance Company no."}
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
								type="number"
								value={age}
								onChange={(e) => setAge(e.target.value)}
								width={"23rem"}
								length={"2rem"}
								placeholder={"Age"}
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
			</div>
		</div>
	);
}

export default PatientRegister;
