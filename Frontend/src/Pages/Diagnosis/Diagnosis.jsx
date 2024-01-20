import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";
import fetchHelper from "../../Components/Functions/FetchFunction";

function Diagnosis() {
	const location = useLocation();
	const patientData = location.state?.patientData;
	const patientId = patientData ? patientData.id : null;
	
	const [symptomDescription, setSymptomDescription] = useState("");
	const [labResult, setLabResult] = useState("");
	const [diagnosisDescription, setDiagnosisDescription] = useState("");
	const [prescription, setPrescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = {
			patient_id: patientId,
			symptom_description: symptomDescription,
			result: labResult,
			diagnosis_description: diagnosisDescription,
			medication_description: prescription,
		};
		try {
			const response = await fetchHelper.post(
				"/diagnosis",
				formData
			);
			console.log("Data submitted successfully:", response);
		} catch (error) {
			console.error("Error during data submission:", error);
		}
	};
	return (
		<div className="patient-page">
			<OptionsBox margin={"7rem 2rem 2rem 2rem"} />

			<div className="diagnosis-data-form">
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
							onChange={(e) => setSymptomDescription(e.target.value)}
						/>
						<TextArea
							width={"60rem"}
							length={"18rem"}
							placeholder={"Lab Results:"}
							onChange={(e) => setLabResult(e.target.value)}
						/>
						<TextArea
							width={"60rem"}
							length={"18rem"}
							placeholder={"Diagnosis:"}
							onChange={(e) => setDiagnosisDescription(e.target.value)}
						/>
						<TextArea
							width={"60rem"}
							length={"18rem"}
							placeholder={"Prescriptions:"}
							onChange={(e) => setPrescription(e.target.value)}
						/>
						<Button
							width={"14rem"}
							height={"3rem"}
							color={"white"}
							fontSize="1.15rem"
							text={"Submit"}
							onClick={handleSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Diagnosis;
