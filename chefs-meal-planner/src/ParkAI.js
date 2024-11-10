/**
 * Renders the ParkSearch component page.
 * @component
 * @module ParkAI
 * @returns {JSX.Element} The rendered ParkSearch component.
 */
import React from 'react';
import ParkAIHome from './ParkAI/Components/ParkAIHome.jsx';
import './Style/parkAI.css';
function ParkAI(){
    return(
    <div className='park-ai' >
        <ParkAIHome />
        
    </div>
    );
}

export default ParkAI;