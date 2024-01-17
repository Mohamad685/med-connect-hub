import React from "react";
import "./Footer.css";

function Footer() {
	return (
		<>
			<div
				className="footer"
				id="Contact">
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
						<a href="tel:+70685425">70-685425</a>
						<a
							href="https://www.google.com/maps?q=33.839189687166126, 35.49682043061652"
							target="_blank">
							Airport Street
						</a>
						<a href="mailto:mohammad.fakih685@gmail.com">
							mohammad.fakih685@gmail.com
						</a>
					</div>
					<div className="contact-icons social-media">
						<img
							src="../../../public/pics/facebook.png"
							alt="facebook"
						/>
						<img
							src="../../../public/pics/github-mark.png"
							alt="gmail"
						/>
						<img
							src="../../../public/pics/linkedin.png"
							alt="linkedin"
						/>
					</div>
					<div className="contact-icons contact-info">
						<a href="https://www.facebook.com" target="_blank" >Med-Hub Platform</a>
						<a href="https://github.com/Mohamad685" target="_blank">Mohammad Fakih</a>
						<a href="https://www.linkedin.com/in/fakih-mohamad" target="_blank"> Mohammad Fakih
						</a>
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
