import React from 'react';
import ParkInfoComponent from './ParkInfo/Components/ParkInfoComponent.jsx';
import './Style/parkInfo.css';
/**
 * Renders the ParkInfo component page.
 * @component
 * @module ParkInfo
 * 
 * @returns {JSX.Element} The rendered ParkInfo component.
 */
function ParkInfo(){
    return(
        <div className="park-info-parent">
            <ParkInfoComponent />
        </div>
    );
}

export default ParkInfo;