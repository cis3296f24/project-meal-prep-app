
/* ------------------------- sortOrder --------------------------------------
 * 
 * Given a data value and a data type, return a value that will sort correctly based on type.
 * For example, 
 *   if provided "123" and "number", it will return 123 (numeric sort),
 *   if provided "sally" and "text", it will return "SALLY" (case insensitive alpha sort),
 *   if provided a "1/1/1975" and "date", it will return 1975*365 (plus leap year), which 
 *      is the number of days since AD 0 (sorting by date, not date/time).
 */
function sortOrder (data, sortType) {

    sortType = sortType.toUpperCase();

    if (!data || data === "") {
        return -9999999999; // put empty entries at the top of the sort.
    }

    if (sortType === "TEXT") {
        return data.toUpperCase();

    } else if (sortType === "NUMBER") {
        strNum = data + ""; // convert data to string.

        // Remove any formatting characters that may have been there 
        // (if data was already in string format). 
        strNum = strNum.replace(" ", "");
        strNum = strNum.replace(",", "");
        strNum = strNum.replace("$", "");

        if (isNaN(strNum)) { // non numeric data
            console.log("trying to sort non-number as number: " + data);
            return -9999999999; // put invalid numeric entries at the top of the sort
        } else { // numeric data
            return Number(strNum);
        }

    } else if (sortType === "DATE") {

        // Create a multiplyer that converts days to milliseconds
        //   24 hours in a day, 60 minutes in an hour, 60 secondes in a minute,
        //   1000 milliseconds in a second. 
        const daysToMilliSecs = 24 * 60 * 60 * 1000;

        // Specify the number of days each year (365) from Jan 1, 0000 to Jan 1, 1970,
        // plus an extra day every 4 years to account for leap year. 
        const daysTo1970 = 1970 * 365 + Math.floor(1970 / 4);

        var milliSecsFrom1970 = Date.parse(data);
        if (isNaN(data) && !isNaN(milliSecsFrom1970)) {
            //console.log(data + " is a Date ");
            var daysFrom1970 = milliSecsFrom1970 / (daysToMilliSecs);
            return (daysFrom1970 + daysTo1970);
        } else {
            console.log("trying to sort non-date as date: " + data);
            return -9999999999; // put invalid entries at top if sorting by this column
        }
    }
};