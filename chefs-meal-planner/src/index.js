/**
 * This file is the entry point of the React application.
 * It renders the main components of the application using React Router.
 * The components include ParkSearch, ParkInfo, HomePage, and ParkPlan.
 * It also includes a Navbar and a Footer component.
 * The main CSS file is imported and applied to the rendered components.
 * The root element is obtained using ReactDOM.createRoot and the components are rendered inside it.
 * The activitiesDropdown element is commented out.
 * Michael
 * Performance measurement and analytics functionality are mentioned but not implemented.
 * @file
 * @summary the entry point of the React application
 * @module index
 * @requires react
 * 
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage.js';
import MealAI from './MealAI.js';
import MealPlan from './MealPlan.js';
import Checkout from './Checkout.js';
import About from './About.js';
import Navbar from './GlobalComponents/Navbar.jsx';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Footer from './GlobalComponents/Footer.jsx';
import './Style/main.css';
import '@fortawesome/fontawesome-free/css/all.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/MealAI" element={<MealAI/>} />
                <Route path="/MealPlan" element={<MealPlan/>} />
                <Route path="/Checkout" element={<Checkout/>} />
                <Route path="/About" element={<About/>} />
            </Routes>
            <Footer></Footer>
        </Router>

      
    </div>
);


