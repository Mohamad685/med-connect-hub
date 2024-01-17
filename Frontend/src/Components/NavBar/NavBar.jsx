import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Login from "../Auth/Auth";

function NavBar() {
	const [showLogin, setShowLogin] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);

	const toggleLogin = () => {
		setShowLogin(!showLogin);
		const mainContent = document.getElementById("main-content");
		if (mainContent) {
			mainContent.classList.toggle("blurred");
		}
	};

	const scrollTo = (sectionId) => {
		document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		return () => {
			document.body.classList.remove("blurred");
		};
	}, []);

	return (
		<>
			<div className="navbar">
				<img
					src="/pics/logo.png"
					className="navbar-pic"
					alt="logo"></img>
				<img
					src="/pics/slogan.png"
					className="navbar-slogan"
					alt="logo"></img>
				<ul className="navbar-list">
					<li className="navbar-option">
						<Link
							to="/"
							className="navbar-link">
							Home
						</Link>
					</li>
					<li
						className="navbar-option"
						onClick={() => scrollTo("aboutus")}>
						About Us
					</li>
					<li
						className="navbar-option"
						onClick={() => scrollTo("services")}>
						Services
					</li>
					<li
						className="navbar-option"
						onClick={() => scrollTo("Contact")}>
						Contact Us
					</li>
					<li
						className="navbar-option"
						onClick={toggleLogin}>
						Login
					</li>
				</ul>
			</div>
			{showLogin &&
				!authenticated &&
				ReactDOM.createPortal(
					<Login
						onClose={toggleLogin}
					/>,
					document.getElementById("modal-root")
				)}
		</>
	);
}

export default NavBar;
