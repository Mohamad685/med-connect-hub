import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import fetchHelper from "../../Components/Functions/FetchFunction";
import Fuse from "fuse.js";
import "./DoctorPatients.css";
import InputForm from "../../Components/Input/Input";

function DoctorPatients() {
	const [doctorId, setDoctorId] = useState("");
	const [doctorName, setDoctorName] = useState("");
	const [patients, setPatients] = useState([]);
	const [patientSearch, setPatientSearch] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const navigate = useNavigate();

	const createImageUrl = (filePath) => {
		const filename = filePath.split("\\").pop();
		return `http://localhost:8000/storage/profile_pictures/${filename}`;
	};

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		if (patientSearch) {
			const results = patientSearch.search(query);
			setSearchResults(results);
		}
	};

	const handlePatientClick = (patientId, profilePic) => {
		navigate(`/diagnosis/${patientId}`, {
			state: { patientData: { profilePic } },
		});
	};

	useEffect(() => {
		const storedDoctorId = localStorage.getItem("doctorId");
		const firstName = localStorage.getItem("firstName");
		const lastName = localStorage.getItem("lastName");
		const fullName = `${firstName} ${lastName}`;

		if (storedDoctorId) {
			setDoctorId(storedDoctorId);
		}
		if (firstName && lastName) {
			setDoctorName(fullName);
		}

		const fetchPatients = async () => {
			if (!doctorId) return;
			try {
				const response = await fetchHelper.get(`/doctors/${doctorId}/patients`);
				setPatients(response);

				const fuse = new Fuse(response, {
					keys: ["first_name", "last_name"],
				});
				setPatientSearch(fuse);
			} catch (error) {
				setPatients([]);
			}
		};

		fetchPatients();
	}, [doctorId]);

	return (
		<>
			<div className="insurance-reg-page">
				<div className="options-search">
					<OptionsBox margin={"-14rem 2rem 2rem 2rem"} />
					<InputForm
						type="text"
						placeholder="Search by name"
						value={searchQuery}
						onChange={handleSearch}  
					/>
				</div>

				<div className="insurance-reg-form">
					<p className="insurance-reg-title">
						{doctorName ? `${doctorName}'s Patients List` : "Patients List"}
					</p>
					<div className="patient-list">
						{searchQuery === ""
							? patients.map((patient, index) => (
									<div
										key={index}
										className="patient-card"
										onClick={() => handlePatientClick(patient.id)}>
										<img
											src={createImageUrl(patient.profile_pic)}
											alt="Profile"
											className="patient-profile-pic"
										/>
										<div className="patient-info">
											<p>
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
											src={result.item.profile_pic}
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

export default DoctorPatients;
