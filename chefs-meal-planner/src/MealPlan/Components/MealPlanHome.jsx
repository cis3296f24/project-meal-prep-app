import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/mealPlan.css';
import { fetchDBResponse } from '../Functionality/FetchDB';
import axios from 'axios';
/**
 * Component for welcoming and explaining the park search
 * functionality to a user.
 * 
 * @component
 * @module MeakPlanHome
 * @memberof MealPlan
 * @returns {JSX.Element} Park search welcome header
 */
const MealPlanHome = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedRecipes, setSelectedRecipes] = useState({});
    const [newRecipe, setNewRecipe] = useState({ name: '', description: '', ingredients: '', image: '' });
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const fetchMeals = async () => {
        setIsLoading(true);
        try {
            const response = await fetchDBResponse();
            const sortedRecipes = response.sort((a, b) => b.id - a.id); // Sort recipes by ID (descending)
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
    };

    const handleAddRecipe = async () => {
        console.log('Adding recipe:', newRecipe); // Log the recipe details
        try {
            // Send the recipe to the backend
            await axios.post('http://localhost:5000/recipes', newRecipe);

            // Reset the form and hide it
            setNewRecipe({ name: '', description: '', ingredients: '', image: '' });
            setShowForm(false);

            // Fetch the updated list of recipes
            fetchMeals(); // Call fetchMeals here after successfully adding a recipe
        } catch (error) {
            console.error('Error adding recipe:', error.response?.data || error.message);
            alert('Failed to add recipe. Check the console for details.');
        }
    };

    const handleCheckboxChange = (index) => {
        setSelectedRecipes((prevSelectedRecipes) => ({
            ...prevSelectedRecipes,
            [index]: !prevSelectedRecipes[index],
        }));
    };

    const handleCheckout = () => {
        const selected = recipes.filter((_, index) => selectedRecipes[index]);
        const selectedIngredients = selected.map((recipe) => recipe.ingredients);
        if (selectedIngredients.length > 0) {
            navigate('/Checkout', { state: { ingredients: selectedIngredients } });
        } else {
            alert('Please select at least one recipe to proceed to checkout.');
        }
    };

    return (
        <div className="meal-plan">
            <center>
                <h1 id="ai-title">Choose Your Meals</h1>
                <button onClick={handleCheckout} className="checkout-button" disabled={isLoading}>
                    Checkout
                </button>
                <button onClick={() => setShowForm((prev) => !prev)} className="add-recipe-button">
                    +
                </button>

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

                {isLoading ? (
                    <p>Loading recipes...</p>
                ) : (
                    <div className="table-container">
                        <table className="recipe-table">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Ingredients</th>
                                    <th>Image</th>
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
                                        <td>{recipe.name}</td>
                                        <td>{recipe.description}</td>
                                        <td>{recipe.ingredients}</td>
                                        <td>
                                            {recipe.image ? (
                                                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                                            ) : (
                                                'No Image'
                                            )}
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