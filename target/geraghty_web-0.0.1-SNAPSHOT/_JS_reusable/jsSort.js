// This function sorts the array of objects in "list" by object property "byProperty", 
// assuming that the sort property is of the given type (e.g., text, number, or date).
// There is no return parameter - objList is sorted in place (I/O) parameter.

function jsSort(objList, byProperty, sortType) {

    if (!objList || !objList[0]) {
        var message = "Cannot sort. Need an ObjList that has at least one element";
        console.log(message);
        alert(message);
        return;  // early return -- dont try to sort.
    }

    console.log('to jsSort byProperty ' + byProperty + ' sort type ' + sortType);

    var obj = objList[0];

    // q and z are just elements in the array and the funcction has to return negative or positive or zero 
    // depending on the comparison of q and z.
    // using JS associative array notation (property name char string used inside square brackets 
    // as it if was an index value). 

    objList.sort(function (q, z) {  // in line (and anonymous) def'n of fn to compare list elements. 
        // the function you create is supposed to return positive (if first bigger), 0 if equal, negative otherwise.

        // using JS associative array notation, extract the 'byProperty' property from the two
        // list elements so you can compare them.
        var qVal = sortOrder(q[byProperty], sortType);
        var zVal = sortOrder(z[byProperty], sortType);

        var c = 0;
        if (qVal > zVal) {
            c = 1;
        } else if (qVal < zVal) {
            c = -1;
        }
        console.log("comparing " + qVal + " to " + zVal + " is " + c);
        
        return c;
    });

} // jsSort