import React from "react";
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";

function Patientpreview() {
	return (
		<>
			<div className="patient-reg-page">
				<OptionsBox margin={"4rem 2rem 2rem 2rem"} />

				<form className="patient-reg-form">
					<p className="patient-reg-title">Patient Full Name</p>
					<div className="patient-reg-section1">
						<ProfilePic />
						<div className="patient-form-input">
							<div className="address-input-div">
								<TextArea
									width={"48rem"}
									length={"8rem"}
									textAlign={"text-top"}
									placeholder={"Lab Results"}
								/>
								<TextArea
									width={"48rem"}
									length={"18rem"}
									placeholder={"Symptoms"}
								/>
								<TextArea
									width={"48rem"}
									length={"18rem"}
									placeholder={"Patientpreview"}
								/>
                                <TextArea
									width={"48rem"}
									length={"18rem"}
									placeholder={"Prescription"}
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

export default Patientpreview;
