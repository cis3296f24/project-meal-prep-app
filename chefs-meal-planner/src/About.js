import React from 'react';
import AboutComponent from './About/Components/AboutComponent.jsx';
import './Style/about.css';
/**
 * Renders the ParkInfo component page.
 * @component
 * @module About
 * 
 * @returns {JSX.Element} The rendered ParkInfo component.
 */
function About(){
    return(
        <div className="about-parent">
            <AboutComponent />
        </div>
    );
}

export default About;