import React, { useState, useEffect } from 'react';
import fetchHelper from '../Functions/FetchFunction';
import './Chat.css';

const DoctorList = ({ onSelectDoctor }) => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await fetchHelper.get('/patient/doctors');
                setDoctors(data);
                console.log(data)
                console.log(data.id)
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="doctor-list">
            {doctors.map(doctor => (
                <div className='doctors-name' key={doctor.id} onClick={() => onSelectDoctor(doctor.id)}>
                   Dr.{doctor.first_name} {doctor.last_name}<br/>
                   {doctor.specialty}
                </div>
            ))}
        </div>
    );
};

export default DoctorList;
