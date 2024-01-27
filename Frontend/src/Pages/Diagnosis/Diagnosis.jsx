import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";
import fetchHelper from "../../Components/Functions/FetchFunction";
import { format, parseISO } from "date-fns";

function Diagnosis() {
	const location = useLocation();
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
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
	const [responseDetails, setResponseDetails] = useState({
		medicalHistories: [],
		medicationHistories: [],
	});

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

				const patientHistoriesResponse = await fetchHelper.get(
					`/patient-histories?patient_id=${patientId}`
				);
				if (patientHistoriesResponse) {
					const processedMedicalHistories =
						patientHistoriesResponse.medicalHistories.map((history) => ({
							description: history.description,
							dateHumanized: `On: ${format(
								parseISO(history.created_at),
								"dd-MMMM-yyyy"
							)}`,
						}));

					const processedMedicationHistories =
						patientHistoriesResponse.medicationHistories.map((history) => ({
							medication_description: history.medication_description,
							dateHumanized: `On: ${format(
								parseISO(history.created_at),
								"dd-MMMM-yyyy"
							)}`,
						}));

					setResponseDetails({
						medicalHistories: processedMedicalHistories,
						medicationHistories: processedMedicationHistories,
					});
					console.log(patientHistoriesResponse);
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
				console.log("Data submitted successfully:", response);
				setMessage("Form submitted successfully!");
				navigate("/patient-registration");
			} catch (error) {
				console.error("Error during data submission:", error);
			}
		} else {
			setMessage("Please fill in all required fields.");
		}
	};
	return (
		<div className="patient-page">
			<OptionsBox margin={"7rem 2rem 2rem 2rem"} />

			<div className="diagnosis-data-form">
				<p className="patient-name">
					{patientFullName ? `${patientFullName}` : "Patient Doctor"}
				</p>
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
						{responseDetails.medicalHistories.map((history, index) => (
							<PreviewBox
								key={index}
								height="auto" 
								width="100%"
								title={"Medical Histories"}
								text={`${history.description} ${history.dateHumanized}`}
							/>
						))}

						{responseDetails.medicationHistories.map((history, index) => (
							<PreviewBox
								key={index}
								height="auto"
								width="100%"
								title={"Medication Histories"}
								text={`${history.medication_description} ${history.dateHumanized}`} // Assuming you want to show the date here
							/>
						))}

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
