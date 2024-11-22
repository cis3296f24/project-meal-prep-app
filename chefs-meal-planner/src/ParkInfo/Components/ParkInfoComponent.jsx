/**
 * ParkInfoComponent is a React component that displays information about national parks.
 * It fetches park data from the ParkInfo functionality and renders the information on the page.
 * If there is more than one park, it displays a list of parks. If there is only one park, it displays detailed information about that park.
 * @module ParkInfoComponent
 * @memberof ParkInfo
 * @returns {JSX.Element} The rendered ParkInfoComponent component.
 */
// ParkInfoComponent.jsx
import React, { useState, useEffect } from 'react';
import { ParkInfo } from '../Functionality/ParkInfo'; // Importing the functionality
import '../../Style/parkInfo.css';
import ParkVideos from './ParkVideos';

function ParkInfoComponent() {
    const [parkJSON, setParks] = useState([]);
    
    var url = new URL(window.location);
    var page = 0;
    page = url.searchParams.get("page");
    if(page==null)
        page = 0;
    var pageUp = parseInt(page)+50;
    var pageDown = parseInt(page)-50;
    if(pageDown<0)
        pageDown = 0;

    const parkCode = url.searchParams.get("parkCode");
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                var json;

                //const parkCode = window.location.hash.substring(1); //hash value from selecting a park removing hash char
                if(parkCode == null)
                    json = await ParkInfo('', page);
                else
                    json = await ParkInfo(parkCode, 0);
                console.log(json);
                setParks(json.data);
            } catch (error) {
                // Handle the error, if needed
            }
        };

        fetchData();
    }, []);

    if(parkJSON.length>1){ //list all the parks
        return (
            <div className="top-padding-info">
                <div className='all-parks-info-welcome'>
                       <center>
                            <h1 id="park-info-title">Park Information Page</h1>
                            <h2>Browse through all the US National Parks!</h2>
                        </center>
                </div>
                <br></br>
                <div className = 'parkInfo'>
                    <div className="parks">

                        {parkJSON?.map((park) => (
                            <div key={park.id} className="post-card">
                            <a className='park-info-link' href={'ParkInfo?parkCode='+park.parkCode}>
                            <div>
                                <div className="learn-more-dropdown">
                                    <div>
                                        <p className="learn-more-name">{park.fullName}</p>
                                        <p>{park.states}</p>
                                    </div>
                                    
                                </div>
                                    <img src={park.images.length !== 0  ? park.images[0].url : ''} alt='' width='100' height='300'/>
                            </div>
                            <p className="description">{park.description}</p>
                            </a>
                        </div>
                        ))}
                    </div>
                </div>
                <a href={'./ParkInfo?page='+pageDown}><button className="park-info-button">Previous Page</button></a>
                <a href={'./ParkInfo?page='+pageUp}><button className="park-info-button">Next Page</button></a>
            </div>
        );
    }
    else{ //detail for one park
        return (
            <div className='park-info'>
                    {parkJSON?.map((park) => (
                        <>
                        <div key={park.id} className="parkInfo" style={{ backgroundImage: 'url(' + park.images[0].url + ')', backgroundSize: 'auto' }}>
                            <div className='park-info-welcome'>
                                <center>
                                    <h1 id="info-title">{park.fullName}</h1>
                                    <h2>Park Information</h2>
                                    <address>{park.addresses[0].line1}<br></br>
                                        {park.addresses[0].city}, 
                                        {park.addresses[0].stateCode}<br></br>
                                    </address>
                                    <br></br>
                                </center>
                            </div>

                            <br></br>

                            <center>
                                <div className='box-1'>
                                    <div className='hours'>
                                        <ParkVideos parkCode={park.parkCode} />
                                    </div>
                                    <div className='hours'>
                                        <h1>Hours:</h1>
                                        <ul className='hours-list'>
                                            <li>Monday:    {park.operatingHours[0].standardHours.monday}</li>
                                            <li>Tuesday:   {park.operatingHours[0].standardHours.tuesday}</li>
                                            <li>Wednesday: {park.operatingHours[0].standardHours.wednesday}</li>
                                            <li>Thursday:  {park.operatingHours[0].standardHours.thursday}</li>
                                            <li>Friday:    {park.operatingHours[0].standardHours.friday}</li>
                                            <li>Saturday:  {park.operatingHours[0].standardHours.saturday}</li>
                                            <li>Sunday:    {park.operatingHours[0].standardHours.sunday}</li>
                                        </ul>
                                        <br></br>
                                        <p>{park.description}</p>
                                        <a href={park.url} target="_blank" rel="noreferrer">For More Information</a>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <a href='./ParkInfo'><button className="park-info-button">Return To Parks</button></a>
                                        <a href={'./ParkPlan?parkCode='+park.parkCode}><button className="park-info-button">Plan A Trip</button></a>
                                    </div>
                                </div>
                            </center>

                            <br></br>
                            
                            <div className='activities-list'>
                                {park.activities?.map((activity) =>(<>
                                <div className='activity'><p key={activity.id}>{activity.name}</p></div></>))}
                            </div>

                            
                            
                        </div>
                        </>
                    ))}
            </div>
        );
    }
}

export default ParkInfoComponent;
