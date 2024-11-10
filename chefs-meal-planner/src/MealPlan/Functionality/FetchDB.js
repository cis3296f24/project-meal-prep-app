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

export default fetchDBResponse;
