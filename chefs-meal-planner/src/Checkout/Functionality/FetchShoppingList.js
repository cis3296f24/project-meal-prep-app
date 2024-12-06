import axios from 'axios';

export const fetchShoppingList = async (ingredients, numPeople) => {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
            console.log("Ingrediant: ", ingredients)
            console.log("num: ", numPeople)
    const prompt = `
    Create a shopping list based on the following ingredients and scale the quantities appropriately for ${numPeople} people. 
    If the ingredients do not specify quantities, assume the default amount is sufficient for one person and scale accordingly. 
    Structure the list clearly by category (e.g., Produce, Dairy, Pantry).
    Ingredients: ${ingredients.join(", ")}. 
    Only return the scaled list.
            `;
            
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are an assistant that provides structured shopping lists based on provided ingredients.' },
                    { role: 'user', content: prompt }
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
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating shopping list:', error);
        throw error;
    }
};