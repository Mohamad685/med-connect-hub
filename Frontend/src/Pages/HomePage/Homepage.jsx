import React from "react";
import "./HomePage.css";
import Carousel from "../../Components/Carousal/InfoCarousal";

function HomePage() {
	return (
		<>
			<div className="home-page">
				<div className="hero-section">
					<img
						src="../../../public/pics/hero.png"
						alt="hero"
						className="hero-pic"
					/>
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
					the way. To further empower this vision, we are integrating advanced
					analytics and AI-driven insights to personalize healthcare experiences
					and optimize treatment outcomes for each individual.
				</span>
				<hr className="custom-line"/>

				<span className="title-start title-end">
					Our<span className="title-start">Services</span>
				</span>
				<div className="services-pics">
					<img
						src="../../../public/pics/patient.png"
						alt="patient"
					/>
					<img
						src="../../../public/pics/doctor.png"
						alt="doctor"
					/>
					<img
						src="../../../public/pics/insurance.png"
						alt="insurance"
					/>
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
				{/* <img
					src="../../../public/pics/hero2.jpg"
					alt="hero2"
					className="hero-section hero2-pic"
				/> */}

				<div className="all-options">
					<div className="option">
						<img
							src="../../../public/pics/calendar.svg"
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
							src="../../../public/pics/alert.svg"
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
							src="../../../public/pics/privacy.svg"
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
							src="../../../public/pics/daily.svg"
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
							src="../../../public/pics/network.svg"
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
							src="../../../public/pics/users.svg"
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
