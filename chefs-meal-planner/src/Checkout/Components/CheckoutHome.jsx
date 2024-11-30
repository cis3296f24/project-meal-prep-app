import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchShoppingList } from '../../MealAI/Functionality/FetchShoppingList';
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
    const [numPeople, setNumPeople] = useState('2');
    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            const inputValue = event.target.value.trim(); // Get input value

            if (!inputValue || isNaN(inputValue) || parseInt(inputValue) <= 0 ) {
                alert("Please enter the number of people.");
                return;
            }
            setNumPeople(inputValue);
            try {
                setLoading(true); // Start loading
                const scaledIngredients = ingredients.map(
                    (ingredient) => `${ingredient} for ${inputValue} people`
                ); // Example: scale ingredients based on input value

                const list = await fetchShoppingList(scaledIngredients, inputValue); // Call fetchShoppingList
                setShoppingList(list); // Update shopping list state
            } catch (error) {
                console.error("Error fetching shopping list:", error);
                setShoppingList("An error occurred while generating the shopping list.");
            } finally {
                setLoading(false); // End loading
            }
        }
    };

    return (
        <div className='checkout'>
            <h1>Checkout</h1>
            <input
                type="text"
                id="amount-per-person"
                name="entry-box"
                onKeyPress={handleKeyPress} // Attach keypress event
                placeholder="Enter number of people and press Enter"
            />
            <h2>Your Shopping List for {numPeople} People</h2>
            {loading ? (
                <p>Loading your custom shopping list...</p>
            ) : (
                <div className="shopping-list">
                    <pre>{shoppingList}</pre>
                </div>
            )}
        </div>
    );
};

export default CheckoutHome;
