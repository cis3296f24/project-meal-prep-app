import axios from 'axios';

/**
 * Sends a request to the ChatGPT API to get a recipe based on the selected meal option.
 * Then, it sends the recipe name to the DALL·E API to generate a custom image for the recipe.
 * 
 * @function fetchChatGPTResponse
 * @param {string} mealOption - The meal option selected by the user (e.g., Chicken, Fish, Vegan, etc.)
 * @returns {Object} - The AI-generated recipe data including name, description, and image URL
 * @throws {Error} - If the API request fails
 */
export const fetchChatGPTResponse = async (mealOption) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Use environment variable for API key

    try {
        // Step 1: Fetch recipe details from ChatGPT API
        const chatGPTResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an expert on recipes and cooking.' },
                    { role: 'user', content: `Please provide a recipe for ${mealOption} with the following structure: "Recipe Name: [Name] | Description: [Description] | Ingredients: [Ingredients List]"` }
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

        const aiResponse = chatGPTResponse.data.choices[0]?.message?.content;

        if (!aiResponse) {
            throw new Error('No response received from ChatGPT');
        }

        // Parse the response with validation
        const parts = aiResponse.split('|').map(part => part.trim());
        if (parts.length < 3) throw new Error('Unexpected response format from ChatGPT');

        const [namePart, descriptionPart, ingredientsPart] = parts;
        const name = namePart.replace("Recipe Name:", "").trim();
        const description = descriptionPart.replace("Description:", "").trim();
        const ingredients = ingredientsPart.replace("Ingredients:", "").trim();

        // Step 2: Generate image using DALL·E API
        const dalleImageUrl = await fetchDalleImage(name);

        return { name, description, ingredients, image: dalleImageUrl };

    } catch (error) {
        console.error('Error fetching response from ChatGPT:', error.message);
        throw new Error('Failed to fetch response from ChatGPT or generate image.');
    }
};

/**
 * Sends a request to the DALL·E API to generate an image for the recipe.
 * 
 * @function fetchDalleImage
 * @param {string} recipeName - The name of the recipe to generate an image for.
 * @returns {string} - The URL of the generated image
 * @throws {Error} - If the API request fails
 */
const fetchDalleImage = async (recipeName) => {
    try {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

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
        console.error('Error fetching image from DALL·E:', error.message);
        throw new Error('Image generation failed.');
    }
};

export default fetchChatGPTResponse;
