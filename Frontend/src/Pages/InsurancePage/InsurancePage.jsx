import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import "./InsurancePage.css";
import fetchHelper from "../../Components/Functions/FetchFunction";

function InsurancePage() {
	const [insuranceName, setInsuranceName] = useState("");
	const [patients, setPatients] = useState([]);
	const navigate = useNavigate();
	const handlePatientClick = (patientId) => {
		navigate(`/patient-insurance/${patientId}`);
	};

	useEffect(() => {
		const storedInsuranceCompanyName = localStorage.getItem("insuranceName");
		if (storedInsuranceCompanyName) {
			setInsuranceName(storedInsuranceCompanyName);
		}

		const fetchPatients = async () => {
			try {
				const response = await fetchHelper.get('/insurance/allPatients', {
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

	return (
		<>
			<div className="insurance-reg-page">
				<OptionsBox margin={"7rem 2rem 2rem 2rem"} />
				<div className="insurance-reg-form">
					<p className="insurance-reg-title">{insuranceName}</p>
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
								<div
									onClick={() => handlePatientClick(patient.id)}
									className="patient-info">
									<p>
										<strong>Name:</strong> {patient.first_name}{" "}
										{patient.last_name}
									</p>
									<p>
										<strong>Age:</strong> {patient.age}
									</p>
									<p>
										<strong>Phone:</strong> {patient.phone_number}
									</p>
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
