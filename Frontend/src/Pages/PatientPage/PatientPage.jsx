import React from "react";
import OptionsBox from "../../Components/Options/Options";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import "./PatientPage.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";

function PatientPreview() {

	return (
		<div className="patient-page">
			<OptionsBox margin={"4rem 2rem 2rem 2rem"} />

			<div className="patient-data-form">
				<p className="patient-name">Mohammad Fakih</p>
				<div className="patient-preview-section1">
					<ProfilePic />
					<div className="patient-preview-boxes">
						<PreviewBox
							width={"48rem"}
							height={"auto"}
                            title={"Lab Results:"}
                            text={"Hello word"}
						/>
						<PreviewBox
							width={"48rem"}
							height={"auto"}
                            title={"Symptoms:"}
                            text={"Hello word"}
						/>
                        <PreviewBox
							width={"48rem"}
							height={"auto"}
                            title={"Diagnosis:"}
                            text={"Hello word"}
						/>
                        <PreviewBox
							width={"48rem"}
							height={"auto"}
                            title={"Prescription:"}
                            text={"Hello word"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PatientPreview;
