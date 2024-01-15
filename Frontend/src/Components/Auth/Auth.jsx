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
				<h1>Log In</h1>

				<InputForm
					type="email"
					width={"25rem"}
					length={"2.5rem"}
					placeholder={"Enter your email:"}
					className="email-input"
					value={email}
					onChange={handleEmailChange}
				/>
				<InputForm
					type="password"
					width={"25rem"}
					length={"2.5rem"}
					placeholder={"Enter your password:"}
					className="password-input"
					value={password}
					onChange={handlePasswordChange}
				/>
				<Button
					color={"white"}
					width={"14rem"}
					height={"2.5rem"}
					text={'Login'}
					classNames={["button-style"]}
					/>
			</form>
		</>
	);
}

export default Login;
