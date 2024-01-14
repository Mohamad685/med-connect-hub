import React from "react";
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";

function Diagnosis() {

	return (
		<div className="patient-page">
			<OptionsBox margin={"4rem 2rem 2rem 2rem"} />

			<div className="patient-data-form">
				<p className="patient-name">Mohammad Fakih</p>
				<div className="patient-preview-section1">
					<div className="patient-preview-boxes">
						<PreviewBox
							width={"60rem"}
							height={"auto"}
                            title={"Medical History:"}
                            text={"Hello word"}
						/>
						<PreviewBox
							width={"60rem"}
							height={"auto"}
                            title={"Medication History:"}
                            text={"Hello word"}
						/>
						<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Symptoms:"}
							/>
							<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Lab Results:"}
							/>
							<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Diagnosis:"}
							/>
							<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Prescriptions:"}
							/>
							<Button/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Diagnosis;
