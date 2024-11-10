/**
 * Makes a call to the NPS API /activities/parks endpoint in order
 * to fetch all parks associated to the passed in activities and states
 * Conducts logic to return parks that only satisfy all the activities
 * and/or states requirements
 * 
 * @function FetchParks

 * @global
 * @param {Array} activityArray - Array of selected user activities
 * @param {Array} selectedStates - Array of selected user states
 * @returns {Array} List of parks that satisfy user activity and state requirements
 * @throws {Error} In case of error in API fetching or in other logic
 */
export const FetchParks = async (activityArray, selectedStates) => {
    let json = [];
    let activityReturnJson = [];
    let stateReturnJson = [];
    let returnJson = [];
    try {
        //Get parks list for API
        const numActivities = activityArray.length;
        const values = activityArray.map(activity => activity.value);
        const valuesString = values.join(', ');
        const encodedValuesString = encodeURIComponent(valuesString);
        const hasActivities = numActivities > 0;
        const hasStates = selectedStates.length > 0;
        // console.log(hasActivities);
        // console.log(hasStates);

        // console.log("Values: " + encodedValuesString);

        // if search has activities
        if(hasActivities){
            console.log("has activities");
            // find parks with all activities
            const url =  `https://developer.nps.gov/api/v1/activities/parks?api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb&id=&q=${encodedValuesString}`
            // console.log("url :" + url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            json = await response.json();
            //console.log("json below");
            console.log(json);
    
            //Get list of all common parks from activities API call
            const parkMap = new Map();
            const allActivitiesParks = [];
            json.data.forEach(activity => {
                //console.log(activity.parks)
                activity.parks.forEach(parkName => {
                    if(parkMap.has(parkName.parkCode)) {
                        parkMap.set(parkName.parkCode,parkMap.get(parkName.parkCode) + 1);
                    } else {
                        parkMap.set(parkName.parkCode,1);
                    }
                    //console.log(parkName.fullName);
                    //console.log(parkName.parkCode);
                });
            });
    
            parkMap.forEach((value,key) => {
               if(value === numActivities) {
                    allActivitiesParks.push(key);
               }
            });
    
            const parksString = allActivitiesParks.join(',');
            //const encodedParksString = encodeURIComponent(parksString);
    
            //console.log("Park Values: " + encodedParksString);
            
            const parkUrl =  `https://developer.nps.gov/api/v1/parks?api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb&parkCode=${parksString}`
            // console.log("Park url :" + parkUrl);
            const parkResponse = await fetch(parkUrl);
            if (!parkResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const parkJson = await parkResponse.json();
            // console.log("parkJson below");
            // console.log(parkJson);
            activityReturnJson = parkJson;
            // console.log("activityReturnJson below");
            // console.log(activityReturnJson);
   
            returnJson = activityReturnJson;

        }
        // if search has states
        if(hasStates){
            console.log("has states");
            // find parks with all activities
            const statesString =  selectedStates.map(state => state.value).join(',');
            console.log("statesString: " + statesString);
            const url =  `https://developer.nps.gov/api/v1/parks?api_key=0ilOFP8jTC2LMrwXFTullFqvHyVhBh9aHVW3OWEb&stateCode=${statesString}`
            // console.log("url :" + url);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            // console.log("json below");
            // console.log(json);
            stateReturnJson = json;
            // console.log("stateReturnJson below");
            // console.log(stateReturnJson);

            returnJson = stateReturnJson;
        }
        // if search has both activities and states
        if(hasActivities && hasStates){
            returnJson = [];
            console.log("has both");
            console.log(json);
            console.log(stateReturnJson);
            // add parks to returnJson if parks have activities in json and states in stateReturnJson
            // check if parks in stateReturnJson have all the activity ids in json
            stateReturnJson.data.forEach(park => {
                let hasAllActivities = true;
                json.data.forEach(activity => {
                    if(!park.activities.some(parkActivity => parkActivity.id === activity.id)){
                        hasAllActivities = false;
                    }
                });
                if(hasAllActivities){
                    returnJson.push(park);
                }
            });
            // filter out duplicates
            // returnJson = returnJson.filter((park, index, self) =>
            //     index === self.findIndex((t) => (
            //         t.parkCode === park.parkCode
            //     ))
            // )
            // filter out parks that don't have all activities

            // console.log(returnJson);

            

        }

        console.log("returnJson below");
        console.log(returnJson);
        return returnJson;
        
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export default FetchParks;