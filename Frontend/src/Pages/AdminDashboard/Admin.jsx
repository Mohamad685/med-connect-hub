import React from "react";
import {
	Box,
	CssBaseline,
	AppBar,
	Toolbar,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
} from "@mui/material";
import {
	Person as PersonIcon,
	BusinessCenter as BusinessCenterIcon,
	HealthAndSafety as HealthAndSafetyIcon,
} from "@mui/icons-material";

import { Link, Routes, Route, useNavigate } from "react-router-dom";
import AdminPatients from "./AdminPatients";
import AdminDoctors from "./AdminDoctor";
import AdminUserss from "./AdminAddition";
import AdminInsurance from "./AdminInsurance";

const drawerWidth = 240;

const Admin = () => {
	
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, color: "white" }}>
						Hello Admin
					</Typography>
					<Button
						sx={{ color: "white" }}
						onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}>
				<Toolbar />
				<Box sx={{ overflow: "auto" }}>
					<List>
						{[
							["Patients", "adminPatients"],
							["Doctors", "adminDoctors"],
							["Insurance Companies", "adminInsurance"],
							["Add Users", "adminUsers"],
						].map((item, index) => (
							<ListItem
								button
								key={item[0]}
								component={Link}
								to={item[1]}>
								<ListItemIcon>
									{item[0] === "Insurance Companies" ? (
										<BusinessCenterIcon />
									) : item[0] === "Doctors" ? (
										<HealthAndSafetyIcon />
									) : (
										<PersonIcon />
									)}
								</ListItemIcon>
								<ListItemText primary={item[0]} />
							</ListItem>
						))}
					</List>
				</Box>
			</Drawer>
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
				<Toolbar />
				<Routes>
					<Route
						path="adminPatients"
						element={<AdminPatients />}
					/>
					<Route
						path="adminDoctors"
						element={<AdminDoctors />}
					/>
					<Route
						path="adminUsers"
						element={<AdminUserss />}
					/>
					<Route
						path="adminInsurance"
						element={<AdminInsurance />}
					/>
				</Routes>
			</Box>
		</Box>
	);
};

export default Admin;
