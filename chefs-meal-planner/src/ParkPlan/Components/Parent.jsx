/**
 * Parent component for managing park plans.
 * @component
 * @module ParkPlan
 * @memberof ParkPlan
 * @returns {JSX.Element} The rendered Parent component.
 * 
 */
import React from 'react'
import { useState } from 'react'
import Filtering from './Filtering'
import Alerts from './Alerts'
import Schedule from './Schedule'

const Parent = () => {
  const [parkCode, setParkCode] = useState(null);
  const [dates, setDates] = useState(null);
  const [activities, setActivities] = useState(null);

  /**
   * Updates the park code state.
   * @param {string} newParkCode - The new park code.
   */
  const updateParkCode = (newParkCode) => {
    setParkCode(newParkCode);
  }

  /**
   * Updates the activities state.
   * @param {string[]} newActivities - The new activities.
   */
  const updateActivities = (newActivities) =>  {
    console.log("set activity",newActivities);
    setActivities(newActivities);
  }

  /**
   * Updates the dates state.
   * @param {string[]} newDates - The new dates.
   */
  const updateDates = (newDates) => {
    console.log("set date",newDates);
    setDates(newDates);
  }

  return (
    <div>
      <Filtering updateParkCode={updateParkCode} updateDates={updateDates} updateActivities={updateActivities}/>
      <Alerts parkCode={parkCode}/>
      <Schedule dates={dates} parkCode={parkCode} activities={activities}/>
    </div>
  )
}

export default Parent