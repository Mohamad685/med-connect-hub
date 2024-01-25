import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Divider,
} from "@mui/material";
import fetchHelper from "../../Components/Functions/FetchFunction";

const AdminDoctors = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [doctors, setDoctors] = useState([]);

	const [editingDoctor, setEditingDoctor] = useState({
        user_id:null,
        first_name:"",
        last_name:"",
        specialty:"",
        age:"",
        phone_number:"",
        license_id:"",
        gender:"",
	});

	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const data = await fetchHelper.get("/admin/doctors");
				setDoctors(data);
			} catch (error) {
				console.error("Failed to fetch Doctors:", error);
			}
		};

		fetchDoctors();
	}, []);

	const handleRemoveDoctor = async (id) => {
		try {
			await fetchHelper.delete(`/doctor/${id}`);
			setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
		} catch (error) {
			console.error("Failed to remove doctor:", error);
		}
	};

	const handleUpdateDoctor = async () => {
		try {
			const updatedDoctor = await fetchHelper.put(
				`/doctor/${editingDoctor.id}`,
				editingDoctor
			);
			setDoctors((prevDoctors) =>
				prevDoctors.map((doctor) =>
					doctor.id === editingDoctor.id
						? { ...doctor, ...updatedDoctor }
						: doctor
				)
			);

			setEditingDoctor({
				user_id:null,
        first_name:"",
        last_name:"",
        specialty:"",
        age:"",
        phone_number:"",
        license_id:"",
        gender:"",
			});
		} catch (error) {}
	};

	const startEditing = (doctor) => {
		setEditingDoctor(doctor);
	};

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ mb: 2 }}>
				Doctors
			</Typography>

			<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
				<TextField
					label="Search by Name"
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</Box>

			{doctors
				.filter((doctor) =>
					`${doctor.first_name} ${doctor.last_name}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
				)
				.map((doctor, index) => (
					<React.Fragment key={index}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 2,
							}}>
							<Box>
								<Typography>{`Name: ${doctor.first_name} ${doctor.last_name}`}</Typography>
                                <Typography>{`specialty: ${doctor.specialty}`}</Typography>
								<Typography>{`Phone: ${doctor.phone_number}`}</Typography>
								<Typography>{`Age: ${doctor.age}`}</Typography>
								<Typography>{`Gender: ${doctor.gender}`}</Typography>
								<Typography>{`License: ${doctor.license_id}`}</Typography>
							</Box>
							<Box>
								<Button
									onClick={() => startEditing(doctor)}
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
									onClick={() => handleRemoveDoctor(doctor.id)}
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
						{index < doctors.length - 1 && (
							<Divider sx={{ borderColor: "#41597b", my: 2 }} />
						)}
					</React.Fragment>
				))}
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />

			{editingDoctor.id && (
				<Box
					sx={{
						display: "grid",
						
						gap: "10px",
					}}>
					<TextField
						label="First Name"
						value={editingDoctor.first_name}
						onChange={(e) =>
							setEditingDoctor({
								...editingDoctor,
								first_name: e.target.value,
							})
						}
					/>
					<TextField
						label="Last Name"
						value={editingDoctor.last_name}
						onChange={(e) =>
							setEditingDoctor({
								...editingDoctor,
								last_name: e.target.value,
							})
						}
					/>
					<TextField
						label="Address"
						value={editingDoctor.address}
						onChange={(e) =>
							setEditingDoctor({ ...editingDoctor, address: e.target.value })
						}
					/>

					<TextField
						label="Age"
						value={editingDoctor.age}
						onChange={(e) =>
							setEditingDoctor({
								...editingDoctor,
								age: e.target.value,
							})
						}
					/>
					<TextField
						label="Gender"
						value={editingDoctor.gender}
						onChange={(e) =>
							setEditingDoctor({ ...editingDoctor, gender: e.target.value })
						}
					/>
					<TextField
						label="Phone Number"
						value={editingDoctor.phone_number}
						onChange={(e) =>
							setEditingDoctor({
								...editingDoctor,
								phone_number: e.target.value,
							})
						}
					/>
					<Button
						onClick={handleUpdateDoctor}
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
		</Box>
	);
};

export default AdminDoctors;
