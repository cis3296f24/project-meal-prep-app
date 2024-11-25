import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchShoppingList } from '../../MealAI/Functionality/FetchShoppingList';
import '../../Style/mealPlan.css'; // Ensure this includes the updated checkout styles

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getShoppingList = async () => {
            try {
                setLoading(true);
                const list = await fetchShoppingList(ingredients);
                setShoppingList(list);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (ingredients.length > 0) {
            getShoppingList();
        }
    }, [ingredients]);

    return (
        <div className="checkout">
            {/* Title with added styling */}
            <h1 id="checkout-title">Checkout</h1>
            <h2 id="checkout-title">Your Shopping List for Two People</h2>
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
