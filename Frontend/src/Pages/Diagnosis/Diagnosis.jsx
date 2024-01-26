import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";
import fetchHelper from "../../Components/Functions/FetchFunction";

function Diagnosis() {
	const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [responseDetails, setResponseDetails] = useState(null);
	const { patientId } = useParams();
	const [patient, setPatient] = useState({});
	const { profilePic } = location.state?.patientData || {};
	const [symptomError, setSymptomError] = useState(false);
	const [labResultError, setLabResultError] = useState(false);
	const [diagnosisError, setDiagnosisError] = useState(false);
	const [prescriptionError, setPrescriptionError] = useState(false);
	const [symptomDescription, setSymptomDescription] = useState("");
	const [labResult, setLabResult] = useState("");
	const [diagnosisDescription, setDiagnosisDescription] = useState("");
	const [prescription, setPrescription] = useState("");

	const patientFullName = `${patient.first_name || ""} ${
		patient.last_name || ""
	}`.trim();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const patientData = await fetchHelper.get(`/doctor/${patientId}`);
				if (patientData) {
					setPatient(patientData);
				} else {
					setPatient(null);
				}
			} catch (error) {
				console.error("Failed to fetch patient data", error);
			}
		};

		if (patientId) fetchData();
	}, [patientId]);

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
				const data = await response.json();
				console.log("Data submitted successfully:", response);
				setMessage("Form submitted successfully!");
				setResponseDetails(data);
				navigate("/patient-registration");
			} catch (error) {
				console.error("Error during data submission:", error);
			}
		}else {
			setMessage("Please fill in all required fields.");
		}
	};
	return (
		<div className="patient-page">
			<OptionsBox margin={"7rem 2rem 2rem 2rem"} />

			<div className="diagnosis-data-form">
				<p className="patient-name">{patientFullName
							? `${patientFullName}`
							: "Patient Doctor"}</p>
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
    {responseDetails && responseDetails.medicalHistories ? (
        <PreviewBox
            width={"60rem"}
            height={"auto"}
            title={"Medical History"}
            text={JSON.stringify(responseDetails.medicalHistories)}
        />
    ) : (
        <div className="no-history-message">
            <p>No medical history available. <a href="/patient-registration">Create a new file</a>.</p>
        </div>
    )}

    {responseDetails && responseDetails.medicationHistories ? (
        <PreviewBox
            width={"60rem"}
            height={"auto"}
            title={"Medication History"}
            text={JSON.stringify(responseDetails.medicationHistories)}
        />
    ) : (
        <div className="no-history-message">
            <p>No medication history available. <a href="/patient-registration">Create a new file</a>.</p>
        </div>
    )}
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
