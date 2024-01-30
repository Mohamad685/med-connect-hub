import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import "./InsurancePage.css";
import fetchHelper from "../../Components/Functions/FetchFunction";
import InputForm from "../../Components/Input/Input";
import Fuse from "fuse.js";


function InsurancePage() {
	const [insuranceId, setInsuranceId] = useState("");
	const [insuranceName, setInsuranceName] = useState("");
	const [patients, setPatients] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [patientSearch, setPatientSearch] = useState(null);

	const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query && patientSearch) {
            const results = patientSearch.search(query);
            setSearchResults(results.map(result => result.item));
        } else {
            setSearchResults([]); 
        }
    };


	const navigate = useNavigate();

	const handlePatientClick = (patientId) => {
		navigate(`/patient-insurance-page/${patientId}`);
	};

	const baseURL = "http://localhost:8000/storage/profile_pictures/";

	const extractFilename = (path) => {
		return path.split("\\").pop();
	};

	useEffect(() => {
		
		const fetchPatients = async () => {
			if (!insuranceId) return;
			try {
				const response = await fetchHelper.get(`/insurance-companies/${insuranceId}/patients`);
				setPatients(response);
	
				const options = { keys: ["first_name", "last_name"] };
				const fuse = new Fuse(response, options);
				setPatientSearch(fuse);
			} catch (error) {
				console.error("Failed to fetch patient data", error);
				setPatients([]);
			}
		};
	
		const storedInsuranceId = localStorage.getItem("InsuranceId");
		const storedInsuranceCompanyName = localStorage.getItem("insuranceName");
	
		if (storedInsuranceId) {
			setInsuranceId(storedInsuranceId);
		}
		if (storedInsuranceCompanyName) {
			setInsuranceName(storedInsuranceCompanyName);
		}
	
		fetchPatients();
	}, [insuranceId]);
	

	return (
		<>
			<div className="insurance-reg-page">
					<OptionsBox margin={"7rem 2rem 2rem 2rem"} />
				<div className="insurance-reg-form">
					<p className="insurance-reg-title">{insuranceName}</p>
					<div className="patient-list">
						{searchQuery === ""
							? patients.map((patient, index) => (
							<div
								key={index}
								className="patient-card"
								onClick={() => handlePatientClick(patient.id)}>
								<img
									src={`${baseURL}${extractFilename(
										patient.user.profile_picture
									)}`}
									alt="Profile"
									className="patient-profile-pic"
								/>
								<div className="patient-info">
									<p className="patient-name-1">
										{patient.first_name} {patient.last_name}
									</p>
									<p className="patient-detail">
										<strong>Age:</strong> {patient.age}
									</p>
									<p className="patient-detail">
										<strong>Phone:</strong> {patient.phone_number}
									</p>
								</div>
							</div>
						))
						: searchResults.map((result, index) => (
									<div
										key={index}
										className="patient-preview">
										<img
											src={result.item.profile_picture}
											alt="Profile"
											className="patient-profile-pic"
										/>
										<div
											onClick={() => handlePatientClick(result.item.id)}
											className="patient-info">
											<p>
												<strong>Name:</strong> {result.item.first_name}{" "}
												{result.item.last_name}
											</p>
											<p>
												<strong>Age:</strong> {result.item.age}
											</p>
											<p>
												<strong>Phone:</strong> {result.item.phone_number}
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
