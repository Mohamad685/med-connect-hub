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
} from "@mui/material";
import {
	Person as PersonIcon,
	BusinessCenter as BusinessCenterIcon,
	HealthAndSafety as HealthAndSafetyIcon,
} from "@mui/icons-material";

import { Link, Routes, Route } from "react-router-dom";

import AdminPatients from "./AdminPatients";
// import AdminDoctors from "./AdminDoctors";
// import AdminUserss from "./AdminAddition";


const drawerWidth = 240;

const Admin = () => {
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
						sx={{ color: "white" }}>
						Admin Dashboard
					</Typography>
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
							["Insurance Companies", "/insurance"],
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
					{/* <Route
						path="adminDoctors"
						element={<AdminDoctors />}
					/> */}
					{/* <Route
						path="adminUsers"
						element={<AdminUsers />}
					/> */}

				</Routes>
			</Box>
		</Box>
	);
};

export default Admin;
