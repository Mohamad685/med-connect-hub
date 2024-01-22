import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	FormControl,
	InputLabel,
	Divider,
	Select,
	MenuItem,
} from "@mui/material";
import fetchHelper from "../../Components/Functions/FetchFunction";

const AdminUsers = () => {
	const roles = ["patient", "doctor", "insurance"];
	const [validationErrors, setValidationErrors] = useState({});
	const [users, setUsers] = useState([]);

	const validate = () => {
		const errors = {};
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newUser.email)) {
			errors.email = "Invalid email format";
		}

		if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(newUser.password)) {
			errors.password =
				"Must contains letters and numbers and be at least 8 characters long";
		}

		if (newUser.user_name.length < 4) {
			errors.user_name = "Must be at least 4 characters long";
		}

		if (newUser.phone_number.length < 3) {
			errors.phone_number = "Must be at least 10 digits long";
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const [newUser, setNewUser] = useState({
		first_name: "",
		last_name: "",
		address: "",
		age: "",
		gender: "",
		phone_number: "",
		email: "",
		password: "",
		user_name: "",
		role: "",
		specialty: "",
		license_id: "",
		company_name: "",
		description: "",
		coverage_details: "",
	});

	const handleAddUser = async (e) => {
		e.preventDefault();
		if (!validate()) {
			console.error("Validation failed:", validationErrors);
			return;
		}

		try {
			const data = await fetchHelper.post("/register", newUser);
			setUsers((prev) => [...prev, response.data]);
			setNewUser({
				first_name: "",
				last_name: "",
				address: "",
				age: "",
				age: "",
				gender: "",
				phone_number: "",
				role: "",
				email: "",
				password: "",
				user_name: "",
				specialty: "",
				license_id: "",
				company_name: "",
				description: "",
				coverage_details: "",
			});
			setValidationErrors({});
		} catch (error) {
			console.error("Failed to add User:", error);
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
					value={newUser.email}
					onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
					error={!!validationErrors.email}
					helperText={validationErrors.email}
				/>
				<TextField
					label="Password"
					type="password"
					value={newUser.password}
					onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
					error={!!validationErrors.password}
					helperText={validationErrors.password}
				/>
				<TextField
					label="User Name"
					value={newUser.user_name}
					onChange={(e) =>
						setNewUser({ ...newUser, user_name: e.target.value })
					}
					error={!!validationErrors.user_name}
					helperText={validationErrors.user_name}
				/>
				<TextField
					label="First Name"
					value={newUser.first_name}
					onChange={(e) =>
						setNewUser({ ...newUser, first_name: e.target.value })
					}
				/>
				<TextField
					label="Last Name"
					value={newUser.last_name}
					onChange={(e) =>
						setNewUser({ ...newUser, last_name: e.target.value })
					}
				/>
				<TextField
					label="Address"
					value={newUser.address}
					onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
				/>
				<TextField
					label="Age"
					value={newUser.age}
					onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
					error={!!validationErrors.age}
					helperText={validationErrors.age}
				/>
				<TextField
					label="Gender"
					value={newUser.gender}
					onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
				/>
				<TextField
					label="Phone Number"
					value={newUser.phone_number}
					onChange={(e) =>
						setNewUser({ ...newUser, phone_number: e.target.value })
					}
					error={!!validationErrors.phone_number}
					helperText={validationErrors.phone_number}
				/>
				<FormControl>
					<InputLabel id="role-select-label">Role</InputLabel>
					<Select
						labelId="role-select-label"
						id="role-select"
						value={newUser.role}
						label="Role"
						onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
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

				{newUser.role === "doctor" && (
					<Box sx={{ gridColumn: "1 / -1" }}>
						<Divider sx={{ borderColor: "#41597b", my: 2 }} />
						<Typography
							variant="h6"
							sx={{ mt: 2, mb: 2 }}>
							For Doctors
						</Typography>

						<TextField
							label="License ID"
							value={newUser.license_id}
							onChange={(e) =>
								setNewUser({ ...newUser, license_id: e.target.value })
							}
							error={!!validationErrors.license_id}
							helperText={validationErrors.license_id}
						/>

						<TextField
							label="Specialty"
							value={newUser.specialty}
							onChange={(e) =>
								setNewUser({ ...newUser, specialty: e.target.value })
							}
							error={!!validationErrors.specialty}
							helperText={validationErrors.specialty}
						/>
					</Box>
				)}
				{newUser.role === "patient" && <></>}
				{newUser.role === "insurance" && (
					<Box sx={{ gridColumn: "1 / -1" }}>
						<Divider sx={{ borderColor: "#41597b", my: 2 }} />
						<Typography
							variant="h6"
							sx={{ mt: 2, mb: 2 }}>
							For Insurance Companies
						</Typography>
						<TextField
							label="Company Name"
							value={newUser.company_name}
							onChange={(e) =>
								setNewUser({ ...newUser, company_name: e.target.value })
							}
							error={!!validationErrors.company_name}
							helperText={validationErrors.company_name}
						/>
						<TextField
							label="Description"
							value={newUser.description}
							onChange={(e) =>
								setNewUser({ ...newUser, description: e.target.value })
							}
							error={!!validationErrors.description}
							helperText={validationErrors.description}
						/>

						<TextField
							label="Coverage Details"
							value={newUser.coverage_details}
							onChange={(e) =>
								setNewUser({ ...newUser, coverage_details: e.target.value })
							}
							error={!!validationErrors.coverage_details}
							helperText={validationErrors.coverage_details}
						/>
					</Box>
				)}

				<Button
					onClick={handleAddUser}
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
