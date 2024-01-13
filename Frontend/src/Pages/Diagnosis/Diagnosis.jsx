import React from "react";
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";

function Diagnosis() {
	return (
		<>
			<div className="patient-reg-page">
				<OptionsBox margin={"4rem 2rem 2rem 2rem"} />

				<form className="patient-reg-form">
					<p className="patient-reg-title">Create Patient Profile</p>
					<div className="patient-reg-section1">
						<ProfilePic />
						<div className="patient-form-input">
							<div className="address-input-div">
								<TextArea
									width={"48rem"}
									length={"8rem"}
									textAlign={"text-top"}
									placeholder={"Address"}
								/>
								<TextArea
									width={"48rem"}
									length={"18rem"}
									placeholder={"Medical History"}
								/>
								<TextArea
									width={"48rem"}
									length={"18rem"}
									placeholder={"Medication History"}
								/>
								<Button
									width={"48rem"}
									height={"3rem"}
									color={"white"}
									fontSize="1.15rem"
									text={"Submit"}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default Diagnosis;
