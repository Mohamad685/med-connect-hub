import React, { useEffect, useState } from "react";
import OptionsBox from "../../Components/Options/Options";
import ProfilePic from "../../Components/ProfilePic/ProfilePic";
import "./PatientPage.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import fetchHelper from "../../Components/Functions/FetchFunction";

function PatientPreview() {
	const [labResults, setLabResults] = useState("");
	const [symptoms, setSymptoms] = useState("");
	const [diagnosis, setDiagnosis] = useState("");
	const [prescriptions, setPrescriptions] = useState("");
	useEffect(() => {
		const patientId = localStorage.getItem("patientId");
		console.log("localstorage", patientId);
		const fetchData = async () => {
			try {
				const labResultsData = await fetchHelper.get(
					`/patient/${patientId}/lab-results`
				);
				setLabResults(labResultsData);

				const symptomsData = await fetchHelper.get(
					`/patient/${patientId}/symptoms`
				);
				setSymptoms(symptomsData);

				const diagnosisData = await fetchHelper.get(
					`/patient/${patientId}/diagnosis`
				);
				setDiagnosis(diagnosisData);

				const prescriptionsData = await fetchHelper.get(
					`/patient/${patientId}/prescriptions`
				);
				setPrescriptions(prescriptionsData);
			} catch (error) {
				console.error("Error fetching data:", error);
				console.log(error.response);
			}
		};

		fetchData();
	}, []);

	function formatLabResults(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
				<li key={index}>{item.result}, At: {item.created_at}</li>
			));
		}
		return <li>No lab results available</li>;
	}

	function formatDiagnosis(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
				<li key={index}>{item.diagnosis_description}, At: {item.created_at}</li>
			));
		}
		return <li>No lab results available</li>;
	}
	function formatPrescription(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
				<li key={index}>{item.medication_description}, At: {item.created_at}</li>
			));
		}
		return <li>No lab results available</li>;
	}
	function formatSymptom(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
				<li key={index}>{item.symptom_description}, At: {item.created_at}</li>
			));
		}
		return <li>No lab results available</li>;
	}
	return (
		<div className="patient-page">
			<OptionsBox margin={"8rem 2rem 2rem 2rem"} />

			<div className="patient-data-form">
				<p className="patient-name">Mohammad Fakih</p>
				<div className="patient-preview-section1">
					<ProfilePic />
					<div className="patient-preview-boxes">
						<PreviewBox
							width={"48rem"}
							height={"auto"}
							title={"Lab Results:"}
							text={formatLabResults(labResults)}
						/>
						<PreviewBox
							width={"48rem"}
							height={"auto"}
							title={"Symptoms:"}
							text={formatSymptom(symptoms)}
						/>
						<PreviewBox
							width={"48rem"}
							height={"auto"}
							title={"Diagnosis:"}
							text={formatDiagnosis(diagnosis)}
						/>
						<PreviewBox
							width={"48rem"}
							height={"auto"}
							title={"Prescription:"}
							text={formatPrescription(prescriptions)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PatientPreview;
