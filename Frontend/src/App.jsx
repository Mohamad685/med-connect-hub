import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/Homepage";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientRegister from "./Pages/PatientRegister/PatientRegister";
import Diagnosis from "./Pages/Diagnosis/Diagnosis";
import Patientpreview from "./Pages/PatientPage/PatientPage";
import InsurancePage from "./Pages/InsurancePage/InsurancePage";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/patient-registration"
					element={<PatientRegister />}
				/>
				<Route
					path="/diagnosis"
					element={<Diagnosis />}
				/>
				<Route
					path="/patient-file"
					element={<Patientpreview />}
				/>
				<Route path="/insurance-page"
				element={<InsurancePage />}/>
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
