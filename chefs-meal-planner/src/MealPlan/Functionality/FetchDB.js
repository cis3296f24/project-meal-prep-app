import axios from 'axios';

/**
 * Base URL for the backend API
 * @constant
 * @type {string}
 */
const API_BASE_URL = 'https://my-secret-recipes-db.onrender.com';

/**
 * Fetches all recipes from the database.
 * 
 * @function fetchDBResponse
 * @returns {Array<Object>} - Array of recipes including name, description, ingredients, and image URL
 * @throws {Error} - If the API request fails
 */
export const fetchDBResponse = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/recipes`);

        if (!response.data) {
            throw new Error('No data received from the database');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching recipes from the database:', error.response?.data || error.message);
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
        if (!recipe.name || !recipe.description || !recipe.ingredients) {
            throw new Error('Missing required fields: name, description, or ingredients');
        }

        const response = await axios.post(`${API_BASE_URL}/addRecipe`, recipe);
        return response.data;
    } catch (error) {
        console.error('Error adding recipe to the database:', error.response?.data || error.message);
        throw new Error('Failed to add recipe to the database.');
    }
};

/**
 * Deletes a recipe from the database by ID.
 * 
 * @function deleteRecipeFromDB
 * @param {number} id - ID of the recipe to be deleted
 * @returns {Object} - Response data from the API
 * @throws {Error} - If the API request fails
 */
export const deleteRecipeFromDB = async (id) => {
    try {
        if (!id) {
            throw new Error('Recipe ID is required');
        }

        const response = await axios.delete(`${API_BASE_URL}/deleteRecipe/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting recipe from the database:', error.response?.data || error.message);
        throw new Error('Failed to delete recipe from the database.');
    }
};

const FetchDB = {
    fetchDBResponse,
    addRecipeToDB,
    deleteRecipeFromDB,
};

export default FetchDB;
