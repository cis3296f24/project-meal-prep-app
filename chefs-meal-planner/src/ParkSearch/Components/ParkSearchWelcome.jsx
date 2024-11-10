import React from 'react'
import '../../Style/parkSearch.css'

/**
 * Component for welcoming and explaining the park search
 * functionality to a user.
 * 
 * @component
 * @module ParkSearchWelcome
 * @memberof ParkSearch
 * @returns {JSX.Element} Park search welcome header
 */
const ParkSearchWelcome = () => {
    return (
        <div className='park-search-welcome'>
            <center>
                <h1 id="search-title">Search for a Park</h1>

                <div className="search-about">
                    <p>
                        Welcome to the Parks Finder Application! Select an activity below to begin finding the perfect park for you:
                    </p>
                    {/* <input type="text" placeholder="Search for activities..." id="activityInput"></input> */}
                </div>
            </center>
        </div>
    )
}

export default ParkSearchWelcome