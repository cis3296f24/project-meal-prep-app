/**
 * Renders the home page of the application.
 * @component
 * @module HomePage
 * @returns {JSX.Element} The rendered home page component.
 */
import React from 'react'
import Welcome from './HomePage/Components/Welcome'
import Buttons from './HomePage/Components/Buttons'
import './Style/homepage.css'
const HomePage = () => {
  return (
    // <Navbar/>
    <div className = "home-page main-component">
        {/* <h1>Test Hello</h1> */}
        <Welcome/>
        <Buttons/>
    </div>
  )
}

export default HomePage