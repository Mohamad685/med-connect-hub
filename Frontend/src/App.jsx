import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage";
import footer from "./Components/Footer/Footer";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
	return (
    <BrowserRouter>
			<NavBar/>
			<Routes>
			<Route path='/' element={<HomePage/>}/>
			</Routes>
			<footer/>
			
    </BrowserRouter>
	);
}

export default App;
