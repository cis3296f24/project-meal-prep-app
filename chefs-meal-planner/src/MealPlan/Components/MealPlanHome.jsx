import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/mealPlan.css';
import { fetchDBResponse, addRecipeToDB } from '../Functionality/FetchDB';


/**
 * Component for managing meal plans, including viewing, selecting,
 * adding recipes, and proceeding to checkout.
 * 
 * @component
 * @module MealPlanHome
 * @memberof MealPlan
 * @returns {JSX.Element} Meal plan management UI
 */
const MealPlanHome = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRecipes, setSelectedRecipes] = useState({});
    const [newRecipe, setNewRecipe] = useState({ name: '', description: '', ingredients: '', image: '' });
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    // Fetching meals from the server
    const fetchMeals = async () => {
        setIsLoading(true);
        try {
            const response = await fetchDBResponse();
            const sortedRecipes = response.sort((a, b) => b.id - a.id); // Sort by ID (descending)
            setRecipes(sortedRecipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals(); // Fetch meals when the component mounts
    }, []);

    // Handling form input changes for new recipe
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
    };

    // Adding new recipe to the database
    const handleAddRecipe = async () => {
        try {
            await addRecipeToDB(newRecipe);
            setNewRecipe({ name: '', description: '', ingredients: '', image: '' });
            setShowForm(false);
            fetchMeals();
        } catch (error) {
            console.error(error.message);
            alert('Failed to add recipe. Please check the details and try again.');
        }
    };

    // Handling recipe selection for checkout
    const handleCheckboxChange = (index) => {
        setSelectedRecipes((prevSelectedRecipes) => ({
            ...prevSelectedRecipes,
            [index]: !prevSelectedRecipes[index],
        }));
    };

    // Proceeding to checkout with selected recipes
    const handleCheckout = () => {
        const selected = recipes.filter((_, index) => selectedRecipes[index]);
        const selectedIngredients = selected.map((recipe) => recipe.ingredients.split(', '));
        if (selectedIngredients.length > 0) {
            navigate('/Checkout', { state: { ingredients: selectedIngredients } });
        } else {
            alert('Please select at least one recipe to proceed to checkout.');
        }
    };

    return (
        <div className="meal-plan">
            <center>
                <div className="button-container-meal">
                    <h1 id="ai-title">Choose Your Meals</h1>
                    <button onClick={handleCheckout} className="checkout-button" disabled={isLoading}>
                        Checkout
                    </button>
                    <button onClick={() => setShowForm((prev) => !prev)} className="add-recipe-button">
                        +
                    </button>
                </div>
                {/* Add Recipe Form */}
                {showForm && (
                    <div className="add-recipe-form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Recipe Name"
                            value={newRecipe.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newRecipe.description}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="ingredients"
                            placeholder="Ingredients"
                            value={newRecipe.ingredients}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="Image URL"
                            value={newRecipe.image}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleAddRecipe}>Add Recipe</button>
                    </div>
                )}

                {/* Loading or displaying the recipes */}
                {isLoading ? (
                    <p>Loading recipes...</p>
                ) : (
                    <div className="table-container">
                        <table className="recipe-table">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Ingredients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipes.map((recipe, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={!!selectedRecipes[index]}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </td>
                                        <td>
                                            {recipe.image ? (
                                                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                                            ) : (
                                                'No Image'
                                            )}
                                        </td>
                                        <td className="recipe-name">{recipe.name}</td>
                                        <td>{recipe.description}</td>
                                        <td>
                                            {/* Ingredients display */}
                                            <ul className="ingredients-list">
                                                {recipe.ingredients.split(',').map((ingredient, idx) => {
                                                    const [item, details] = ingredient.split('-').map(part => part.trim());
                                                    return (
                                                        <li key={idx} className="ingredient-item">
                                                            {item && <strong>{item}</strong>}
                                                            {details && (
                                                                <div style={{ marginLeft: '16px' }}>
                                                                    {details}
                                                                </div>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                )}
            </center>
        </div>
    );
};

export default MealPlanHome;