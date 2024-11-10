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
import tree from './tree.png'
const Navbar = () => {
    return (
        <nav className="nav-bar">
            <ul>
                <li className = "header">
                    <NavLink to="/">Chef's Planner</NavLink>
                </li>
                <li className = "logo">
                    <img src = {tree} alt = "tree"/>
                </li>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/ParkInfo" reloadDocument>About</NavLink>
                </li>
                <li>
                    <NavLink to="/MealPlan">Meal Plan</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar