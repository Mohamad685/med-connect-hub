import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Divider, Modal } from "@mui/material";
import fetchHelper from "../../Components/Functions/FetchFunction";

const AdminInsurance = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [insurances, setInsurance] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [editingInsurance, setEditingInsurance] = useState({
		user_id: "null",
		name: "",
		description: "",
		phone_number: "",
		email: "",
		address: "",
		coverage_details: "",
	});

	useEffect(() => {
		const fetchInsurance = async () => {
			try {
				const data = await fetchHelper.get("/admin/insurance");
				setInsurance(data);
			} catch (error) {
				console.error("Failed to fetch Insurance:", error);
			}
		};

		fetchInsurance();
	}, []);

	const handleRemoveInsurance = async (id) => {
		try {
			await fetchHelper.delete(`/insurance/${id}`);
			setInsurance((prev) => prev.filter((insurance) => insurance.id !== id));
		} catch (error) {
			console.error("Failed to remove insurance:", error);
		}
	};

	const handleUpdateInsurance = async () => {
		try {
			const updatedInsurance = await fetchHelper.put(
				`/insurance/${editingInsurance.id}`,
				editingInsurance
			);
			setInsurance((prevInsurance) =>
				prevInsurance.map((insurance) =>
					insurance.id === editingInsurance.id
						? { ...insurance, ...updatedInsurance }
						: insurance
				)
			);

			setEditingInsurance({
				user_id: "null",
				name: "",
				description: "",
				phone_number: "",
				email: "",
				address: "",
				coverage_details: "",
			});
		} catch (error) {}
	};

	const startEditing = (insurance) => {
		setEditingInsurance(insurance);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ mb: 2 }}>
				Insurance
			</Typography>

			<Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
				<TextField
					label="Search by Name"
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</Box>

			{insurances
				.filter((insurance) =>
					`${insurance.name}`.toLowerCase().includes(searchQuery.toLowerCase())
				)
				.map((insurance, index) => (
					<React.Fragment key={index}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 2,
							}}>
							<Box>
								<Typography>{`Name: ${insurance.name}`}</Typography>
								<Typography>{`Address: ${insurance.address}`}</Typography>
								<Typography>{`description: ${insurance.description}`}</Typography>
								<Typography>{`Coverage_details: ${insurance.coverage_details}`}</Typography>
								<Typography>{`Phone: ${insurance.phone_number}`}</Typography>
								<Typography>{`Email: ${insurance.email}`}</Typography>
							</Box>
							<Box>
								<Button
									onClick={() => startEditing(insurance)}
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
									onClick={() => handleRemoveInsurance(insurance.id)}
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
						{index < insurances.length - 1 && (
							<Divider sx={{ borderColor: "#41597b", my: 2 }} />
						)}
					</React.Fragment>
				))}
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />

			<Modal
				open={isModalOpen}
				onClose={handleCloseModal}
				aria-labelledby="edit-insurance-modal"
				aria-describedby="modal-modal-description">
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
						value={editingInsurance.first_name}
						onChange={(e) =>
							setEditingInsurance({
								...editingInsurance,
								first_name: e.target.value,
							})
						}
					/>
					<TextField
						label="Last Name"
						value={editingInsurance.last_name}
						onChange={(e) =>
							setEditingInsurance({
								...editingInsurance,
								last_name: e.target.value,
							})
						}
					/>
					<TextField
						label="Address"
						value={editingInsurance.address}
						onChange={(e) =>
							setEditingInsurance({
								...editingInsurance,
								address: e.target.value,
							})
						}
					/>

					<TextField
						label="Age"
						value={editingInsurance.age}
						onChange={(e) =>
							setEditingInsurance({
								...editingInsurance,
								age: e.target.value,
							})
						}
					/>
					<TextField
						label="Gender"
						value={editingInsurance.gender}
						onChange={(e) =>
							setEditingInsurance({
								...editingInsurance,
								gender: e.target.value,
							})
						}
					/>
					<TextField
						label="Phone Number"
						value={editingInsurance.phone_number}
						onChange={(e) =>
							setEditingInsurance({
								...editingInsurance,
								phone_number: e.target.value,
							})
						}
					/>
					<Button
						onClick={handleUpdateInsurance}
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
		</Box>
	);
};

export default AdminInsurance;
