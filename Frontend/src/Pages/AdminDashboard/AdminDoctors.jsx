import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";

const AdminDoctors = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [patients, setPatients] = useState([]);
	const [newPatient, setNewPatient] = useState({
		first_name: "",
		last_name: "",
		address: "",
		age: "",
		date_of_birth: "",
		gender: "",
		phone_number: "",
	});
	const [editingPatient, setEditingPatient] = useState({
		id: null,
		first_name: "",
		last_name: "",
		address: "",
		age: "",
		date_of_birth: "",
		gender: "",
		phone_number: "",
	});

	useEffect(() => {
		const fetchedPatients = [
			{
				id: 1,
				first_name: "John",
				last_name: "Doe",
				address: "123 Main St",
				age: 30,
				date_of_birth: "1990-01-01",
				gender: "Male",
				phone_number: "555-1234",
			},
			{
				id: 2,
				first_name: "Jane",
				last_name: "Smith",
				address: "456 Elm St",
				age: 25,
				date_of_birth: "1995-02-02",
				gender: "Female",
				phone_number: "555-5678",
			},
		];
		setPatients(fetchedPatients);
	}, []);

	const handleAddPatient = () => {
		const newId = patients.length + 1;
		setPatients([...patients, { ...newPatient, id: newId }]);
		setNewPatient({
			first_name: "",
			last_name: "",
			address: "",
			age: "",
			date_of_birth: "",
			gender: "",
			phone_number: "",
		});
	};

	const handleRemovePatient = (id) => {
		setPatients(patients.filter((patient) => patient.id !== id));
	};

	const handleUpdatePatient = () => {
		setPatients(
			patients.map((patient) =>
				patient.id === editingPatient.id ? { ...editingPatient } : patient
			)
		);
		setEditingPatient({
			id: null,
			first_name: "",
			last_name: "",
			address: "",
			age: "",
			date_of_birth: "",
			gender: "",
			phone_number: "",
		});
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

			<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
				<TextField
					label="Search by Name"
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					sx={{ mb: 2, width: "50%" }}
				/>
			</Box>

			{patients
				.filter((patient) =>
					`${patient.first_name} ${patient.last_name}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
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
							<Box>
								<Typography>{`Name: ${patient.first_name} ${patient.last_name}`}</Typography>
								<Typography>{`Address: ${patient.address}`}</Typography>
								<Typography>{`Age: ${patient.age}`}</Typography>
								<Typography>{`DOB: ${patient.date_of_birth}`}</Typography>
								<Typography>{`Gender: ${patient.gender}`}</Typography>
								<Typography>{`Phone: ${patient.phone_number}`}</Typography>
							</Box>
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
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />

			{editingPatient.id && (
				<Box
					sx={{
						display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent:"space-evenly",
                        "& > *": { m: 1 },
					}}>
					<TextField
						label="First Name"
						value={editingPatient.first_name}
						onChange={(e) =>
							setEditingPatient({
								...editingPatient,
								first_name: e.target.value,
							})
						}
					/>
					<TextField
						label="Last Name"
						value={editingPatient.last_name}
						onChange={(e) =>
							setEditingPatient({
								...editingPatient,
								last_name: e.target.value,
							})
						}
					/>
					<TextField
						label="Address"
						value={editingPatient.address}
						onChange={(e) =>
							setEditingPatient({ ...editingPatient, address: e.target.value })
						}
					/>
					<TextField
						label="Age"
						value={editingPatient.age}
						onChange={(e) =>
							setEditingPatient({ ...editingPatient, age: e.target.value })
						}
					/>
					<TextField
						label="Date of Birth"
						value={editingPatient.date_of_birth}
						onChange={(e) =>
							setEditingPatient({
								...editingPatient,
								date_of_birth: e.target.value,
							})
						}
					/>
					<TextField
						label="Gender"
						value={editingPatient.gender}
						onChange={(e) =>
							setEditingPatient({ ...editingPatient, gender: e.target.value })
						}
					/>
					<TextField
						label="Phone Number"
						value={editingPatient.phone_number}
						onChange={(e) =>
							setEditingPatient({
								...editingPatient,
								phone_number: e.target.value,
							})
						}
					/>
					<Button
						onClick={handleUpdatePatient}
						sx={{
                            backgroundColor: "#2196f3",
                            color: "white",
                            "&:hover": { backgroundColor: "#1976d2" },
                            fontSize:'13px',
                        }}>
						Update
					</Button>
				</Box>
			)}
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
                    justifyContent:"space-evenly",
					"& > *": { m: 1 },
				}}>
				<TextField
					label="First Name"
					value={newPatient.first_name}
					onChange={(e) =>
						setNewPatient({ ...newPatient, first_name: e.target.value })
					}
				/>
				<TextField
					label="Last Name"
					value={newPatient.last_name}
					onChange={(e) =>
						setNewPatient({ ...newPatient, last_name: e.target.value })
					}
				/>
				<TextField
					label="Address"
					value={newPatient.address}
					onChange={(e) =>
						setNewPatient({ ...newPatient, address: e.target.value })
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
					label="Date of Birth"
					value={newPatient.date_of_birth}
					onChange={(e) =>
						setNewPatient({ ...newPatient, date_of_birth: e.target.value })
					}
				/>
				<TextField
					label="Gender"
					value={newPatient.gender}
					onChange={(e) =>
						setNewPatient({ ...newPatient, gender: e.target.value })
					}
				/>
				<TextField
					label="Phone Number"
					value={newPatient.phone_number}
					onChange={(e) =>
						setNewPatient({ ...newPatient, phone_number: e.target.value })
					}
				/>
				<Button
					onClick={handleAddPatient}
					sx={{
						backgroundColor: "#2196f3",
						color: "white",
						"&:hover": { backgroundColor: "#1976d2" },
					}}>
					Add
				</Button>
			</Box>
		</Box>
	);
};

export default AdminDoctors;
