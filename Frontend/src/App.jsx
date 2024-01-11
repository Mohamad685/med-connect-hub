import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/Homepage";
import Footer from "./Components/Footer/Footer";
import InputForm from "./Components/Input/Input";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
			</Routes>
			<Footer />
			{/* <InputForm
				width= "50rem"
				length= "2rem"
				placeholder="Enter"
			/> */}
		</BrowserRouter>
	);
}

export default App;
