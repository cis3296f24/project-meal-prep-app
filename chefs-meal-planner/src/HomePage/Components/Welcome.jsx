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
            <h1 className="welcome-title">Discover the secret behind great meals</h1>
            <p className="welcome-text">
                Welcome to My Secret Recipes! This website is designed to help you plan delicious and healthy meals for the week using AI.
                Click on "Get Recipes" to discover new recipes tailored to your preferences, or click on "My Recipes" to organize your weekly meals.
            </p>
            <div>
                {/* Additional content (if needed) */}
            </div>
        </div>
    )
}

export default Welcome