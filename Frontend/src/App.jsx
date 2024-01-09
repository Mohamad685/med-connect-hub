import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/Homepage";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
	return (
    <BrowserRouter>
			<NavBar/>
			<Routes>
			<Route path='/' element={<HomePage/>}/>
			</Routes>
			
    </BrowserRouter>
	);
}

export default App;