import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Login from "../Auth/Auth";

function NavBar() {
	const [showLogin, setShowLogin] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);
	const navigate = useNavigate();

	
    const isAuthenticated = localStorage.getItem("token");
	const username = `${localStorage.getItem("firstName")}${localStorage.getItem("lastName")}`;
	const toggleLogin = () => {
        
		if (isAuthenticated) {
            localStorage.clear();
            navigate("/"); 
        } else {
            setShowLogin(!showLogin);
        }
    };

	
	const scrollTo = (id) => {
		const navbarHeight = 75;
		const element = document.getElementById(id);
		if (element) {
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - navbarHeight;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

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
					<li
						className="navbar-option"
						onClick={() => scrollTo("home")}>
						<Link
							to="/"
							className="navbar-link">
							Home
						</Link>
					</li>
					<li
						className="navbar-option"
						onClick={() => scrollTo("about-us")}>
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
						{isAuthenticated ? username : 'Login'}

					</li>
				</ul>
			</div>
			{showLogin &&
				!authenticated &&
				ReactDOM.createPortal(
					<div className="modal-overlay">
						<Login onClose={toggleLogin} />
					</div>,
					document.getElementById("modal-root")
				)}
		</>
	);
}

export default NavBar;
