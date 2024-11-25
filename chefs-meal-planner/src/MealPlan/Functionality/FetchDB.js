import axios from 'axios';

/**
 * Fetches all recipes from the database.
 * 
 * @function fetchDBResponse
 * @returns {Array<Object>} - Array of recipes including name, description, ingredients, and image URL
 * @throws {Error} - If the API request fails
 */
export const fetchDBResponse = async () => {
    try {
        // Fetch all recipes from the backend API
        const response = await axios.get('http://localhost:5000/recipes'); // Replace with your API endpoint

        // Check if the response contains data
        if (!response.data) {
            throw new Error('No data received from the database');
        }

        return response.data; // Expecting an array of recipe objects
    } catch (error) {
        console.error('Error fetching recipes from the database:', error.message);
        throw new Error('Failed to fetch recipes from the database.');
    }
};

/**
 * Adds a new recipe to the database.
 * 
 * @function addRecipeToDB
 * @param {Object} recipe - The recipe to be added
 * @param {string} recipe.name - Name of the recipe
 * @param {string} recipe.description - Description of the recipe
 * @param {string} recipe.ingredients - Ingredients of the recipe
 * @param {string} [recipe.image] - URL of the recipe's image
 * @returns {Object} - Response data from the API
 * @throws {Error} - If the API request fails
 */
export const addRecipeToDB = async (recipe) => {
    try {
        // Validate input to ensure required fields are provided
        if (!recipe.name || !recipe.description || !recipe.ingredients) {
            throw new Error('Missing required fields: name, description, or ingredients');
        }

        // Send the recipe data to the backend API
        const response = await axios.post('http://localhost:5000/addRecipe', recipe); // Replace with your API endpoint

        return response.data; // Assuming the API returns the added recipe or a success message
    } catch (error) {
        console.error('Error adding recipe to the database:', error.response?.data || error.message);
        throw new Error('Failed to add recipe to the database.');
    }
};

// Assign the object to a variable first
const FetchDB = {
    fetchDBResponse,
    addRecipeToDB,
};

// Export the variable as default
export default FetchDB;
