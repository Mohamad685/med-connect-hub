import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/Homepage";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Auth";
import PatientRegister from "./Pages/PatientRegister/PatientRegister";

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
			</Routes>
			<Footer />
			{/* <Login/> */}
		</BrowserRouter>
	);
}

export default App;
