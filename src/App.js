import React from 'react';
//import './App.css';
import Navbar from './components';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';
import Board from './pages/BingoBoard';
import WheelSpin from './pages/wheelspin'
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home />} />
		{/* <Route path='/about' element={<About/>} />
		<Route path='/contact' element={<Contact/>} />
		<Route path='/blogs' element={<Blogs/>} /> */}
		<Route path='/wheelspin' element={<WheelSpin/>} />
		<Route path='/BingoBoard' element={<Board/>} />
	</Routes>
	</Router>
);
}

export default App;
