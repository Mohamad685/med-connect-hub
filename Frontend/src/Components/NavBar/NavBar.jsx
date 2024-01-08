import React from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import "./NavBar.css";

function NavBar(){
    const scrollTo = (sectionId) => {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      };
    return(
        <>
        <div className="navbar">
            <img src='../../src/assets/pics/logo.png' className="navbar-pic" alt="logo"></img>
            <img src='../../src/assets/pics/slogan.png' className="navbar-slogan" alt="logo"></img>
            <ul className="navbar-list">
                <li className="navbar-option">
                <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-option" onClick={()=> scrollTo('aboutus')}>About Us</li>
                <li className="navbar-option"onClick={()=> scrollTo('services')}>Services</li>
                <li className="navbar-option" onClick={()=> scrollTo('Contact')}>Contact Us</li>
                <li className="navbar-option">Login</li>
            </ul>
        </div>
        
        </>
    );
}

export default NavBar;