import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import fetchHelper from "../../Components/Functions/FetchFunction";

const AdminUsers = () => {
	const roles = ["patient", "doctor", "insurance"];
	const [validationErrors, setValidationErrors] = useState({});
	const [patients, setPatients] = useState([]);
	const validate = () => {
		const errors = {};
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newPatient.email)) {
			errors.email = "Invalid email format";
		}

		if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(newPatient.password)) {
			errors.password =
				"Must contains letters and numbers and be at least 8 characters long";
		}

		if (newPatient.user_name.length < 4) {
			errors.user_name = "Must be at least 4 characters long";
		}

		if (!/^\d{4}-\d{2}-\d{2}$/.test(newPatient.date_of_birth)) {
			errors.date_of_birth = "Must be in YYYY-MM-DD format";
		}

		if (newPatient.phone_number.length < 3) {
			errors.phone_number = "Must be at least 10 digits long";
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

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

	const handleAddPatient = async (e) => {
		e.preventDefault();
		if (!validate()) {
			console.error("Validation failed:", validationErrors);
			return;
		}

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
			setValidationErrors({});
		} catch (error) {
			console.error("Failed to add patient:", error);
		}
	};

	return (
		<Box>
			<Typography
				variant="h5"
				sx={{ mb: 2 }}>
				Add Users:
			</Typography>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fit, minmax(200px, 1fr)) minmax(200px, 1fr)",
					alignItems: "baseline",
					justifyItems: "start",
					gap: "8px",
				}}>
				<TextField
					label="Email"
					value={newPatient.email}
					onChange={(e) =>
						setNewPatient({ ...newPatient, email: e.target.value })
					}
					error={!!validationErrors.email}
					helperText={validationErrors.email}
				/>
				<TextField
					label="Password"
					type="password"
					value={newPatient.password}
					onChange={(e) =>
						setNewPatient({ ...newPatient, password: e.target.value })
						
					}
					error={!!validationErrors.password}
					helperText={validationErrors.password}
				/>
				<TextField
					label="User Name"
					value={newPatient.user_name}
					onChange={(e) =>
						setNewPatient({ ...newPatient, user_name: e.target.value })
					}
					error={!!validationErrors.user_name}
					helperText={validationErrors.user_name}
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
					error={!!validationErrors.date_of_birth}
					helperText={validationErrors.date_of_birth}
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
					error={!!validationErrors.phone_number}
					helperText={validationErrors.phone_number}
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
						gridColumn: "span 2",
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

export default AdminUsers;
