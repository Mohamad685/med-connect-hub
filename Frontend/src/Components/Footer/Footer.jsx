import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<>
			<div className="footer">
				<div className="footer-in">
					<div className="contact-icons">
						<img
							src="../../src/assets/pics/phone.png"
							alt="phone"
						/>
						<img
							src="../../src/assets/pics/location.png"
							alt="location"
						/>
						<img
							src="../../src/assets/pics/mail.png"
							alt="mail"
						/>
					</div>
					<div className="contact-icons contact-info">
						<p>70-685425</p>
						<p>Airport Street</p>
						<p>mohammad.fakih685@gmail.com</p>
					</div>
					<div className="contact-icons social-media">
						<img
							src="../../src/assets/pics/facebook.png"
							alt="facebook"
						/>
						<img
							src="../../src/assets/pics/google.png"
							alt="gmail"
						/>
						<img
							src="../../src/assets/pics/linkedin.png"
							alt="linkedin"
						/>
					</div>
				</div>
			</div>
			<div className="copyright">
				<p>© 2024 Med-Hub. All rights reserved.</p>
			</div>
		</>
	);
}

export default Footer;
