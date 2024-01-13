import React from "react";
import OptionsBox from "./Components/Options/Options";
import ProfilePic from "./Components/ProfilePic/ProfilePic";

function PatientPreview() {
    const patientData = {
        fullName: "John Doe",
        labResults: "Lab result data here...",
        symptoms: "Symptoms data here...",
        diagnosis: "Diagnosis data here...",
        prescription: "Prescription data here..."
    };

    return (
        <>
            <div className="patient-reg-page">
                <OptionsBox margin={"4rem 2rem 2rem 2rem"} />

                <div className="patient-reg-section">
                    <p className="patient-reg-title">{patientData.fullName}</p>
                    <div className="patient-info-display">
                        <ProfilePic/>
                        <div className="patient-data-display">
                            <p><strong>Lab Results:</strong> {patientData.labResults}</p>
                            <p><strong>Symptoms:</strong> {patientData.symptoms}</p>
                            <p><strong>Diagnosis:</strong> {patientData.diagnosis}</p>
                            <p><strong>Prescription:</strong> {patientData.prescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PatientPreview;
