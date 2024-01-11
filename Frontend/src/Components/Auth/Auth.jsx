import React from "react";
import "./Auth.css";
import InputForm from "../Input/Input";

function Login() {
	return (
		<>
			<div className="login-form">
				<InputForm
					type="text"
					width={"25rem"}
					length={"2rem"}
					placeholder={"Enter your email"}
					className="email-input"
				/>

				
			</div>
		</>
	);
}

export default Login;
