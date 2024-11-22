import React from 'react'

/**
 * Renders the Explore component.
 * @module Explore
 * @memberof HomePage
 * @returns {JSX.Element} The rendered Explore component.
 */
const Explore = () => {
    return (
        <div>
            <h1>Explore Options</h1>
            <div className='parkSearchContainer'>
                <h3>Learn more about parks</h3>
                <p>Search Parks</p>
            </div>
            <div className='parkPlanContainer'>
                <h3>Plan a trip to a national park</h3>
                <p>Plan a trip</p>
            </div>
        </div>
    )
}

export default Explore