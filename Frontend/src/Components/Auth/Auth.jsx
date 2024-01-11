import React from "react";
import "./Auth.css";
import InputForm from "../Input/Input";
import Button from "../Button/Button";

function Login() {
	return (
		<>
			<div className="login-form">
				<h1>Log In To Your Account:</h1>
				<InputForm
					type="text"
					width={"25rem"}
					length={"2rem"}
					placeholder={"Enter your email:"}
					className="email-input"
				/>
				<InputForm
					type="text"
					width={"25rem"}
					length={"2rem"}
					placeholder={"Enter your password:"}
					className="password-input"
				/>
				<Button
					background={"#7bb3df"}
					color={"white"}
					width={"15rem"}
					height={"2rem"}
					className="login-button">
					Submit
				</Button>
			</div>
		</>
	);
}

export default Login;
