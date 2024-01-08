import React from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import "../NavBar/NavBar.css";

function NavBar(){
    const scrollTo = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      };
    return(
        <>
        <div className="navbar">
            <img src='../../src/assets/pics/logo.png' className="navbar-pic" alt="logo"></img>
            <ul className="navbar-list">
                <li className="navbar-home">
                <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-about" onClick={()=> scrollTo('aboutus')}>About Us</li>
                <li className="navbar-services"onClick={()=> scrollTo('services')}>Services</li>
                <li className="navbar-contact" onClick={()=> scrollTo('Contact')}>Contact Us</li>
                <li className="login">Login</li>
            </ul>
        </div>
        
        </>
    );
}

export default NavBar;