// Activities.js
/**
 * Retrieves activities data from the National Parks Service API.
 * If the data is available in the local storage, it returns the cached data.
 * Otherwise, it makes a network request to fetch the data from the API.
 * The retrieved data is stored in the local storage for future use.
 * @summary Retrieves activities data from the National Parks Service API.
 * @async
 * @function Activities

 * @global
 * @returns {Promise<Object>} A promise that resolves to the activities data.
 * @throws {Error} If there is an error in fetching or parsing the data.
 */
export const Activities = async () => {
    try {
      const cacheKey = 'activitiesData';
      let activitiesData = localStorage.getItem(cacheKey);
  
      if (activitiesData) {
        return JSON.parse(activitiesData);
      }
  
      const response = await fetch(
        'https://developer.nps.gov/api/v1/activities?api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json(); 
      localStorage.setItem(cacheKey, JSON.stringify(json));

      return json;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  