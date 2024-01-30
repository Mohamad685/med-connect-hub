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
	const [profile_pic, setProfilePic] = useState('null');
	const [userNameError, setUserNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");
	const [formMessage, setFormMessage] = useState("");
	const [insurance_company_id, setInsuranceCompanyId] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [customGender, setCustomGender] = useState("");
	const [showCustomGenderInput, setShowCustomGenderInput] = useState(false);

	const handleGenderChange = (e) => {
		const selectedGender = e.target.value;
		setGender(selectedGender);

		if (selectedGender === "Other") {
			setShowCustomGenderInput(true);
		} else {
			setShowCustomGenderInput(false);
			setCustomGender(""); // Reset custom gender if not 'Other'
		}
	};

	const navigate = useNavigate();

	// const handlePasswordChange = (e) => {
	// 	setpassword(e.target.value);
	// 	validatePassword(e.target.value);
	// };

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
		setInsuranceCompanyId("");
	};

	const commonPasswords = [
		"123456",
		"password",
		"12345678",
		"qwerty",
		"12345",
		"123456789",
		"letmein",
		"1234567",
		"football",
		"iloveyou",
		"admin",
		"welcome",
		"monkey",
		"login",
		"abc123",
		"starwars",
		"123123",
		"dragon",
		"passw0rd",
		"master",
	];

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setpassword(newPassword);

		if (commonPasswords.includes(newPassword)) {
			setPasswordError(
				"The password is common. Please choose a strong password."
			);
		} else {
			setPasswordError("");
		}
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

		if (gender === "Other" && customGender) {
			formData.append("gender", customGender);
		  } else {
			formData.append("gender", gender);
		  }


		if (commonPasswords.includes(password)) {
			setPasswordError(
				"The chosen password is too common. Please choose a different password."
			);
			return;
		}

		if (profile_pic) {
			formData.append("profile_pic", profile_pic);
		}

		try {
			const response = await fetchHelper.post("/register-patient", formData);

			clearFields();
			setFormMessage(response.message);

			const patientData = {
				id: response.patient.id,
				firstName: response.patient.first_name,
				lastName: response.patient.last_name,
				profilePic: response.profile_pic_url,
			};

			navigate(`/diagnosis/${response.patient.id}`, {
				state: {
					patientData: {
						...patientData,
						profilePic: response.profile_picture_url,
					},
					description,
					medication_description,
				},
			});
		} catch (error) {
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
					<ProfilePic onFileSelect={handleProfilePicSelect} />
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
							{passwordError && <p className="error">{passwordError}</p>}

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
							<select
								value={gender}
								onChange={handleGenderChange}
								width={"23rem"}
								length={"2rem"}>
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>

							{showCustomGenderInput && (
								<InputForm
									type="text"
									value={customGender}
									onChange={(e) => setCustomGender(e.target.value)}
									width={"23rem"}
									length={"2rem"}
									placeholder={"Custom Gender"}
								/>
							)}

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
								length={"4rem"}
								textAlign={"text-top"}
								placeholder={"Address"}
							/>

							<TextArea
								value={description}
								onChange={(e) => setMedicalHistory(e.target.value)}
								width={"48rem"}
								length={"8rem"}
								placeholder={"Medical History"}
							/>

							<TextArea
								value={medication_description}
								onChange={(e) => setMedicationHistory(e.target.value)}
								width={"48rem"}
								length={"8rem"}
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
