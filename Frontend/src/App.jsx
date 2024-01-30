import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/Homepage";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PatientRegister from "./Pages/PatientRegister/PatientRegister";
import Diagnosis from "./Pages/Diagnosis/Diagnosis";
import Patientpreview from "./Pages/PatientPage/PatientPage";
import InsurancePage from "./Pages/InsurancePage/InsurancePage";
import Admin from "./Pages/AdminDashboard/Admin";
import PatientInsurance from "./Pages/PatientInsurance/PatientInsurance";
import DoctorPatients from "./Pages/DoctorPatients/DoctorPatients";
import Chat from "./Components/LiveChat/Chat";

function AppWrapper() {
	return (
		<BrowserRouter>
			<App />
		</BrowserRouter>
	);
}

function App() {
	const location = useLocation();
	const isAdminRoute = location.pathname.startsWith("/admin");
	const liveChat = location.pathname.startsWith("/live-chat");
	return (
		<>
			{!isAdminRoute && <NavBar />}
			<div>
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/patients-doctor"
						element={<DoctorPatients />}
					/>
					<Route
						path="/patient-registration"
						element={<PatientRegister />}
					/>
					<Route
						path="/diagnosis/:patientId"
						element={<Diagnosis />}
					/>
					<Route
						path="/live-chat"
						element={<Chat/>}
					/>
					<Route
						path="/patient-file"
						element={<Patientpreview />}
					/>
					<Route
						path="/insurance-page"
						element={<InsurancePage />}
					/>
					<Route
						path="/patient-insurance-page/:patientId"
						element={<PatientInsurance />}
					/>
					<Route
						path="/admin/*"
						element={<Admin />}
					/>
				</Routes>
			</div>
			
			{!isAdminRoute && !liveChat && <Footer />}

		</>
	);
}

export default AppWrapper;
