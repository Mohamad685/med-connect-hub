import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";

const AdminPatients = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [patients, setPatients] = useState([]);
	const [newPatient, setNewPatient] = useState({
		name: "",
		age: "",
		condition: "",
	});
	const [editingPatient, setEditingPatient] = useState({
		id: null,
		name: "",
		age: "",
		condition: "",
	});

	useEffect(() => {
		const fetchedPatients = [
			{ id: 1, name: "John Doe", age: 30, condition: "Flu" },
			{ id: 2, name: "Jane Smith", age: 25, condition: "Cold" },
		];
		setPatients(fetchedPatients);
	}, []);

	const handleAddPatient = () => {
		const newId = patients.length + 1;
		setPatients([...patients, { ...newPatient, id: newId }]);
		setNewPatient({ name: "", age: "", condition: "" });
	};

	const handleRemovePatient = (id) => {
		setPatients(patients.filter((patient) => patient.id !== id));
	};

	const handleUpdatePatient = () => {
		setPatients(
			patients.map((patient) =>
				patient.id === editingPatient.id
					? { ...patient, ...editingPatient }
					: patient
			)
		);
		setEditingPatient({ id: null, name: "", age: "", condition: "" });
	};

	const startEditing = (patient) => {
		setEditingPatient(patient);
	};

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ mb: 2 }}>
				Patients
			</Typography>
			{/* Search input field */}
			<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
				<TextField
					label="Search by Name"
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					sx={{ mb: 2, width: "50%" }}
				/>
			</Box>
			{/* Filtered display of patients based on search query */}
			{patients
				.filter((patient) =>
					patient.name.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((patient, index) => (
					<React.Fragment key={patient.id}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 2,
							}}>
							<Typography>{`Name: ${patient.name}, Age: ${patient.age}, Condition: ${patient.condition}`}</Typography>
							<Box>
								<Button
									onClick={() => startEditing(patient)}
									sx={{
										backgroundColor: "#d7a043",
										color: "white",
										"&:hover": {
											backgroundColor: "#b28931",
										},
										mx: 1,
									}}>
									Edit
								</Button>
								<Button
									onClick={() => handleRemovePatient(patient.id)}
									sx={{
										backgroundColor: "#f44336",
										color: "white",
										"&:hover": {
											backgroundColor: "#d32f2f",
										},
										mx: 1,
									}}>
									Remove
								</Button>
							</Box>
						</Box>
						{index < patients.length - 1 && (
							<Divider sx={{ borderColor: "#41597b", my: 2 }} />
						)}
					</React.Fragment>
				))}
			{editingPatient.id && (
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<TextField
						label="Name"
						value={editingPatient.name}
						onChange={(e) =>
							setEditingPatient({ ...editingPatient, name: e.target.value })
						}
						sx={{ mx: 1 }}
					/>
					<TextField
						label="Age"
						value={editingPatient.age}
						onChange={(e) =>
							setEditingPatient({ ...editingPatient, age: e.target.value })
						}
						sx={{ mx: 1 }}
					/>
					<TextField
						label="Condition"
						value={editingPatient.condition}
						onChange={(e) =>
							setEditingPatient({
								...editingPatient,
								condition: e.target.value,
							})
						}
						sx={{ mx: 1 }}
					/>
					<Button
						onClick={handleUpdatePatient}
						sx={{
							backgroundColor: "#2196f3",
							color: "white",
							"&:hover": {
								backgroundColor: "#1976d2",
							},
							mx: 1,
						}}>
						Update Patient
					</Button>
				</Box>
			)}
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					"& > *": {
						mx: 1,
					},
				}}>
				<TextField
					label="Name"
					value={newPatient.name}
					onChange={(e) =>
						setNewPatient({ ...newPatient, name: e.target.value })
					}
				/>
				<TextField
					label="Age"
					value={newPatient.age}
					onChange={(e) =>
						setNewPatient({ ...newPatient, age: e.target.value })
					}
				/>
				<TextField
					label="Condition"
					value={newPatient.condition}
					onChange={(e) =>
						setNewPatient({ ...newPatient, condition: e.target.value })
					}
				/>
				<Button
					onClick={handleAddPatient}
					sx={{
						backgroundColor: "#2196f3",
						color: "white",
						"&:hover": {
							backgroundColor: "#1976d2",
						},
						mx: 1,
					}}>
					Add Patient
				</Button>
			</Box>
		</Box>
	);
};

export default AdminPatients;
