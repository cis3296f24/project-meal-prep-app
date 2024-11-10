import React from 'react'

/**
 * Component representing the welcome section of the homepage.
 * @module Welcome
 * @memberof HomePage
 * @returns {JSX.Element} The rendered welcome section.
 */
const Welcome = () => {
    return (
        <div className="welcome">
            <h1 className="welcome-title">Meal Prep Made Easy</h1>
            <p className="welcome-text">
                Welcome to the Meal Prep App! This web app is designed to help you plan delicious and healthy meals for the week. 
                Click on "Get Recipes" to discover new recipes tailored to your preferences, or click on "Weekly Meal Plan" to organize your weekly meals and stay on track with your goals.
            </p>
            <div>
                {/* Additional content (if needed) */}
            </div>
        </div>
    )
}

export default Welcome
