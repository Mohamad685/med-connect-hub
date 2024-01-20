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
		const fetchData = async () => {
			try {
				const labResultsData = await fetchHelper.get(
					`/patient/${patientId}/lab-results`
				);
				console.log('results:',labResultsData)
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
				console.log(error.response)
			}
		};

		fetchData();
	}, []);
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
							text={labResults}
						/>
						<PreviewBox
							width={"48rem"}
							height={"auto"}
							title={"Symptoms:"}
							text={symptoms}
						/>
						<PreviewBox
							width={"48rem"}
							height={"auto"}
							title={"Diagnosis:"}
							text={diagnosis}
						/>
						<PreviewBox
							width={"48rem"}
							height={"auto"}
							title={"Prescription:"}
							text={prescriptions}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PatientPreview;
