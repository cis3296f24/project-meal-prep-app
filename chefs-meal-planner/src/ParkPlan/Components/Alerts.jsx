/**
 * Renders the Alerts component.
 * @module Alerts
 * @memberof ParkPlan
 * 
 * @param {Object} props - The component props.
 * @param {string} props.parkCode - The park code.
 * @returns {JSX.Element} The rendered Alerts component.
 */
import React from 'react'
import { useEffect, useState } from 'react';
import FetchAlerts from '../Functions/FetchAlerts';
import {FetchWeatherAlerts} from '../Functions/FetchWeatherAlerts';
import '../../Style/alerts.css';
const Alerts = ({ parkCode }) => {
    const [alerts, setAlerts] = useState([]);
    const [weatherAlerts, setWeatherAlerts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("parkCode", parkCode.value);
                const json = await FetchAlerts(parkCode.value);
                console.log(json);
                setAlerts(json.data);
            } catch (error) {
                // Handle the error, if needed
                console.log(error);
            }
        };
        const fetchWeatherAlerts = async () => {
            try{
                const weatherAlerts = await FetchWeatherAlerts(parkCode);
                console.log(weatherAlerts);
                setWeatherAlerts(weatherAlerts);
        
               
            }catch(error){
                console.log(error);
            }
          
        }
        if (parkCode !== null) {
            fetchData();
            fetchWeatherAlerts();
        }
    }, [parkCode]);

    if (parkCode === null) {
        return null;
    }


    // if there is no parkcode yet, this will not show up
    return (
        <div className='alerts-container'>
            <h1>Alerts</h1>
            {/* if alerts is empty, div that says 0 alerts */}
            {alerts.length === 0 && weatherAlerts === 0 ? (
                <div className='alert'>No alerts</div>
            ) : (
                <div>
                    <h4>Park Alerts</h4>
                    <div className='alert'>

                        {alerts.map((alert, index) => (
                            <p key={index} className='alert-title'>{alert.title}</p>
                        ))}
                    </div>
                    <h4>Weather Alert</h4>
                    <div className='alert'>

                        {weatherAlerts}
                    </div>
                </div>

            )}
        </div>
    )
}

export default Alerts