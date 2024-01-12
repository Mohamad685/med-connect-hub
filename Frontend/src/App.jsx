import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/Homepage";
import Footer from "./Components/Footer/Footer";
import InputForm from "./Components/Input/Input";
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
					path="/doctor"
					element={<PatientRegister />}
				/>
			</Routes>
			<Footer />
			{/* <Login/> */}
		</BrowserRouter>
	);
}

export default App;
