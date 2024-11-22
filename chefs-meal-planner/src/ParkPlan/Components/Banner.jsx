import React from 'react'

/**
 * Renders the banner component for the ParkPlan page.
 * @module Banner
 * @memberof ParkPlan
 * 
 * @returns {JSX.Element} The rendered banner component.
 */
const Banner = () => {
  return (
    <div>
        <div className="park-plan-welcome">
            <h1 id="plan-title">Plan a Trip</h1>
            <p id="plan-description">
                Plan your next trip to a National Park.
                Select a park, desired activities and the date and we'll show you the best options.
            </p>
            
        </div>
    </div>
  )
}

export default Banner