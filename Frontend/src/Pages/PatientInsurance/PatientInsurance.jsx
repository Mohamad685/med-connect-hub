import React, { useEffect, useState } from "react";
import OptionsBox from "../../Components/Options/Options";
import fetchHelper from "../../Components/Functions/FetchFunction";
import { useParams } from "react-router-dom";
import Button from "../../Components/Button/Button";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import './PatientInsurance.css';

function PatientInsurance() {
	const [labResults, setLabResults] = useState([]);
	const [diagnoses, setDiagnoses] = useState([]);
	const [prescriptions, setPrescriptions] = useState([]);
	const [symptoms, setSymptoms] = useState([]);
	const { patientId } = useParams();
	const [patient, setPatient] = useState({});
	const [validationResult, setValidationResult] = useState("");

	const patientFullName = `${patient.first_name || ""} ${
		patient.last_name || ""
	}`.trim();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const validationResponse = await fetchHelper.get(
					`/validate-diagnosis/${patientId}`
				);
				if (validationResponse) {
					setValidationResult(validationResponse.result);
				} else {
					setValidationResult("No Response");
				}
			} catch (error) {
				console.error("Failed to fetch validation result", error);
				setValidationResult("No Response");
			}
		};

		if (patientId) fetchData();
	}, [patientId]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const patientData = await fetchHelper.get(`/insurance/${patientId}`);
				if (patientData) {
					setPatient(patientData);
				} else {
					setPatient(null);
				}

				const labResultsResponse = await fetchHelper.get(
					`/insurance/${patientId}/lab-results`
				);
				setLabResults(labResultsResponse.length ? labResultsResponse : null);

				const diagnosesResponse = await fetchHelper.get(
					`/insurance/${patientId}/diagnosis`
				);
				setDiagnoses(diagnosesResponse.length ? diagnosesResponse : null);

				const prescriptionsResponse = await fetchHelper.get(
					`/insurance/${patientId}/prescriptions`
				);
				setPrescriptions(
					prescriptionsResponse.length ? prescriptionsResponse : null
				);

				const symptomsResponse = await fetchHelper.get(
					`/insurance/${patientId}/symptoms`
				);
				setSymptoms(symptomsResponse.length ? symptomsResponse : null);
			} catch (error) {
				console.error("Failed to fetch patient data", error);
			}
		};

		if (patientId) fetchData();
	}, [patientId]);

	const updateStatus = async (status, approvalId) => {
		const url = `/insurance-request/${approvalId}/update-status`;
		const data = { status: status };
		try {
			const response = await fetchHelper.post(url, data);
			console.log("Status updated successfully", response);
			setPatient(null);
			setDiagnoses(null);
			setLabResults(null);
			setPrescriptions(null);
			setSymptoms(null);
		} catch (error) {
			console.error("Failed to update status", error);
		}
	};

	return (
		<>
			<div className="insurance-reg-page">
				<div className="validation-result-sec">
				<OptionsBox margin={"7rem 2rem 2rem 2rem"} />
				<PreviewBox
					title={`AI Response`}
					text={validationResult || "No Response"}
					width={"13rem"}
					height={"15rem"}
					textPosition={"text-top"}
					/>
				</div>
				<div className="insurance-reg-form">
					<p className="insurance-reg-title">
						{patientFullName
							? `${patientFullName}'s Insurance`
							: "Patient Insurance"}
					</p>
					<div className="insurance-reg-section1">
						<div className="insurance-form-input">
							<div className="address-input-div">
								{labResults.map((result, index) => (
									<PreviewBox
										key={index}
										title={`Lab Results`}
										text={result.result}
										width={"56rem"}
										height={"8rem"}
										textPosition={"text-top"}
									/>
								))}

								{symptoms.map((symptom, index) => (
									<PreviewBox
										key={index}
										title={`Symptoms`}
										text={symptom.symptom_description}
										width={"56rem"}
										height={"8rem"}
										textPosition={"text-top"}
									/>
								))}

								{diagnoses.map((diagnosis, index) => (
									<PreviewBox
										key={index}
										title={`Diagnoses`}
										text={diagnosis.diagnosis_description}
										width={"56rem"}
										height={"8rem"}
										textPosition={"text-top"}
									/>
								))}

								{prescriptions.map((prescription, index) => (
									<PreviewBox
										key={index}
										title={`Prescriptions`}
										text={prescription.medication_description}
										width={"56rem"}
										height={"8rem"}
										textPosition={"text-top"}
									/>
								))}
								<div className="insurance-button-div">
									<Button
										width={"20rem"}
										height={"2.5rem"}
										color={"white"}
										text="Accept"
										fontSize="1.15rem"
										onClick={() => updateStatus("Accepted", approvalId)}
									/>

									<Button
										width={"20rem"}
										height={"2.5rem"}
										color={"white"}
										text="Reject"
										fontSize="1.15rem"
										onClick={() => updateStatus("Rejected", approvalId)}
										classNames={"insurance-button-style"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PatientInsurance;
