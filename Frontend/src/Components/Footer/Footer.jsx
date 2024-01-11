import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<>
			<div className="footer">
				<div className="footer-in">
					<div className="contact-icons">
						<img
							src="../../../public/pics/phone.png"
							alt="phone"
						/>
						<img
							src="../../../public/pics/location.png"
							alt="location"
						/>
						<img
							src="../../../public/pics/mail.png"
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
							src="../../../public/pics/facebook.png"
							alt="facebook"
						/>
						<img
							src="../../../public/pics/google.png"
							alt="gmail"
						/>
						<img
							src="../../../public/pics/linkedin.png"
							alt="linkedin"
						/>
					</div>
					<div className="contact-icons contact-info">
						<a href="https://www.facebook.com">Med-Hub Platform</a>
						<a href="https://gmail.com">Mohammad Fakih</a>
						<a href="https://linkedin.com">Mohammad Fakih</a>
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
