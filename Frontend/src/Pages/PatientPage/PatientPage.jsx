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
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [profilePicUrl, setProfilePicUrl] = useState("");

	useEffect(() => {
		const fName = localStorage.getItem("firstName");
		const lName = localStorage.getItem("lastName");
		const patientId = localStorage.getItem("patientId");
		setFirstName(fName);
		setLastName(lName);

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
			}
		};

		fetchData();
	}, []);

	function formatDate(isoString) {
		const date = new Date(isoString);
		return date
			.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			})
			.replace(/\//g, "-");
	}

	function formatLabResults(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
				<li className="info" key={index}>
						<div>{item.result}{" "}</div>
						<span>{formatDate(item.created_at)}</span>
					</li>
			));
		}
		return <li>No lab results available</li>;
	}

	function formatDiagnosis(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
				<li className="info" key={index}>
						<div>{item.diagnosis_description}{" "}</div>
						<span>{formatDate(item.created_at)}</span>
					</li>
			));
		}
		return <li>No Diagnosis available</li>;
	}

	function formatPrescription(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
				<li className="info" key={index}>
						<div>{item.medication_description}{" "}</div>
						<span>{formatDate(item.created_at)}</span>
					</li>
			));
		}
		return <li>No Prescriptions available</li>;
	}

	function formatSymptom(data) {
		if (Array.isArray(data)) {
			return data.map((item, index) => (
					<li className="info" key={index}>
						<div>{item.symptom_description}{" "}</div>
						<span>{formatDate(item.created_at)}</span>
					</li>
			));
		}
		return <li>No Symptoms Found</li>;
	}

	return (
		<div className="patient-page">
			<OptionsBox margin={"8rem 2rem 2rem 2rem"} />

			<div className="patient-data-form">
				<p className="patient-name">
					{firstName} {lastName}
				</p>
				<div className="patient-preview-boxes">
					<PreviewBox
						width={"53rem"}
						height={"auto"}
						title={"Lab Results:"}
						text={formatLabResults(labResults)}
					/>
					<PreviewBox
						width={"53rem"}
						height={"auto"}
						title={"Symptoms"}
						text={formatSymptom(symptoms)}
					/>
					<PreviewBox
						width={"53rem"}
						height={"auto"}
						title={"Diagnosis"}
						text={formatDiagnosis(diagnosis)}
					/>

					<PreviewBox
						width={"53rem"}
						height={"auto"}
						title={"Prescription"}
						text={formatPrescription(prescriptions)}
					/>
				</div>
			</div>
		</div>
	);
}

export default PatientPreview;
