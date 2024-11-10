/**
 * Retrieves a list of videos for a specific park.
 * @async
 * @function parkVideos

 * @global 
 * @param {string} parkCode - The code of the park.
 * @returns {Promise<void>} - A promise that resolves with the list of videos.
 * @throws {Error} - If unable to fetch videos.
 */
// parkVideos function that takes in parkCode and returns a list of videos
async function parkVideos(parkCode){
    try{
      var url =`https://developer.nps.gov/api/v1/multimedia/videos?parkCode=${parkCode}&api_key=Y7kFnm6SP5SMQhkTvwUSgyjge9buj4DbjrkuV2S0`;
      const response = await fetch(url);
      if(!response.ok){
        throw new Error('Unable to fetch videos');
      }
      const data = await response.json();
      console.log('videos: ', data);
    } catch(error){
      console.log('Error Fetching Videos: ', error.message);
    }
  }
  export default parkVideos;