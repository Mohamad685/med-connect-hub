import React from "react";
import OptionsBox from '../../Components/Options/Options';
import ProfilePic from '../../Components/ProfilePic/ProfilePic';
import './PatientPage.css';

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
            <div className="patient-page">
                <OptionsBox margin={"4rem 2rem 2rem 2rem"} />

                <div className="patient-data">
                    <p className="patient-name">{patientData.fullName}</p>
                    <div className="">
                        <ProfilePic/>
                        <div className="">
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