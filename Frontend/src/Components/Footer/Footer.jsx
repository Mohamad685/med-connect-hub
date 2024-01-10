import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<>
			<div className="footer">
				<div className="footer-in">
					<div className="contact-icons">
						<img src="../../src/assets/pics/phone.png" alt="phone"/>
						<img src="../../src/assets/pics/location.png" alt="location"/>
						<img src="../../src/assets/pics/mail.png" alt="mail"/>
					</div>
					<div className="contact-info">
						<p>70-685425</p>
						<p>Airport Street</p>
						<p>mohammad.fakih685@gmail.com</p>
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
