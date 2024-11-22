import React from 'react';
import { Link } from 'react-router-dom';

const Buttons = () => {
    return (
        <div className="homepage-button-wrapper">
            <div className="button-container">
                <p>Discover New Recipes</p> 
                <Link to="/MealAI">
                    <button className="homepage-button">Get Recipes</button>
                </Link>                    
            </div>              
        </div>
    );
};

export default Buttons;
