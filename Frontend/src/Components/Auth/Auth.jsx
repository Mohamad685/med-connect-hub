import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import InputForm from "../Input/Input";
import Button from "../Button/Button";

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
				const response = await axios.post("http://localhost:8000/login", {
					email,
					password,
				});

				localStorage.setItem("token", response.data.token);

				switch (response.data.user.role) {
					case "admin":
						navigate("/admin");
						break;
					case "doctor":
						navigate("/patient-registration");
						break;
					case "patient":
						navigate("/patient-file");
						break;
					case "insurance":
						navigate("/insurance-page");
						break;
					default:
						break;
				}

				setEmail("");
				setPassword("");
			} catch (error) {
				console.error(error);
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
					placeholder={"Enter your email:"}
					value={email}
					onChange={handleEmailChange}
				/>
				{emailError && <div className="error">{emailError}</div>}

				<InputForm
					type="password"
					width={"25rem"}
					length={"2.5rem"}
					placeholder={"Enter your password:"}
					value={password}
					onChange={handlePasswordChange}
				/>
				{passwordError && <div className="error">{passwordError}</div>}

				<Button
					color={"white"}
					width={"14rem"}
					height={"2.5rem"}
					text={"Login"}
					classNames={["button-style"]}
					onClick={handleSubmit}
				/>
			</div>
		</>
	);
}

export default Login;
