// given an object list (refList) and an input value (searchKey), 
// return a new object list that only has those objects that have 
// properties that contain searchKey. Any image filenames are excluded
// from the search (e.g., any string that contains .JPG or .PNG). 

function filterObjList (refList, searchKey) {

    // Return true if any property of obj contains searchKey. Otherwise, return false.
    function isToShow(obj, searchKey) {

        // show the object if searchKey is empty
        if (!searchKey || searchKey.length === 0) {
            return true;
        }

        // convert search key to upper case (will convert values also to upper case before comparing).
        var searchKeyUpper = searchKey.toUpperCase();

        for (var prop in obj) {

            var propValUpper = obj[prop].toUpperCase(); // convert to upper case to match searchKey.

            // Do not try to find a match for Table cells that hold images. 
            if (!propValUpper.includes(".JPG") && !propValUpper.includes(".PNG")) {

                //console.log("checking if " + searchKeyUpper + " is in " + propValUpper);

                if (propValUpper.includes(searchKeyUpper)) {
                    // console.log("Yes it is inside");
                    return true;
                }
            } // excluding image tds
        }
        //console.log("no it is not inside");
        return false;
    } // isToShow 

    // Entry Point filterObjList
    if (!searchKey || searchKey === "") {

        // make new array that's the same as the original array, but a copy, 
        // not a pointer to the original array. Otherwise, React does not think
        // that the state variable has been changed and so React will not 
        // re-render the component. 

        console.log("filterObjList: empty searchkey so newList is same as old one");
        return refList.slice();

        // or could have done:
        // return (JSON.parse(JSON.stringify(refList))); 
    }

    // JS functional programming. Every JS array has a built in method 
    // called filter. You pass it a function that takes in an element 
    // of the array and returns true/false to say whether that element 
    // should be included in the output array. 
    var newList = refList.filter(obj => isToShow(obj, searchKey));

    // WHICH MEANS THIS...
    // var newList = [];
    // for (var obj of refList) {
    //     if (isToShow(obj, searchKey)) {
    //         newList.push(obj);
    //     } // if
    // } // for

    console.log("filterObjList: filtered (newList) is on the next line: ");
    console.log(newList);
    return newList;
} // filterObjList