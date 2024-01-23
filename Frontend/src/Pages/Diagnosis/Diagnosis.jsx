import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";
import fetchHelper from "../../Components/Functions/FetchFunction";
import { useDispatch } from "react-redux";
import { setDiagnosisData } from "../../Redux/Actions/DiagnosisActions";

function Diagnosis() {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState("");

	const patientData = location.state?.patientData;

	//Extract data passed from patient registration
	const patientId = patientData ? patientData.id : null;
	const patientFirstName = patientData
		? patientData.firstName
		: "" || "No User";
	const patientLastName = patientData ? patientData.lastName : "";
	const medicalHistory = location.state?.description;
	const medicationHistory = location.state?.medication_description;
	const { profilePic } = location.state?.patientData || {};
	console.log(profilePic);

	const [symptomError, setSymptomError] = useState(false);
	const [labResultError, setLabResultError] = useState(false);
	const [diagnosisError, setDiagnosisError] = useState(false);
	const [prescriptionError, setPrescriptionError] = useState(false);
	const [symptomDescription, setSymptomDescription] = useState("");
	const [labResult, setLabResult] = useState("");
	const [diagnosisDescription, setDiagnosisDescription] = useState("");
	const [prescription, setPrescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		setSymptomError(false);
		setLabResultError(false);
		setDiagnosisError(false);
		setPrescriptionError(false);

		if (!symptomDescription) setSymptomError(true);
		if (!labResult) setLabResultError(true);
		if (!diagnosisDescription) setDiagnosisError(true);
		if (!prescription) setPrescriptionError(true);

		const formData = {
			patient_id: patientId,
			symptom_description: symptomDescription,
			result: labResult,
			diagnosis_description: diagnosisDescription,
			medication_description: prescription,
		};
		if (
			symptomDescription &&
			labResult &&
			diagnosisDescription &&
			prescription
		) {
			try {
				const response = await fetchHelper.post("/diagnosis", formData);
				console.log("Data submitted successfully:", response);
				navigate("/patient-registration");
				

			} catch (error) {
				console.error("Error during data submission:", error);
			}
		}
		dispatch(setDiagnosisData(formData));
		setMessage("Form submitted successfully!");
	};
	return (
		<div className="patient-page">
			<OptionsBox margin={"7rem 2rem 2rem 2rem"} />

			<div className="diagnosis-data-form">
				<p className="patient-name">{`${patientFirstName} ${patientLastName}`}</p>
				<div className="patient-preview-section1">
					<div className="pic-box">
						{profilePic ? (
							<img
								src={profilePic}
								alt="Profile"
								className="profile-pic"
							/>
						) : (
							<p>No picture uploaded</p>
						)}
					</div>

					<div className="patient-preview-boxes">
						<PreviewBox
							width={"60rem"}
							height={"auto"}
							title={"Medical History"}
							text={medicalHistory || "No medical history available"}
						/>
						<PreviewBox
							width={"60rem"}
							height={"auto"}
							title={"Medication History"}
							text={medicationHistory || "No medical history available"}
						/>
						<TextArea
							width={"60rem"}
							length={"18rem"}
							placeholder={"Symptoms"}
							value={symptomDescription}
							onChange={(e) => setSymptomDescription(e.target.value)}
						/>
						{symptomError && (
							<p className="error-message">Symptoms are required.</p>
						)}

						<TextArea
							width={"60rem"}
							length={"18rem"}
							placeholder={"Lab Results"}
							value={labResult}
							onChange={(e) => setLabResult(e.target.value)}
						/>
						{labResultError && (
							<p className="error-message">Lab results are required.</p>
						)}

						<TextArea
							width={"60rem"}
							length={"18rem"}
							placeholder={"Diagnosis"}
							value={diagnosisDescription}
							onChange={(e) => setDiagnosisDescription(e.target.value)}
						/>
						{diagnosisError && (
							<p className="error-message">Diagnosis is required.</p>
						)}

						<TextArea
							width={"60rem"}
							length={"18rem"}
							placeholder={"Prescriptions"}
							value={prescription}
							onChange={(e) => setPrescription(e.target.value)}
						/>
						{prescriptionError && (
							<p className="error-message">Prescription is required.</p>
						)}

						<Button
							width={"14rem"}
							height={"3rem"}
							color={"white"}
							fontSize="1.15rem"
							text={"Submit"}
							onClick={handleSubmit}
						/>
						{message && <p>{message}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Diagnosis;
