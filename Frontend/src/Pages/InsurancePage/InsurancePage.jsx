import React, { useEffect, useState } from "react";
import OptionsBox from "../../Components/Options/Options";
import "./InsurancePage.css";
import fetchHelper from "../../Components/Functions/FetchFunction";

function InsurancePage() {
	const [labResults, setLabResults] = useState([]);
	const [diagnoses, setDiagnoses] = useState([]);
	const [prescriptions, setPrescriptions] = useState([]);
	const [symptoms, setSymptoms] = useState([]);
	const [insuranceName, setInsuranceName] = useState("");
	const [patients, setPatients] = useState([]);

	// const approvalId = "1";
	useEffect(() => {
        const storedInsuranceCompanyName = localStorage.getItem("insuranceName");
        if (storedInsuranceCompanyName) {
            setInsuranceName(storedInsuranceCompanyName);
		}

		const fetchPatients = async () => {
			try {
				const response = await fetchHelper.get("/insurance/allPatients", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});
				setPatients(response);
			} catch (error) {
				console.error("Failed to fetch patient data", error);
				setPatients([]);
			}
		};

		fetchPatients();
	}, []);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {

	// 			const labResultsResponse = await fetchHelper.get(
	// 				`/patient/${patientId}/lab-results`
	// 			);
	// 			setLabResults(labResultsResponse);

	// 			const diagnosesResponse = await fetchHelper.get(
	// 				`/patient/${patientId}/diagnosis`
	// 			);
	// 			setDiagnoses(diagnosesResponse);

	// 			const prescriptionsResponse = await fetchHelper.get(
	// 				`/patient/${patientId}/prescriptions`
	// 			);
	// 			setPrescriptions(prescriptionsResponse);

	// 			const symptomsResponse = await fetchHelper.get(
	// 				`/patient/${patientId}/symptoms`
	// 			);
	// 			setSymptoms(symptomsResponse);
	// 		} catch (error) {
	// 			console.error("Failed to fetch patient data", error);
	// 		}
	// 	};

	// 	fetchData();

	// }, [patientId]);

	const updateStatus = async (status, approvalId) => {
		const url = `/insurance-request/${approvalId}/update-status`;
		const data = { status: status };
		try {
			const response = await fetchHelper.post(url, data);
			console.log("Status updated successfully", response);
			setDiagnoses([]);
			setLabResults([]);
			setPrescriptions([]);
			setSymptoms([]);
		} catch (error) {
			console.error("Failed to update status", error);
		}
	};

	return (
		<>
			<div className="insurance-reg-page">
				<OptionsBox margin={"7rem 2rem 2rem 2rem"} />

				<div className="insurance-reg-form">
					<p className="insurance-reg-title">{insuranceName}</p>
					{/* <div className="insurance-reg-section1">
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

								{diagnoses.map((diagnosis, index) => (
									<PreviewBox
										key={index}
										title={`Diagnosiss`}
										text={diagnosis.diagnosis_description}
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
										classNames={'insurance-button-style'}
									/>
								</div>
							</div>
						</div> */}
					{/* </div> */}
					<div className="patient-list">
						{patients.map((patient, index) => (
							<div
								key={index}
								className="patient-preview">
								<img
									src={patient.profile_pic}
									alt="Profile"
									className="patient-profile-pic"
								/>
								<div className="patient-info">
									<p>
										Name: {patient.first_name} {patient.last_name}
									</p>
									<p>Age: {patient.age}</p>
									<p>Phone: {patient.phone_number}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default InsurancePage;
