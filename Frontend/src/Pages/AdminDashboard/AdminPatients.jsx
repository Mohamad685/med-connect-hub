import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', condition: '' });

  // Simulate fetching patients from a database
  useEffect(() => {
    // Here, you would fetch patients from your back-end instead
    const fetchedPatients = [
      { id: 1, name: 'John Doe', age: 30, condition: 'Flu' },
      { id: 2, name: 'Jane Smith', age: 25, condition: 'Cold' },
    ];
    setPatients(fetchedPatients);
  }, []);

  const handleAddPatient = () => {
    // Here, you would add the patient to your database and fetch the updated list
    const newId = patients.length + 1; // Simplified ID generation for the example
    setPatients([...patients, { ...newPatient, id: newId }]);
    setNewPatient({ name: '', age: '', condition: '' }); // Reset input fields
  };

  const handleRemovePatient = (id) => {
    // Here, you would remove the patient from your database and fetch the updated list
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const handleUpdatePatient = (id, updatedInfo) => {
    // Here, you would update the patient in your database and fetch the updated list
    setPatients(patients.map(patient => patient.id === id ? { ...patient, ...updatedInfo } : patient));
  };

  return (
    <Box>
      <Typography variant="h4">Patients</Typography>
      {patients.map(patient => (
        <Box key={patient.id}>
          <Typography>{`Name: ${patient.name}, Age: ${patient.age}, Condition: ${patient.condition}`}</Typography>
          <Button onClick={() => handleRemovePatient(patient.id)}>Remove</Button>
        </Box>
      ))}
      <Box>
        <TextField label="Name" value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })} />
        <TextField label="Age" value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })} />
        <TextField label="Condition" value={newPatient.condition} onChange={e => setNewPatient({ ...newPatient, condition: e.target.value })} />
        <Button onClick={handleAddPatient}>Add Patient</Button>
      </Box>
    </Box>
  );
};

export default AdminPatients;
