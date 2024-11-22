/**
 * Fetches park information from the National Parks API based on the park code and page number.
 * If the information is available in the local storage, it returns the cached data.
 * Otherwise, it makes a network request to fetch the data, caches it in the local storage, and returns the response.
 * @async
 * @function ParkInfo

 * @global 
 * @param {string} parkCode - The code of the park to fetch information for.
 * @param {number} page - The page number of the results to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the park information as an object.
 * @throws {Error} - If the network response is not successful or an error occurs during the process.
 */
// ParkInfo.js, fetch the list of parks and return info

export const ParkInfo = async (parkCode, page) => {
  try {
    await parkCode;
    await page;
    const cachedData = localStorage.getItem(parkCode);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    var url = 'https://developer.nps.gov/api/v1/parks?api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb&parkCode=' + parkCode + '&start=' + page;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await response.json();
    // Cache the response to localStorage
    localStorage.setItem(parkCode, JSON.stringify(json));

    return json;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
