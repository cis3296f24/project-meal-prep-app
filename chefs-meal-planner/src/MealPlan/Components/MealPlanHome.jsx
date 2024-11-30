import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/mealPlan.css';
import { fetchDBResponse, addRecipeToDB } from '../Functionality/FetchDB';
import defaultImage from '../Assets/default_img.jpg';


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
            const sortedRecipes = response.sort((a, b) => b.id - a.id);
            setRecipes(sortedRecipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchMeals();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
    };

    // Function to confirm and delete a recipe
    const handleDeleteRecipe = async (id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (!userConfirmed) {
            return; // Exit if user cancels the deletion
        }

        try {
            console.log("ID to delete: ", id);
            const response = await fetch(`http://localhost:5000/deleteRecipe/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the recipe from the local state
                setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
            } else {
                const errorData = await response.json();
                alert(`Failed to delete recipe: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error deleting recipe:', error);
            alert('An error occurred while deleting the recipe.');
        }
    };



    const handleAddRecipe = async () => {
        try {
            // Use the default image for new recipes
            const recipeWithDefaultImage = { ...newRecipe, image: defaultImage };
    
            await addRecipeToDB(recipeWithDefaultImage);
    
            setNewRecipe({ name: '', description: '', ingredients: '', image: '' });
            setShowForm(false);
            fetchMeals();
        } catch (error) {
            console.error(error.message);
            alert('Failed to add recipe. Please check the details and try again.');
        }
    };
    

    const handleCheckboxChange = (id) => {
        setSelectedRecipes((prevSelectedRecipes) => ({
            ...prevSelectedRecipes,
            [id]: !prevSelectedRecipes[id], // Toggle the selection state for the specific recipe id
        }));
    };
    

    const handleCheckout = () => {
        const selected = recipes.filter((recipe) => selectedRecipes[recipe.id]); // Use recipe.id to check selection
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
                    <p>Customized Shopping List</p>
                    <button onClick={handleCheckout} className="checkout-button" disabled={isLoading}>
                        Checkout
                    </button>
                    <p>Add Your Own Recipe</p>
                    <button onClick={() => setShowForm((prev) => !prev)} className="add-recipe-button">
                        +
                    </button>
                </div>
                {showForm && (
                    <div className="add-recipe-form">
                        <input type="text" name="name" placeholder="Recipe Name" value={newRecipe.name} onChange={handleInputChange} />
                        <input type="text" name="description" placeholder="Description" value={newRecipe.description} onChange={handleInputChange} />
                        <input type="text" name="ingredients" placeholder="Ingredients" value={newRecipe.ingredients} onChange={handleInputChange} />
                        <input type="text" name="image" placeholder="Image URL" value={newRecipe.image} onChange={handleInputChange} />
                        <button onClick={handleAddRecipe}>Add Recipe</button>
                    </div>
                )}
                {isLoading ? (
                    <p>Loading recipes...</p>
                ) : (
                    <div className="recipe-grid">
                        {recipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-card">
                                <div className="recipe-image-container">
                                    <input
                                        type="checkbox"
                                        className="recipe-checkbox"
                                        checked={!!selectedRecipes[recipe.id]} // Check the selected state using recipe.id
                                        onChange={() => handleCheckboxChange(recipe.id)} // Pass recipe.id to handleCheckboxChange
                                    />

                                    <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                                </div>
                                <div className="recipe-details">
                                    <h3>{recipe.name}</h3>
                                    <p>{recipe.description}</p>
                                    <div className="recipe-ingredients">
                                        <ul>
                                            {recipe.ingredients.split(',').map((ingredient, idx) => (
                                                <li key={idx}>{ingredient.trim()}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="recipe-actions">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteRecipe(recipe.id)}
                                    >
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                )}
            </center>
        </div>
    );
};

export default MealPlanHome;
