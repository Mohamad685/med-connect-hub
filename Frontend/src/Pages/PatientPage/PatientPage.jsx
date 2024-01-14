import React from "react";
import OptionsBox from "../../Components/Options/Options";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import "./PatientPage.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";

function PatientPreview() {
	const patientData = {
		fullName: "John Doe",
		labResults: "Lab result data here...",
		symptoms: "Symptoms data here...",
		diagnosis: "Diagnosis data here...",
		prescription: "Prescription data here...",
	};

	return (
		<div className="patient-page">
			<OptionsBox margin={"4rem 2rem 2rem 2rem"} />

			<div className="patient-data-form">
				<p className="patient-name">{patientData.fullName}</p>
				<div className="patient-preview-section1">
					<ProfilePic />
					<div className="">
						<PreviewBox />
					</div>
				</div>
			</div>
		</div>
	);
}

export default PatientPreview;
