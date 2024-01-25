import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OptionsBox from "../../Components/Options/Options";
import fetchHelper from "../../Components/Functions/FetchFunction";

function DoctorPatients() {
	const [doctorId, setDoctorId] = useState(""); 
    const [doctorName, setDoctorName] = useState("");	
    const [patients, setPatients] = useState([]);
	const navigate = useNavigate();
	
    const handlePatientClick = (patientId) => {
		navigate(`/patient-insurance-page/${patientId}`);
	};

	useEffect(() => {
		const storedDoctorId = localStorage.getItem("DoctorId"); // Ensure this is set somewhere in your app
        const storedDoctorName = localStorage.getItem("DoctorName"); // Optionally, if you want to display the doctor's name

        if (storedDoctorId) {
            setDoctorId(storedDoctorId);
        }
        if (storedDoctorName) {
            setDoctorName(storedDoctorName);
        }

        const fetchPatients = async () => {
            if (!doctorId) return; // Wait until doctorId is fetched
            try {
                const response = await fetchHelper.get(`/doctors/${doctorId}/patients`); // Adjust the endpoint as per your API
                setPatients(response);
            } catch (error) {
                console.error("Failed to fetch patient data", error);
                setPatients([]);
            }
        };

        fetchPatients();
    }, [doctorId]);

	return (
		<>
			<div className="insurance-reg-page">
				<OptionsBox margin={"7rem 2rem 2rem 2rem"} />
				<div className="insurance-reg-form">
					<p className="insurance-reg-title">Patients List</p>
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

export default DoctorPatients;
