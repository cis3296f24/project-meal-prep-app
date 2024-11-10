/**
 * Renders the Schedule component.
 * @module Schedule
 * @memberof ParkPlan
 * @param {Object} props - The component props.
 * @param {Array} props.dates - The array of dates.
 * @param {string} props.parkCode - The park code.
 * @param {Array} props.activities - The array of activities.
 * @returns {JSX.Element|null} The rendered Schedule component.
 */
import React, { useEffect } from 'react'
import { useState } from 'react'
import { FetchForecast } from '../Functions/FetchForecast';
import { act } from 'react-dom/test-utils';
import { FetchThingsToDo } from '../Functions/FetchThingsToDo';
import { FetchParkInfo } from '../Functions/FetchParkInfo';
import { FetchPlaces } from '../Functions/FetchPlaces';
import { FetchPeople } from '../Functions/FetchPeople';
import '../../Style/parkPlanning.css';

const Schedule = ({ dates, parkCode, activities}) => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [datesArray, setDatesArray] = useState([]);
    const [relevantTimeForecast, setRelevantTimeForecast] = useState([]);
    const [thingsToDo, setThingsToDo] = useState();
    const [activityAlternatives,setActivityAlternatives] = useState();
    const [placeAlternatives,setPlaceAlternatives] = useState();
    const [peopleAlternatives,setPeopleAlternatives] = useState();
    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const forecasts = await FetchForecast(parkCode);
                const relevantForecasts = [];
                for (let day in forecasts) {
                    let startTime = new Date(forecasts[day].startTime);
                    startTime.setHours(0, 0, 0, 0);
                    let start = new Date(startDate);
                    let end = new Date(endDate);

                    if (startTime >= start && startTime <= end) {
                        relevantForecasts.push({
                            startTime: startTime.toLocaleDateString(),
                            icon: forecasts[day].icon,
                            shortForecast: forecasts[day].shortForecast,
                        });
                    }
                }
                setRelevantTimeForecast(relevantForecasts);
                console.log(relevantTimeForecast);
            } catch (error) {
                console.log(error);
            }
        }
        if (dates !== null) {
            try {


                setStartDate(dates[0].toLocaleDateString());
                if (dates[1]) {
                    setEndDate(dates[1].toLocaleDateString());
                } else {
                    setEndDate(startDate);
                }

                // Convert startDate and endDate to Date objects
                const start = new Date(startDate);
                const end = new Date(endDate);

                // Create an array of dates between start and end
                const dateArray = [];
                while (start <= end) {
                    dateArray.push(new Date(start));
                    start.setDate(start.getDate() + 1);
                }

                // Now dateArray contains all the dates between startDate and endDate
                //console.log(dateArray);
                setDatesArray(dateArray);
                fetchForecastData();


            } catch (error) {
            }

        }

    }, [dates, startDate, endDate, parkCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activitiesToDo = await FetchThingsToDo(parkCode, activities);
                setThingsToDo(activitiesToDo);
                console.log("things to do", thingsToDo);
            } catch (error) {
                // Handle the error, if needed
                console.log(error);
            }
        };

        if (parkCode !== null && dates !== null && activities !== null) {
            fetchData();
        }
    }, [parkCode,activities,dates]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const placesToSee = await FetchPlaces(parkCode);
                setPlaceAlternatives(placesToSee);
            } catch (error) {
                // Handle the error, if needed
                console.log(error);
            }
        };

        if (parkCode !== null && dates !== null && activities !== null) {
            fetchData();
        }
    }, [parkCode,activities,dates]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const peopleToLearn = await FetchPeople(parkCode);
                setPeopleAlternatives(peopleToLearn);
            } catch (error) {
                // Handle the error, if needed
                console.log(error);
            }
        };

        if (parkCode !== null && dates !== null && activities !== null) {
            fetchData();
        }
    }, [parkCode,activities,dates]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const otherActivities = await FetchParkInfo(parkCode.value);
                setActivityAlternatives(otherActivities);
            } catch (error) {
                // Handle the error, if needed
                console.log(error);
            }
        };

        if (parkCode !== null && dates !== null && activities !== null) {
            fetchData();
        }
    }, [parkCode,activities,dates]);

    if (dates === null || parkCode === null || activities === null) {
        return null;
    }
    if (parkCode === null) {
        return null;
    }

    console.log("things to do",thingsToDo);
    console.log("place alternatives", placeAlternatives);
    console.log("activity alternatives", activityAlternatives);
    console.log("people alternatives", peopleAlternatives);

    const ReturnSchedule = () => {
        var morningThingsIndex = 0;
        var dayThingsIndex = 0;
        var eveningThingsIndex = 0;
        const alreadyUsed = new Set();
        const morningActivities = [];
        const dayActivities = [];
        const eveningActivites = [];
        const randomPlaces = [];
        const randomPeople = [];
        const randomActivities = [];
        for(let i =0; i<datesArray.length; i++) {
            //Fill in morning array
            console.log("in foreach",datesArray[i]);
            while(((morningThingsIndex < thingsToDo?.length) && thingsToDo && !(thingsToDo[morningThingsIndex]?.timeOfDay.includes("Dawn"))) || ((morningThingsIndex < thingsToDo?.length) && thingsToDo && alreadyUsed.has(thingsToDo[morningThingsIndex]?.id))) {
                morningThingsIndex++;
            }

            if(morningThingsIndex === thingsToDo?.length) {
                if(alreadyUsed.has(thingsToDo && thingsToDo[morningThingsIndex - 1]?.id)) {
                    console.log("in morning clear");
                    alreadyUsed.clear();
                }
                console.log("in morning length");
                morningThingsIndex=0;
                morningActivities.push({});
            } else {
                morningActivities.push(thingsToDo && thingsToDo[morningThingsIndex]);
                alreadyUsed.add(thingsToDo && thingsToDo[morningThingsIndex]?.id);
                console.log("already used",alreadyUsed);
                morningThingsIndex++;
                if(morningThingsIndex === thingsToDo?.length) {
                    morningThingsIndex=0;
                }
            }

            //Fill in day array
            /*dayActivities.push(thingsToDo && thingsToDo[dayThingsIndex]);
            dayThingsIndex++;
            if(dayThingsIndex === thingsToDo?.length) {
                dayThingsIndex=0;
            }
            console.log("things index",dayThingsIndex);*/
            while(((dayThingsIndex < thingsToDo?.length) && thingsToDo && !(thingsToDo[dayThingsIndex]?.timeOfDay.includes("Day"))) || ((dayThingsIndex < thingsToDo?.length) && thingsToDo && alreadyUsed.has(thingsToDo[dayThingsIndex]?.id))) {
                console.log("time of day", thingsToDo && !thingsToDo[dayThingsIndex]?.timeOfDay);
                dayThingsIndex++;
            }

            if(dayThingsIndex === thingsToDo?.length) {
                if(alreadyUsed.has(thingsToDo && thingsToDo[dayThingsIndex - 1]?.id)) {
                    alreadyUsed.clear();
                    console.log("should clear day",alreadyUsed);
                }
                dayThingsIndex=0;
                dayActivities.push({});
            } else {
                dayActivities.push(thingsToDo && thingsToDo[dayThingsIndex]);
                alreadyUsed.add(thingsToDo && thingsToDo[dayThingsIndex]?.id);
                dayThingsIndex++;
                if(dayThingsIndex === thingsToDo?.length) {
                    dayThingsIndex=0;
                }
            }

            //Fill in evening array
            /*eveningActivites.push(thingsToDo && thingsToDo[eveningThingsIndex]);
            eveningThingsIndex++;
            if(eveningThingsIndex === thingsToDo?.length) {
                eveningThingsIndex=0;
            }*/
            while(((eveningThingsIndex < thingsToDo?.length) && thingsToDo && !(thingsToDo[eveningThingsIndex]?.timeOfDay.includes("Dusk") || thingsToDo[eveningThingsIndex]?.timeOfDay.includes("Night"))) || ((eveningThingsIndex < thingsToDo?.length) && thingsToDo && alreadyUsed.has(thingsToDo[eveningThingsIndex]?.id))) {
                console.log("time of day", thingsToDo && !thingsToDo[eveningThingsIndex]?.timeOfDay);
                eveningThingsIndex++;
            }

            if(eveningThingsIndex === thingsToDo?.length) {
                if(alreadyUsed.has(thingsToDo && thingsToDo[eveningThingsIndex - 1]?.id)) {
                    alreadyUsed.clear();
                    console.log("should clear evening",alreadyUsed);
                }
                eveningThingsIndex=0; 
                eveningActivites.push({});
            } else {
                eveningActivites.push(thingsToDo && thingsToDo[eveningThingsIndex]);
                alreadyUsed.add(thingsToDo && thingsToDo[eveningThingsIndex]?.id);
                eveningThingsIndex++;
                if(eveningThingsIndex === thingsToDo?.length) {
                    eveningThingsIndex=0;
                }
            }

            //Fill up random activities, people, and places
            if(placeAlternatives?.data.length !== 0) {
                randomPlaces.push((placeAlternatives && placeAlternatives?.data[Math.floor(Math.random() * placeAlternatives?.data.length)]));
            }
            //Fill up random activities, people, and places
            if(peopleAlternatives?.data.length !== 0) {
                randomPeople.push((peopleAlternatives && peopleAlternatives?.data[Math.floor(Math.random() * peopleAlternatives?.data.length)]));
            }
        };
        return (datesArray.map((date, index) => (
            <div>
                <div key={index} className='individual-date-container'>
                    <div className="date-holder">
                        <center>
                        <h2 id="plan-see-date">{date.toLocaleDateString()}</h2>
                        {relevantTimeForecast[index]?.startTime === date.toLocaleDateString() ? (
                            <div className='weather'>
                                <img
                                    className="weather-image"
                                    alt="weather icon"
                                    src={relevantTimeForecast[index]?.icon}
                                ></img>
                                <p id="weather-text">{relevantTimeForecast[index]?.shortForecast}</p>
                            </div>
                        ) : null}
                        </center>
                    </div>
                    <div className='plan-schedule-activities'>
                        <div>
                        <h2>Morning</h2>
                        {morningActivities && (JSON.stringify(morningActivities[index]) === JSON.stringify({}) ? 
                        (placeAlternatives?.data.length === 0 ? <div>"Relax!"</div> : <div><div className="plan-title-and-button"><div className="plan-activity-title">Visit {randomPlaces[index]?.title}</div><div className="plan-description">{randomPlaces[index]?.listeningDescription}</div> <a href={randomPlaces[index]?.url}><button className='plan-learn-more-button'>Learn More</button></a></div></div>)  : <div><div className="plan-title-and-button"><div className="plan-activity-title">{morningActivities[index]?.title}</div><div className="plan-description">{morningActivities[index]?.shortDescription}</div><a href={morningActivities[index]?.url}><button className="plan-learn-more-button">Learn More</button></a></div></div>)}
                        {console.log(morningActivities)}
                        </div>
                        <div>
                        <h2>Afternoon</h2>
                        {dayActivities && (JSON.stringify(dayActivities[index]) === JSON.stringify({}) ? (activityAlternatives?.data[0].activities.length === 0 ? "Relax!" : "Activity! " + (activityAlternatives && activityAlternatives?.data[0].activities[Math.floor(Math.random() * activityAlternatives?.data[0].activities.length)].name)) : <div><div className="plan-title-and-button"><div className="plan-activity-title">{dayActivities[index]?.title}</div><div className="plan-description">{dayActivities[index]?.shortDescription}</div><a href={dayActivities[index]?.url}><button className="plan-learn-more-button">Learn More</button></a></div></div>)}
                        {console.log(dayActivities)}
                        </div>
                        <div>
                        <h2>Evening</h2>
                        {eveningActivites && (JSON.stringify(eveningActivites[index]) === JSON.stringify({}) ? (peopleAlternatives?.data.length === 0 ? <div>"Relax!"</div> : <div><div className="plan-title-and-button"><div className="plan-activity-title">Learn about {randomPeople[index]?.title} </div><div className="plan-description">{randomPeople[index]?.listingDescription}</div> <a href={randomPeople[index]?.url}><button className='plan-learn-more-button'>Learn More</button></a></div></div>)  : <div><div className="plan-title-and-button"><div className="plan-activity-title">{eveningActivites[index]?.title}</div><div className="plan-description">{eveningActivites[index]?.shortDescription}</div><a href={eveningActivites[index]?.url}><button className="plan-learn-more-button">Learn More</button></a></div></div>)}
                        {console.log(eveningActivites)}
                        </div>
                        <br></br>
                    </div>
                </div>
                <br></br>
            </div>

        )));
    }

    return (
        <div>
            <div>
                {datesArray && datesArray.length > 0 ? <div id="schedule-title"><h1>Schedule</h1></div> : null}
            </div>
            <div className='dates-container'>
                <ReturnSchedule />
            </div >
        </div >
    )
}
export default Schedule
