import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import OptionsBox from "../../Components/Options/Options";
import "./Diagnosis.css";
import PreviewBox from "../../Components/PreviewBox/PreviewBox";
import TextArea from "../../Components/TextArea/TextArea";
import Button from "../../Components/Button/Button";
import fetchHelper from "../../Components/Functions/FetchFunction";

function Diagnosis() {
    const location = useLocation();
    const patientData = location.state?.patientData;
    const patientId = patientData ? patientData.id : null;

    const [symptomDescription, setSymptomDescription] = useState("");
    const [labResult, setLabResult] = useState("");
    const [diagnosisDescription, setDiagnosisDescription] = useState("");
    const [prescription, setPrescription] = useState("");
	
	const handleSubmit=async(e)=>{
		e.preventDefault();

		const formData = new FormData();
		formData.append("user_name", user_name);
		formData.append("password", password);
		formData.append("first_name", first_name);
		formData.append("last_name", last_name);
		try {
			const response = await fetchHelper.post("/register-patient", formData);

			console.log("Registration successful:", response);
			clearFields();
			setFormMessage(response.message);

			const patientData = {
				id: response.patient.id,
				firstName: response.patient.first_name,
				lastName: response.patient.last_name,
				profilePic: response.patient.profile_pic
			};

			navigate("/diagnosis", { state: { patientData } });
		} catch (error) {
			console.error("Error during registration:", error);
			const errors = error.response?.data?.errors;
			if (errors) {
				const errorList = (
					<ul>
						{Object.values(errors)
							.flat()
							.map((msg, index) => (
								<li
									key={index}
									style={{ color: "red" }}>
									{msg}
								</li>
							))}
					</ul>
				);
				setFormMessage(errorList);
			} else {
				setFormMessage("An error occurred during registration.");
			}
		}
	}
	return (
		<div className="patient-page">
			<OptionsBox margin={"7rem 2rem 2rem 2rem"} />

			<div className="diagnosis-data-form">
				<p className="patient-name">Mohammad Fakih</p>
				<div className="patient-preview-section1">
					<div className="patient-preview-boxes">
						<PreviewBox
							width={"60rem"}
							height={"auto"}
                            title={"Medical History:"}
                            text={"Hello word"}
						/>
						<PreviewBox
							width={"60rem"}
							height={"auto"}
                            title={"Medication History:"}
                            text={"Hello word"}
						/>
						<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Symptoms:"}
							/>
							<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Lab Results:"}
							/>
							<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Diagnosis:"}
							/>
							<TextArea
								width={"60rem"}
								length={"18rem"}
								placeholder={"Prescriptions:"}
							/>
							<Button
								width={"14rem"}
								height={"3rem"}
								color={"white"}
								fontSize="1.15rem"
								text={"Submit"}
							/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Diagnosis;
