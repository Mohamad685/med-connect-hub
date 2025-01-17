import React from "react";
import "./HomePage.css";
import Carousel from "../../Components/Carousal/InfoCarousal";
import { Link } from "react-router-dom";

function HomePage() {
	return (
		<>
			<div
				className="home-page"
				id="home">
				<div className="hero-section">
					<img
						src="/pics/hero.png"
						alt="hero"
						className="hero-pic"
					/>
				</div>
				<span
					className="title-start"
					id="about-us">
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
					the way. To further empower this vision, we are integrating advanced
					analytics and AI-driven insights to personalize healthcare experiences
					and optimize treatment outcomes for each individual.
				</span>
				<hr className="custom-line" />

				<span
					className="title-start title-end"
					id="services">
					Our <span className="title-start">Services</span>
				</span>
				<div className="services-pics">
					<Link to="/patient-file">
						{" "}
						<img
							src="/pics/patient.png"
							alt="patient"
						/>
					</Link>
					<Link to="/patients-doctor">
						<img
							src="/pics/doctor.png"
							alt="doctor"
						/>
					</Link>
					<Link to="/insurance-page">
						<img
							src="/pics/insurance.png"
							alt="insurance"
						/>
					</Link>

					<p>
						Patients gain instant access to healthcare professionals and
						insurance management, along with personalized care, secure
						messaging, and convenient management of appointments, records, and
						claims in one place.
					</p>
					<p>
						Doctors can broaden their reach and streamline their practice,
						engage with patients securely, manage appointments efficiently, and
						coordinate effortlessly with insurance providers for hassle-free
						patient care.
					</p>
					<p>
						Insurance companies can connect directly with patients and
						providers, simplify claim processing, reduce costs, and improve
						satisfaction through a centralized hub for policy management and
						inquiries.
					</p>
				</div>
				<hr className="custom-line" />

				<div className="all-options">
					<div className="option">
						<img
							src="/pics/calendar.svg"
							alt="calender-icon"
						/>
						<span>Schedule with Ease</span>
						<p>
							Efficiently manage and book your appointments with just a few
							clicks.
						</p>
					</div>
					<div className="option">
						<img
							src="/pics/alert.svg"
							alt="alert-icon"
						/>
						<span>Stay Informed</span>
						<p>
							Get real-time updates and notifications about your health and
							appointments.
						</p>
					</div>
					<div className="option">
						<img
							src="/pics/privacy.svg"
							alt="privacy-icon"
						/>
						<span>Your Privacy Matters</span>
						<p>
							Experience secure messaging and confidentiality with every
							interaction.
						</p>
					</div>
				</div>
				<div className="all-options">
					<div className="option">
						<img
							src="/pics/daily.svg"
							alt="daily-icon"
						/>
						<span>24/7 Accessibility</span>
						<p>
							{" "}
							Access healthcare services and information anytime, anywhere.
						</p>
					</div>
					<div className="option">
						<img
							src="/pics/network.svg"
							alt="network-icon"
						/>
						<span>Seamless Coordination</span>
						<p>
							Connect effortlessly with doctors and insurance providers for
							integrated care.
						</p>
					</div>
					<div className="option">
						<img
							src="/pics/users.svg"
							alt="users-icon"
						/>
						<span>Tailored for You</span>
						<p>
							Enjoy a personalized healthcare journey suited to your unique
							needs.
						</p>
					</div>
				</div>
				<div>
					<Carousel />
				</div>
			</div>
		</>
	);
}

export default HomePage;

