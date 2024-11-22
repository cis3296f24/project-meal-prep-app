import axios from 'axios';

/**
 * Sends a request to the ChatGPT API to get a recipe based on the selected meal option.
 * Then, it retrieves an image from Spoonacular for the recipe, retrying with simplified names if necessary.
 * If both attempts fail, it falls back to DALL·E for image generation.
 * 
 * @function fetchChatGPTResponse
 * @param {string} mealOption - The meal option selected by the user (e.g., Gluten-Free, Vegetarian, Vegan, etc.)
 * @param {string} mealCuisine - The Cuisine option selected by the user (e.g. Italian, Mexican, Chinese, etc.)
 * @param {string} mealProtein - The Protein option selected by the user (e.g. Chicken, Fish, Beef, etc.)
 * @returns {Object} - The AI-generated recipe data including name, description, and image URL
 * @throws {Error} - If the API request fails
 */
export const fetchChatGPTResponse = async (mealProtein, mealOption, mealCuisine) => {
    const openAIKey = process.env.REACT_APP_OPENAI_API_KEY; // OpenAI API key
    const spoonacularKey = process.env.REACT_APP_SPOONACULAR_API_KEY; // Spoonacular API key

    try {
        const chatGPTResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an expert on recipes and cooking.' },
                    { role: 'user', content: `Please provide a recipe from ${mealCuisine} cuisine with ${mealOption} restriction using ${mealProtein} as protein with the following structure: "Recipe Name: [Name] | Description: [Description] | Ingredients: [Ingredients List]"` }
                ],
                max_tokens: 300,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openAIKey}`,
                },
            }
        );

        const aiResponse = chatGPTResponse.data.choices[0]?.message?.content;
        if (!aiResponse) {
            throw new Error('No response received from ChatGPT');
        }

        const parts = aiResponse.split('|').map(part => part.trim());
        if (parts.length < 3) throw new Error('Unexpected response format from ChatGPT');

        const [namePart, descriptionPart, ingredientsPart] = parts;
        const name = namePart.replace("Recipe Name:", "").trim();
        const description = descriptionPart.replace("Description:", "").trim();
        const ingredients = ingredientsPart.replace("Ingredients:", "").trim();

        const imageUrl = await fetchImageWithFallback(name, spoonacularKey, openAIKey);

        // Log the recipe name and image URL
        console.log(`Recipe Name: ${name}, Image URL: ${imageUrl}`);

        return { name, description, ingredients, image: imageUrl };

    } catch (error) {
        throw new Error('Failed to fetch response from ChatGPT or retrieve image.');
    }
};

/**
 * Attempts to retrieve an image for the recipe from Spoonacular, simplifying the name if necessary.
 * If both attempts fail, it falls back to using DALL·E to generate an image.
 * 
 * @function fetchImageWithFallback
 * @param {string} recipeName - The original name of the recipe.
 * @param {string} spoonacularKey - Spoonacular API key.
 * @param {string} openAIKey - OpenAI API key.
 * @returns {string} - The URL of the recipe image
 */
const fetchImageWithFallback = async (recipeName, spoonacularKey, openAIKey) => {
    let simplifiedRecipeName = recipeName;

    try {
        return await fetchSpoonacularImage(simplifiedRecipeName, spoonacularKey);
    } catch (error) {}

    try {
        simplifiedRecipeName = await simplifyRecipeName(simplifiedRecipeName, openAIKey);
        return await fetchSpoonacularImage(simplifiedRecipeName, spoonacularKey);
    } catch (error) {}

    return await fetchDalleImage(recipeName, openAIKey);
};

/**
 * Fetches an image URL for the recipe using Spoonacular API.
 * 
 * @function fetchSpoonacularImage
 * @param {string} recipeName - The name of the recipe to retrieve an image for.
 * @param {string} apiKey - Spoonacular API key.
 * @returns {string} - The URL of the recipe image
 * @throws {Error} - If the API request fails
 */
const fetchSpoonacularImage = async (recipeName, apiKey) => {
    try {
        const response = await axios.get(
            'https://api.spoonacular.com/recipes/complexSearch',
            {
                params: {
                    query: recipeName,
                    number: 1,
                    apiKey,
                },
            }
        );

        if (response.data.results.length === 0) {
            throw new Error('No image found for this recipe.');
        }

        return response.data.results[0].image;
    } catch (error) {
        throw new Error('Failed to fetch image from Spoonacular.');
    }
};

/**
 * Uses ChatGPT to simplify a recipe name for better compatibility with Spoonacular API.
 * 
 * @function simplifyRecipeName
 * @param {string} originalName - The original recipe name to simplify.
 * @param {string} openAIKey - OpenAI API key.
 * @returns {string} - The simplified recipe name
 */
const simplifyRecipeName = async (originalName, openAIKey) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an assistant that simplifies recipe names for search purposes.' },
                    {
                        role: 'user',
                        content: `Please simplify the recipe name "${originalName}" by removing any adjectives, descriptors, or regional terms.
                        Focus only on the main ingredient and the basic type of dish, such as "Stir-Fry" or "Soup."
                        Make sure that the new name is different from the original name.
                        Provide only the simplified name in response.`,
                    }
                ],
                max_tokens: 20,
                temperature: 0.5,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openAIKey}`,
                },
            }
        );

        const simplifiedName = response.data.choices[0]?.message?.content.trim();
        return simplifiedName || originalName;
    } catch (error) {
        return originalName;
    }
};

/**
 * Fallback to generate an image for the recipe using DALL·E API.
 * 
 * @function fetchDalleImage
 * @param {string} recipeName - The name of the recipe to generate an image for.
 * @param {string} apiKey - OpenAI API key.
 * @returns {string} - The URL of the generated image
 * @throws {Error} - If the API request fails
 */
const fetchDalleImage = async (recipeName, apiKey) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                prompt: `A delicious and appetizing image of ${recipeName}`,
                n: 1,
                size: '512x512',
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.data[0].url;
    } catch (error) {
        throw new Error('Image generation failed with DALL·E.');
    }
};

export default fetchChatGPTResponse;