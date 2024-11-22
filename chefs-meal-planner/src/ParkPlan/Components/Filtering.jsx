/**
 * Component for filtering parks and activities.
 * @module Filtering
 * @memberof ParkPlan
 * @component
 * @param {Function} updateParkCode - Function to update the selected park code.
 * @param {Function} updateDates - Function to update the selected date range.
 * @param {Function} updateActivities - Function to update the selected activities.
 * @returns {JSX.Element} Filtering component.
 */
import React, { useState, useEffect } from 'react'
import { FetchParks } from '../Functions/FetchParks';
import { Activities } from '../Functions/Activities'; // Importing the functionality
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Filtering = ({updateParkCode, updateDates, updateActivities}) => {
    const [posts, setPosts] = useState([]);
   
    useEffect(() => {
        setActivitiesIsLoading(true);
        const fetchData = async () => {
            try {
                const json = await Activities();
                console.log(json);
                setPosts(json.data);
                setActivitiesIsLoading(false);
            } catch (error) {
                // Handle the error, if needed
                setActivitiesIsLoading(false);
            }
        };

        fetchData();
      
    }, []);

    //Get list of activities in correct form for dropdown
    const activities = posts?.map((post) => { return { value: post.id, label: post.name } });
    const animatedComponents = makeAnimated()
    const [selectedOption, setSelectedOption] = useState([]);
    const [parksFiltered, setParksFiltered] = useState(null);
    const [parkCode, setParkCode] = useState(null);    

    const [parksIsLoading, setParksIsLoading] = useState(true);
    const [activitiesIsLoading, setActivitiesIsLoading] = useState(true);

    const [startDate, setStartDate] = useState(new Date());
    useEffect(() => {
        setParksIsLoading(true);
        const fetchData = async () => {
            try {
                const json = await FetchParks(selectedOption);
                console.log(json);
                // get only the full names 
                setParksFiltered(json.data.map((park) => { return { label: park.fullName, value:park.parkCode, latitude:park.latitude, longitude:park.longitude} }));
                setParksIsLoading(false);
            } catch (error) {
                // Handle the error, if needed
                setParksIsLoading(false);
            }
        };

        fetchData();
      
    }, []);
    return (
        <div>
            <div className="planning-dropdowns">
                <div className='plan-parks-list'>
                        <h2>Select a Park</h2>
                        <div className='plan-parks-dropdown'>
                            <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                className="basic-single"
                                classNamePrefix="select"
                                isDisabled={parksIsLoading}
                                isLoading={parksIsLoading}
                                options={parksFiltered}
                                onChange={choice => setParkCode(choice)}
                            />
                        </div>
                </div>
                <div className='plan-activities-list'>
                    <h2>Select Activities</h2>
                        <div className="activity-dropdown">
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                                isDisabled={activitiesIsLoading}
                                isLoading={activitiesIsLoading}
                                options={activities}
                                onChange={choice => setSelectedOption(choice)}
                            />
                        </div>
                
                </div>
            </div>
            <div className="plan-calendar-background">
            <div className="plan-calendar">
                <h2 id="date-range-title">Select a Date Range</h2>
                <Calendar 
                    selectRange={true}
                    hover={true}
                    allowPartialRange={true}
                    defaultValue={[new Date(), new Date()]}
                    returnValue={"start"}
                    onChange={setStartDate}
                //    max date should be 7 days from the selected start date
                
                /> 
            </div>
            </div>
    
            <div className="plan-search-button-container">
                <button className="plan-search-button" onClick={() => {
                    updateParkCode(parkCode);
                    console.log(parkCode);
                    updateDates(startDate);
                    console.log("selected option",selectedOption)
                    updateActivities(selectedOption);
                }}>Plan a Trip</button>
                {/* <button onClick={() => {
                    console.log(parkCode.value);}}>Test</button> */}
            </div>
           
        </div>
    )
}

export default Filtering