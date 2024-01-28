import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Divider,
	Modal,

} from "@mui/material";
import fetchHelper from "../../Components/Functions/FetchFunction";

const AdminPatients = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [patients, setPatients] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);


	const [editingPatient, setEditingPatient] = useState({
		id: null,
		first_name: "",
		last_name: "",
		address: "",
		age: "",
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

	const handleRemovePatient = async (id) => {
		try {
			await fetchHelper.delete(`/patient/${id}`);
			setPatients((prev) => prev.filter((patient) => patient.id !== id));
		} catch (error) {
			console.error("Failed to remove patient:", error);
		}
	};

	const handleUpdatePatient = async () => {
		try {
			const updatedPatient = await fetchHelper.put(
				`/patient/${editingPatient.id}`,
				editingPatient
			);
			setPatients((prevPatients) =>
				prevPatients.map((patient) =>
					patient.id === editingPatient.id
						? { ...patient, ...updatedPatient }
						: patient
				)
			);

			setEditingPatient({
				id: null,
				first_name: "",
				last_name: "",
				address: "",
				age: "",
				gender: "",
				phone_number: "",
			});
		} catch (error) {}
	};

	const startEditing = (patient) => {
        setEditingPatient(patient);
        setIsModalOpen(true); 
	}
    const handleCloseModal = () => {
        setIsModalOpen(false);
	};

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ mb: 2 }}>
				Patients
			</Typography>

			<Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
				<TextField
					label="Search by Name"
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</Box>

			{patients
				.filter((patient) =>
					`${patient.first_name} ${patient.last_name}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				)
				.map((patient, index) => (
					<React.Fragment key={index}>
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

			<Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="edit-patient-modal"
                aria-describedby="modal-modal-description"
            >				
			<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
						display: "grid",
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
						label="Age"
						value={editingPatient.age}
						onChange={(e) =>
							setEditingPatient({
								...editingPatient,
								age: e.target.value,
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
			</Modal>
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />
		</Box>
	);
};

export default AdminPatients;
