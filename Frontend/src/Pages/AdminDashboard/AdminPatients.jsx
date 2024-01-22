import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Divider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import fetchHelper from "../../Components/Functions/FetchFunction";

const AdminPatients = () => {
	const roles = ["patient", "doctor", "insurance"];

	const [searchQuery, setSearchQuery] = useState("");
	const [patients, setPatients] = useState([]);
	const [newPatient, setNewPatient] = useState({
		first_name: "",
		last_name: "",
		address: "",
		date_of_birth: "",
		gender: "",
		phone_number: "",
		email: "",
		password: "",
		user_name: "",
		role: "",
	});
	const [editingPatient, setEditingPatient] = useState({
		id: null,
		first_name: "",
		last_name: "",
		address: "",
		date_of_birth: "",
		gender: "",
		phone_number: "",
	});

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				const data = await fetchHelper.get("/admin/patients");
				setPatients(data);
			} catch (error) {
				console.error("Failed to fetch patients:", error);
			}
		};

		fetchPatients();
	}, []);

	const handleAddPatient = async (e) => {
		e.preventDefault();
		try {
			const data = await fetchHelper.post("/register", newPatient);
			setPatients((prev) => [...prev, data.patient]);
			setNewPatient({
				first_name: "",
				last_name: "",
				address: "",
				age: "",
				date_of_birth: "",
				gender: "",
				phone_number: "",
				role: "",
			});
		} catch (error) {
			console.error("Failed to add patient:", error);
		}
	};

	const handleRemovePatient = async (id) => {
		try {
			await fetchHelper.delete(`/admin/patients/${id}`);
			setPatients((prev) => prev.filter((patient) => patient.id !== id));
		} catch (error) {
			console.error("Failed to remove patient:", error);
		}
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
								<Typography>{`Date Of Birth: ${patient.date_of_birth}`}</Typography>
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
						justifyContent: "space-evenly",
						gap: "10px",
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
							fontSize: "11px",
						}}>
						Update
					</Button>
				</Box>
			)}
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />
			<Box
				sx={{
					display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)) minmax(200px, 1fr)",
					alignItems: "baseline",
                    justifyItems:'start',
					gap: "8px",
				}}>
				<TextField
					label="Email"
					value={newPatient.email}
					onChange={(e) =>
						setNewPatient({ ...newPatient, email: e.target.value })
					}
				/>
				<TextField
					label="Password"
					type="password"
					value={newPatient.password}
					onChange={(e) =>
						setNewPatient({ ...newPatient, password: e.target.value })
					}
				/>
				<TextField
					label="User Name"
					value={newPatient.user_name}
					onChange={(e) =>
						setNewPatient({ ...newPatient, user_name: e.target.value })
					}
				/>
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
				<FormControl>
					<InputLabel id="role-select-label">Role</InputLabel>
					<Select
						labelId="role-select-label"
						id="role-select"
						value={newPatient.role}
						label="Role"
						onChange={(e) =>
							setNewPatient({ ...newPatient, role: e.target.value })
						}
						sx={{ width: "8rem" }}>
						{roles.map((role) => (
							<MenuItem
								key={role}
								value={role}>
								{role}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					onClick={handleAddPatient}
					sx={{
                        gridColumn:"span 2",
						backgroundColor: "#2196f3",
						color: "white",
						"&:hover": { backgroundColor: "#1976d2" },
						width: "12rem",
					}}>
					Add
				</Button>
			</Box>
		</Box>
	);
};

export default AdminPatients;
