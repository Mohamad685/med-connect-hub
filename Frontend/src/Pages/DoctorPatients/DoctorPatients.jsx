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
		navigate(`/diagnosis`);
	};
	

	useEffect(() => {
		const storedDoctorId = localStorage.getItem("doctorId"); 
		const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        const fullName = `${firstName} ${lastName}`;
        console.log(storedDoctorId)
		console.log(doctorId)
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
					<p className="insurance-reg-title">{doctorName ? `${doctorName}'s Patients List` : "Patients List"}</p>
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
