import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import fetchHelper from "../../Components/Functions/FetchFunction";

const AdminInsurance = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [insurance, setInsurance] = useState([]);

	const [editingInsurance, setEditingInsurance] = useState({
		id: null,
		first_name: "",
		last_name: "",
		address: "",
		age: "",
		gender: "",
		phone_number: "",
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
			const updatedPatient = await fetchHelper.put(
				`/insurance/${editingPatient.id}`,
				editingPatient
			);
			setInsurance((prevInsurance) =>
				prevInsurance.map((insurance) =>
					insurance.id === editingInsurance.id
						? { ...insurance, ...updatedInsurance }
						: insurance
				)
			);

			setEditingInsurance({
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

	const startEditing = (insurance) => {
		setEditingInsurance(insurance);
	};

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ mb: 2 }}>
				Insurance
			</Typography>

			<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
				<TextField
					label="Search by Name"
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</Box>

			{insurance
				.filter((insurance) =>
					`${insurance.first_name} ${insurance.last_name}`
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
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
								<Typography>{`Name: ${insurance.first_name} ${insurance.last_name}`}</Typography>
								<Typography>{`Address: ${insurance.address}`}</Typography>
								<Typography>{`Age: ${insurance.age}`}</Typography>
								<Typography>{`Gender: ${insurance.gender}`}</Typography>
								<Typography>{`Phone: ${insurance.phone_number}`}</Typography>
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
						{index < insurance.length - 1 && (
							<Divider sx={{ borderColor: "#41597b", my: 2 }} />
						)}
					</React.Fragment>
				))}
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />

			{editingInsurance.id && (
				<Box
					sx={{
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
							setEditingInsurance({ ...editingInsurance, address: e.target.value })
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
							setEditingInsurance({ ...editingInsurance, gender: e.target.value })
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
			)}
			<Divider sx={{ borderColor: "#41597b", my: 2 }} />
		</Box>
	);
};

export default AdminInsurance;
