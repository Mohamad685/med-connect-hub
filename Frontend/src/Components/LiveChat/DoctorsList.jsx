import React, { useState, useEffect } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const DoctorList = ({ onSelectDoctor }) => {
    const [doctors, setDoctors] = useState([]);
    const firestore = getFirestore();

    useEffect(() => {
        const fetchDoctors = async () => {
            const doctorsCollection = collection(firestore, 'doctors');
            const doctorSnapshot = await getDocs(doctorsCollection);
            const doctorList = doctorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDoctors(doctorList);
        };

        fetchDoctors();
    }, []);

    return (
        <div className="doctor-list">
            {doctors.map(doctor => (
                <button key={doctor.id} onClick={() => onSelectDoctor(doctor.id)}>
                    {doctor.name}
                </button>
            ))}
        </div>
    );
};

export default DoctorList;
