/**
 * Renders a navigation bar component with links to different pages.
 * @module Navbar
 * @memberof GlobalComponents
 * 
 * @returns {JSX.Element} The rendered navigation bar component.
 */
import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Style/navbar.css'
import chefHat from './cheficon.png'
const Navbar = () => {
    return (
        <nav className="nav-bar">
            <ul>
                <li className = "header">
                    <NavLink to="/">My Secret Recipes</NavLink>
                </li>
                <li className = "logo">
                    <img src = {chefHat} alt = "chefHat"/>
                </li>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/About
                    " reloadDocument>About</NavLink>
                </li>
                <li>
                    <NavLink to="/MealPlan">My Recipes</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar