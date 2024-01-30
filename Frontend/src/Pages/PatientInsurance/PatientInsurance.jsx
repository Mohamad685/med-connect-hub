import React, { useEffect, useState } from "react";
import OptionsBox from "../../Components/Options/Options";
import fetchHelper from "../../Components/Functions/FetchFunction";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import "./PatientInsurance.css";
import OpenAIApi from "openai";

function PatientInsurance() {
	const [labResults, setLabResults] = useState([]);
	const [diagnoses, setDiagnoses] = useState([]);
	const [prescriptions, setPrescriptions] = useState([]);
	const [symptoms, setSymptoms] = useState([]);
	const { patientId } = useParams();
	const [patient, setPatient] = useState({});
	const [validationResult, setValidationResult] = useState("");
	const [approvalId, setApprovalId] = useState(null);
	const [chatHistory, setChatHistory] = useState([]);

	const navigate = useNavigate();

	const formatDate = (dateString) => {
		const options = { day: "numeric", month: "numeric", year: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const patientFullName = `${patient.first_name || ""} ${
		patient.last_name || ""
	}`.trim();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const validationResponse = await fetchHelper.post(
	// 				`/validate-diagnosis/${patientId}`
	// 			);
	// 			if (validationResponse) {
	// 				setValidationResult(validationResponse.text);
	// 			} else {
	// 				setValidationResult("No Response");
	// 			}
	// 		} catch (error) {
	// 			console.error("Failed to fetch validation result", error);
	// 			setValidationResult("No Response");
	// 		}
	// 	};

	// 	if (patientId) fetchData();
	// }, [patientId]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (patientId) {
					const [
						patientData,
						labResultsResponse,
						diagnosesResponse,
						prescriptionsResponse,
						symptomsResponse,
					] = await Promise.all([
						fetchHelper.get(`/insurance/${patientId}`),
						fetchHelper.get(`/insurance/${patientId}/lab-results`),
						fetchHelper.get(`/insurance/${patientId}/diagnosis`),
						fetchHelper.get(`/insurance/${patientId}/prescriptions`),
						fetchHelper.get(`/insurance/${patientId}/symptoms`),
					]);

					if (patientData) {
						setPatient(patientData);
						setApprovalId(patientData.approvalId);
					} else {
						setPatient(null);
					}
					setLabResults(labResultsResponse.length ? labResultsResponse : null);
					setDiagnoses(diagnosesResponse.length ? diagnosesResponse : null);
					setPrescriptions(
						prescriptionsResponse.length ? prescriptionsResponse : null
					);
					setSymptoms(symptomsResponse.length ? symptomsResponse : null);
				}
			} catch (error) {
				console.error("Failed to fetch patient data", error);
			}
		};

		if (patientId) fetchData();
	}, [patientId]);

	const updateStatus = async (status, approvalId) => {
		const url = `/insurance-request/${approvalId}/update-status`;
		try {
			const data = { status: status };
			const response = await fetchHelper.post(url, data);

			console.log("Status updated successfully", response);
			navigate("/insurance-page");
			setPatient(null);
			setDiagnoses(null);
			setLabResults(null);
			setPrescriptions(null);
			setSymptoms(null);
		} catch (error) {
			console.error("Failed to update status", error);
			navigate("/insurance-page");
		}
	};

	const createPrompt = () => {
		const labResultsText = labResults.map((result) => result.result).join(", ");
		const symptomsText = symptoms
			.map((symptom) => symptom.symptom_description)
			.join(", ");
		const diagnosesText = diagnoses
			.map((diagnosis) => diagnosis.diagnosis_description)
			.join(", ");
		const prescriptionsText = prescriptions
			.map((prescription) => prescription.medication_description)
			.join(", ");

		return `
			Assessment Confirmation:
		
			Lab Results: ${labResultsText}
			Symptoms: ${symptomsText}
			Proposed Diagnosis: ${diagnosesText}
			Suggested Prescriptions: ${prescriptionsText}
		  
			\nBased on the provided lab results and observed symptoms, 
			please confirm if the proposed diagnosis and suggested prescriptions are accurate. 
			Provide a 'Yes' or 'No' response followed by a concise and brief justification for your answer.
			
			\nHighlight any potential mismatches or confirm the suitability of the medication.
			
			\n Assess the risk factors involved with the current diagnosis and prescribed treatment. 
			How might these factors influence the decision of an insurance company regarding coverage?`;
	};

	useEffect(() => {
		const callOpenAI = async () => {
			if (
				labResults.length &&
				symptoms.length &&
				diagnoses.length &&
				prescriptions.length
			) {
				const prompt = createPrompt();

				try {
					const openai = new OpenAIApi({
						apiKey: import.meta.env.VITE_OPENAI_API_KEY,
						dangerouslyAllowBrowser: true,
					});

					const response = await openai.chat.completions.create({
						model: "gpt-4",
						messages: [{ role: "assistant", content: prompt }],
						max_tokens: 300,
						temperature: 0.2,
					});
					console.log("OpenAI Response:", response);

					if (
						response &&
						response.choices &&
						response.choices.length > 0 &&
						response.choices[0].message &&
						response.choices[0].message.content
					) {
						const aiResponse = response.choices[0].message.content;
						setValidationResult(aiResponse);
					} else {
						console.error(
							"Invalid or unexpected response structure from OpenAI",
							response
						);
						setValidationResult(
							"Invalid or unexpected response structure from OpenAI"
						);
					}
				} catch (error) {
					console.error("Error in getting response from OpenAI", error);
					setValidationResult("Failed to get AI response");
				}
			}
		};

		callOpenAI();
	}, [labResults, symptoms, diagnoses, prescriptions]);

	return (
		<>
			<div className="insurance-reg-page">
				<div className="validation-result-sec">
					<OptionsBox margin={"7rem 2rem 2rem 2rem"} />
					<PreviewBox
						title={`AI Response`}
						text={validationResult || "No Response"}
						width={"13rem"}
						height={"auto"}
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
										text={
											<div className="info">
												<span>{result.result}</span>
												<span>{formatDate(result.created_at)}</span>
											</div>
										}
										width={"56rem"}
										height={"8rem"}
										textPosition={"text-top"}
									/>
								))}

								{symptoms.map((symptom, index) => (
									<PreviewBox
										key={index}
										title={`Symptoms`}
										text={
											<div className="info">
												<span className="symptom-description">
													{symptom.symptom_description}
												</span>
												<span className="symptom-date">
													{formatDate(symptom.created_at)}
												</span>
											</div>
										}
										width={"56rem"}
										height={"8rem"}
										textPosition={"text-top"}
									/>
								))}

								{diagnoses.map((diagnosis, index) => (
									<PreviewBox
										key={index}
										title={`Diagnoses`}
										text={
											<div className="info">
												<span>{diagnosis.diagnosis_description}</span>
												<span>{formatDate(diagnosis.created_at)}</span>
											</div>
										}
										width={"56rem"}
										height={"8rem"}
										textPosition={"text-top"}
									/>
								))}

								{prescriptions.map((prescription, index) => (
									<PreviewBox
										key={index}
										title={`Prescriptions`}
										text={
											<div className="info">
												<span>{prescription.medication_description}</span>
												<span>{formatDate(prescription.created_at)}</span>
											</div>
										}
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
