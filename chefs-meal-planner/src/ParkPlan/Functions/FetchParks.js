
/**
 * Fetches parks data from the National Park Service API.
 * If the data is available in the local storage, it returns the cached data.
 * Otherwise, it makes a network request to fetch the data from the API,
 * saves it to the local storage, and returns the fetched data.
 * @async
 * @global
 * @function FetchParks
 *
 * 
 * @returns {Promise<Object>} A promise that resolves to the parks data.
 * @throws {Error} If the network response is not ok or an error occurs during the process.
 */
export const FetchParks = async () => {
  try {
    const limit = 500;
    var url = 'https://developer.nps.gov/api/v1/parks?api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb&limit=' + limit;
    // Check if data is in local storage
    const cachedData = localStorage.getItem('parksData');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    // Save data to local storage
    localStorage.setItem('parksData', JSON.stringify(json));
    return json;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

