import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/Homepage";
import Footer from "./Components/Footer/Footer";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
	return (
    <BrowserRouter>
			<NavBar/>
			<Routes>
			<Route path='/' element={<HomePage/>}/>
			</Routes>
			<Footer/>
    </BrowserRouter>
	);
}

export default App;
