import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShoppingList = async () => {
            try {
                setLoading(true);

                // Prepare the ChatGPT API call
                const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
                const prompt = `Create a shopping list based on the following ingredients. Ensure quantities are sufficient for two people, and structure the list clearly by category (e.g., Produce, Dairy, Pantry). Ingredients:\n${ingredients.join(", ")}. Only return the list.`;

                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: 'gpt-3.5-turbo',
                        messages: [
                            { role: 'system', content: 'You are an assistant that provides structured shopping lists based on provided ingredients.' },
                            { role: 'user', content: prompt }
                        ],
                        max_tokens: 300,
                        temperature: 0.7,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${apiKey}`,
                        },
                    }
                );

                // Parse response
                const shoppingListText = response.data.choices[0].message.content;
                setShoppingList(shoppingListText);
            } catch (error) {
                console.error('Error generating shopping list:', error);
            } finally {
                setLoading(false);
            }
        };

        if (ingredients.length > 0) {
            fetchShoppingList();
        }
    }, [ingredients]);

    return (
        <div className='checkout'>
            <h1>Checkout</h1>
            <h2>Your Shopping List for Two People</h2>
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
