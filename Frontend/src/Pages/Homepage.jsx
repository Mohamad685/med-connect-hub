import React from "react";
import "./HomePage.css";

function HomePage() {
	return (
		<>
			<div className="home-page">
				<div className="hero-section">
					<img
						src="../../src/assets/pics/hero.png"
						alt="hero"
						className="hero-pic"></img>
				</div>
				<span className="title-start">
					What We <span className="title-start title-end">Do</span>
				</span>
				<span className="mission-text">
					{" "}
					To streamline healthcare management by connecting patients, doctors,
					and insurance providers on a single, secure platform. Our mission is
					to enhance communication and collaboration between all parties,
					improving access to care, simplifying healthcare processes, and
					promoting informed health decisions. We're committed to delivering a
					user-friendly experience that facilitates real-time conversations,
					seamless information exchange, and comprehensive support every step of
					the way.
				</span>
                <span>Our<span>Services</span></span>
			</div>
		</>
	);
}

export default HomePage;
