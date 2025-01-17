import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import InputForm from "../Input/Input";
import Button from "../Button/Button";
import fetchHelper from "../Functions/FetchFunction";

function Login({ onClose }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const navigate = useNavigate();
	const handleClose = () => {
		onClose();
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		setEmailError("");
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		setPasswordError("");
	};

	const validateEmail = (email) => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let valid = true;

		if (!email || !validateEmail(email)) {
			setEmailError("Please enter a valid email.");
			valid = false;
		}

		if (!password) {
			setPasswordError("Please enter your password.");
			valid = false;
		}

		if (valid) {
			try {
				const response = await fetchHelper.post("login", {
					email,
					password,
				});
				const userName = response.user.user_name;

				const token = response.authorisation && response.authorisation.token;
				if (token) {
					localStorage.setItem("token", token);

					
					const firstName = response.first_name;
					const lastName = response.last_name;
					const userRole = response.user.role;
					const userId=response.user.id;

					
					if (userRole === "admin") {
						navigate("/admin");
					
					} else if (userRole === "doctor") {
						
						const doctorId = response.doctor_id;
						localStorage.setItem("doctorId", doctorId);
						localStorage.setItem("userName", userName);
						localStorage.setItem("firstName", firstName);
						localStorage.setItem("lastName", lastName);
						localStorage.setItem("userRole",userRole);
						localStorage.setItem("userId",userId);

						navigate("/patients-doctor");
					
					} else if (userRole === "patient") {
						
						const patientId = response.patient_id;
						localStorage.setItem("firstName", firstName);
						localStorage.setItem("lastName", lastName);
						localStorage.setItem("userName", userName);
						localStorage.setItem("patientId", patientId);
						localStorage.setItem("userRole",userRole);
						localStorage.setItem("userId",userId);
						navigate("/patient-file");
					
					} else if (userRole === "insurance") {
						
						const insuranceId = response.user.insurance_company.id;
						const insuranceName = response.insurance_company_name;
						localStorage.setItem("userName", userName);
						localStorage.setItem("insuranceName", insuranceName);
						localStorage.setItem("InsuranceId", insuranceId);
						navigate("/insurance-page");
					} else {
					}
					setEmail("");
					setPassword("");
					handleClose();
				} else {
				}
			} catch (error) {
				setEmailError("Invalid email or password.");
				setPasswordError("Invalid email or password.");
			}
		}
	};

	return (
		<>
			<div className="login-form">
				<button
					onClick={handleClose}
					className="close-button">
					X
				</button>
				<h1>Log In</h1>
				<InputForm
					type="email"
					width={"25rem"}
					length={"2.5rem"}
					placeholder={"Enter your email"}
					value={email}
					onChange={handleEmailChange}
				/>
				{emailError && <div className="error">{emailError}</div>}

				<InputForm
					type="password"
					width={"25rem"}
					length={"2.5rem"}
					placeholder={"Enter your password"}
					value={password}
					onChange={handlePasswordChange}
				/>
				{passwordError && <div className="error">{passwordError}</div>}

				<Button
					color={"white"}
					width={"14rem"}
					height={"2.5rem"}
					text={"Login"}
					classNames={"button-style"}
					onClick={handleSubmit}
				/>
			</div>
		</>
	);
}

export default Login;
