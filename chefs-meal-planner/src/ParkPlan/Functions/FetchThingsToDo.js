/**
 * Fetches places related to a specific park dictated by parkCode
 * @global
 * @async
 * @function FetchPlaces

 * 
 * @param {Object} parkCode - The park code object containing the park code
 * @param {Array} activities - A list of activities selected by the user
 * @returns {Promise<Object>} A promise that resolves to the places data for the given park.
 * @throws {Error} In case of error in API fetching or in other logic
 */
export const FetchThingsToDo = async (parkCode, activities) => {
    try {

        //Used to save the ids of the things to do returned and all of the things to do returned
        const allThingsToDo = [];
        const responseIds = new Set();
        var json;

        if(activities.length > 0) {
            for (const activity of activities) {
                const url =  `https://developer.nps.gov/api/v1/thingstodo?parkCode=${parkCode.value}&limit=3&q=${activity.label}&sort=-relevanceScore&api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb`;
                console.log("url :" + url);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                json = await response.json();
                json.data.forEach(thing => {
                    console.log("thing",thing);
                    if(!responseIds.has(thing.id)) {
                        responseIds.add(thing.id);
                        allThingsToDo.push(thing);
                    }
                });
            }
            //Sort based on relevance score
            allThingsToDo.sort((a, b) => b.relevanceScore - a.relevanceScore);
        } else {
            const url =  `https://developer.nps.gov/api/v1/thingstodo?parkCode=${parkCode.value}&limit=50&api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb`;
            console.log("url :" + url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            json = await response.json();
            json.data.forEach(thing => {
                console.log("thing",thing);
                allThingsToDo.push(thing);
            });
        }
        
        console.log("list", allThingsToDo);        
      return allThingsToDo;
    } catch (error) {
      console.error(error.message);
    }
  };

  export default FetchThingsToDo;