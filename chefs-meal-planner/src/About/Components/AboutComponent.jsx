/**

 * @module AboutComponent
 * @memberof About
 * @returns {JSX.Element} The rendered ParkInfoComponent component.
 */
// AboutComponent.jsx
import React, { useState, useEffect } from 'react';
import '../../Style/about.css';


function AboutComponent() {
    return (
        <div className="about-content">
            <h1>About Our Meal Prep App</h1>
            <p>
                Our Meal Prep app makes healthy eating easy and efficient! Plan, organize, and customize weekly meals, get tailored grocery lists, and access step-by-step recipes. Whether you’re focusing on specific dietary goals or just looking to save time, this app provides everything you need for balanced and delicious meals.
            </p>
        </div>
    );
}

export default AboutComponent;
