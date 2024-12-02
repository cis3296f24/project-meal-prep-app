import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchShoppingList } from '../Functionality/FetchShoppingList';
import { jsPDF } from "jspdf";
import '../../Style/mealPlan.css';

/**
 * Component to generate and display a shopping list based on selected meal ingredients.
 *
 * @component
 * @module CheckoutHome
 * @memberof Checkout
 * @returns {JSX.Element} Shopping list for selected meals
 */

const CheckoutHome = () => {
    const location = useLocation();
    const ingredients = useMemo(() => location.state?.ingredients || [], [location.state]);
    const [shoppingList, setShoppingList] = useState(null);
    const [loading, setLoading] = useState(false); // Initially not loading
    const [numPeople, setNumPeople] = useState('');
    const [showHeading, setShowHeading] = useState(false); // Track heading visibility
    const [displayedNumberOfPeople, setDisplayNumberOfPeople] = useState('')
    const handleChange = (event) => {
        setNumPeople(event.target.value);
    };

    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            let inputValue = numPeople.trim(); // Get input value
            setDisplayNumberOfPeople(inputValue)
            if (!inputValue || isNaN(inputValue) || !Number.isInteger(Number(inputValue)) || parseInt(inputValue) <= 0) {
                alert("Please enter a valid number of people.");
                return;
            }

            try {
                setLoading(true); // Start loading
                const scaledIngredients = ingredients.map(
                    (ingredient) => `${ingredient} for ${inputValue} people`
                ); // Example: scale ingredients based on input value

                const list = await fetchShoppingList(scaledIngredients, inputValue); // Call fetchShoppingList
                setShoppingList(list); // Update shopping list state
                setShowHeading(true); // Only show heading once the shopping list has loaded successfully
            } catch (error) {
                console.error("Error fetching shopping list:", error);
                setShoppingList("An error occurred while generating the shopping list.");
                setShowHeading(false); // Hide heading if there's an error
            } finally {
                setLoading(false); // End loading
            }
        }
    };

    const saveAsPDF = () => {
        const doc = new jsPDF();
        doc.text(`Shopping List for ${numPeople} People`, 10, 10); // Add a title
        doc.text(shoppingList, 10, 20); // Add the shopping list
        doc.save(`shopping_list_${numPeople}_people.pdf`); // Save the PDF
    };

    return (
        <div className='checkout'>
            <h1>Checkout</h1>
            <input
                type="text"
                id="amount-per-person"
                name="entry-box"
                value={numPeople} // Make the input a controlled component
                onChange={handleChange} // Update state on change
                onKeyDown={handleKeyPress} // Attach keypress event
                placeholder="Enter number of people and press Enter"
            />
            {loading && <p>Loading your custom shopping list...</p>}
            {!loading && showHeading && (
                <>
                    <h2>Your Shopping List for {displayedNumberOfPeople} People</h2>
                    <button onClick={saveAsPDF}>Save as PDF</button>
                </>
            )}
            {!loading && shoppingList && (
                <div className="shopping-list">
                    <pre>{shoppingList}</pre>
                </div>
            )}
        </div>
    );
};

export default CheckoutHome;
