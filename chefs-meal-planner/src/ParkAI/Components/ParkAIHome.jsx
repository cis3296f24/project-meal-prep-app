import React, { useState, useEffect } from 'react';
import '../../Style/parkAI.css';
import { fetchChatGPTResponse } from '../Functionality/FetchChatGPT';
import defaultImage from '../Assets/default_img.jpg';

/**
 * Component for welcoming and explaining the park search
 * functionality to a user.
 * 
 * @component
 * @module ParkAIHome
 * @memberof ParkAI
 * @returns {JSX.Element} Park search welcome header
 */
const ParkAIHome = () => {
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [recipeImage, setRecipeImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            setIsLoading(true);
            try {
                const response = await fetchChatGPTResponse("Give me a recipe with a name, description, and ingredients.");
                setRecipeName(response.name);
                setDescription(response.description);
                setIngredients(response.ingredients);
                setRecipeImage(response.image);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipe();
    }, []);

    const handleSave = async () => {
        try {
            // Check if the image URL ends with .jpg; if not, use a default image
            const imageUrl = recipeImage.endsWith('.jpg') ? recipeImage : defaultImage;
            console.log("Image URL: ", imageUrl)
    
            const response = await fetch('http://localhost:5000/addRecipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: recipeName,
                    description,
                    ingredients,
                    image: imageUrl,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Recipe saved successfully!");
            } else {
                throw new Error(data.error || 'Failed to save recipe.');
            }
        } catch (error) {
            console.error('Error saving recipe:', error);
            alert("Failed to save recipe.");
        }
    };
    

    return (
        <div className='park-ai'>
            <center>
                <h1 id="ai-title">Recipe Recommendation</h1>
                {isLoading ? (
                    <p>Loading recipe...</p>
                ) : (
                    <div className="recipe-container">
                        {recipeImage && <img src={recipeImage} alt={recipeName} className="recipe-image" />}
                        {recipeName && <h2>{recipeName}</h2>}
                        {description && <p>{description}</p>}
                        {ingredients && (
                            <div>
                                <h3>Ingredients:</h3>
                                <p>{ingredients}</p>
                            </div>
                        )}
                        <button onClick={handleSave} className="save-button">Save</button>
                    </div>
                )}
            </center>
        </div>
    );
};

export default ParkAIHome;
