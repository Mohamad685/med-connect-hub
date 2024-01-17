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

				if (response.data.user.role === "admin") navigate("/admin");
				else if (response.data.user.role === "doctor")
					navigate("/patient-registration");
				else if (response.data.user.role === "patient")
					navigate("/patient-file");
				else if (response.data.user.role === "insurance")
					navigate("/insurance-page");

				setEmail("");
				setPassword("");
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<>
			<form
				className="login-form"
				onSubmit={handleSubmit}>
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
				/>
			</form>
		</>
	);
}

export default Login;
