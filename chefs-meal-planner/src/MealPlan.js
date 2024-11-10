/**
 * Renders the ParkSearch component page.
 * @component
 * @module MealPlan
 * @returns {JSX.Element} The rendered ParkSearch component.
 */
import React from 'react';
import MealPlanHome from './MealPlan/Components/MealPlanHome.jsx';
import './Style/mealPlan.css';
function MealPlan(){
    return(
    <div className='meal-plan' >
        <MealPlanHome />  
    </div>
    );
}

export default MealPlan;