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
	const { patientData } = location.state || {};
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
	
	const createImageUrl = (filePath) => {
		const filename = filePath.split("\\").pop();
		return `http://localhost:8000/storage/profile_pictures/${filename}`;
	};
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
							dateHumanized: `${format(
								parseISO(history.created_at),
								"dd-MM-yyyy"
							)}`,
						}));

					const processedMedicationHistories =
						patientHistoriesResponse.medicationHistories.map((history) => ({
							medication_description: history.medication_description,
							dateHumanized: `${format(
								parseISO(history.created_at),
								"dd-MM-yyyy"
							)}`,
						}));

					setResponseDetails({
						medicalHistories: processedMedicalHistories,
						medicationHistories: processedMedicationHistories,
					});
				}
			} catch (error) {
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
				setMessage("Form submitted successfully!");
				navigate("/patients-doctor");
			} catch (error) {

			}
		}

		
	};

	return (
		<div className="patient-page">
			<div>
				{" "}
				<OptionsBox margin={"7rem 2rem 2rem 2rem"} />
			</div>

			<div className="diagnosis-data-form">
				<p className="patient-name">
					{patientFullName ? `${patientFullName}` : "Patient Doctor"}
				</p>
				<div className="patient-preview-section1">
					<div className="pic-box pic-box-preview">
						{patient.user && patient.user.profile_picture ? (
							<img
								src={createImageUrl(patient.user.profile_picture)}
								alt={`${patient.first_name} ${patient.last_name}`}
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
								width="48rem"
								title={"Medical Histories"}
								text={
									<div className="info">
										<span>{history.description}</span>{" "}
										<span>{history.dateHumanized}</span>
									</div>
								}
							/>
						))}

						{responseDetails.medicationHistories.map((history, index) => (
							<PreviewBox
								key={index}
								height="auto"
								width="48rem"
								title={"Medication Histories"}
								text={
									<div className="info">
										<span>{history.medication_description}</span>{" "}
										<span>{history.dateHumanized}</span>
									</div>
								}
							/>
						))}

						<TextArea
							width={"48rem"}
							length={"8rem"}
							placeholder={"Symptoms"}
							value={symptomDescription}
							onChange={(e) => setSymptomDescription(e.target.value)}
						/>
						{symptomError && (
							<p className="error-message">Symptoms are required.</p>
						)}

						<TextArea
							width={"48rem"}
							length={"8rem"}
							placeholder={"Lab Results"}
							value={labResult}
							onChange={(e) => setLabResult(e.target.value)}
						/>
						{labResultError && (
							<p className="error-message">Lab results are required.</p>
						)}

						<TextArea
							width={"48rem"}
							length={"8rem"}
							placeholder={"Diagnosis"}
							value={diagnosisDescription}
							onChange={(e) => setDiagnosisDescription(e.target.value)}
						/>
						{diagnosisError && (
							<p className="error-message">Diagnosis is required.</p>
						)}

						<TextArea
							width={"48rem"}
							length={"8rem"}
							placeholder={"Prescriptions"}
							value={prescription}
							onChange={(e) => setPrescription(e.target.value)}
						/>
						{prescriptionError && (
							<p className="error-message">Prescription is required.</p>
						)}

						<Button
							width={"8rem"}
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
