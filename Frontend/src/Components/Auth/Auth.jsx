import React, { useState } from "react";
import "./Auth.css";
import InputForm from "../Input/Input";
import Button from "../Button/Button";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = () => {
		e.preventDefault();
		setEmail("");
		setPassword("");
	};
	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="login-form">
				<h1>Log In To Your Account:</h1>

				<InputForm
					type="email"
					width={"25rem"}
					length={"2rem"}
					placeholder={"Enter your email:"}
					className="email-input"
					value={email}
					onChange={handleEmailChange}
				/>
				<InputForm
					type="password"
					width={"25rem"}
					length={"2rem"}
					placeholder={"Enter your password:"}
					className="password-input"
					value={password}
					onChange={handlePasswordChange}
				/>
				<Button
					background={"#7bb3df"}
					color={"white"}
					width={"15rem"}
					height={"2rem"}
					text={'Submit'}
					hoverColorClass='login-button:hover'
					className="login-button"/>
			</form>
		</>
	);
}

export default Login;
