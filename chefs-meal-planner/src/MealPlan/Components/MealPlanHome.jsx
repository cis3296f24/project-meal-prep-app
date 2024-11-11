import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/mealPlan.css';
import { fetchDBResponse } from '../Functionality/FetchDB';
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            try {
                const response = await fetchDBResponse();
                // Sort recipes by ID in descending order
                const sortedRecipes = response.sort((a, b) => b.id - a.id);
                setRecipes(sortedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchMeals();
    }, []);
    

    const handleCheckboxChange = (index) => {
        setSelectedRecipes((prevSelectedRecipes) => ({
            ...prevSelectedRecipes,
            [index]: !prevSelectedRecipes[index],
        }));
    };

    const handleCheckout = () => {
        const selected = recipes.filter((_, index) => selectedRecipes[index]);
        const selectedIngredients = selected.map(recipe => recipe.ingredients);
        
        if (selectedIngredients.length > 0) {
            navigate('/Checkout', { state: { ingredients: selectedIngredients } });
        } else {
            alert("Please select at least one recipe to proceed to checkout.");
        }
    };

    return (
        <div className='meal-plan'>
            <center>
                <h1 id="ai-title">Choose Your Meals</h1>
                <button onClick={handleCheckout} className="checkout-button">Checkout</button>
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
