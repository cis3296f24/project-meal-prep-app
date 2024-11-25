/**
 * Renders the ParkSearch component page.
 * @component
 * @module MealAI
 * @returns {JSX.Element} The rendered ParkSearch component.
 */
import React from 'react';
import ParkAIHome from './MealAI/Components/ParkAIHome.jsx';
import './Style/parkAI.css';
function MealAI(){
    return(
    <div className='meal-ai' >
        <ParkAIHome />
        
    </div>
    );
}

export default MealAI;