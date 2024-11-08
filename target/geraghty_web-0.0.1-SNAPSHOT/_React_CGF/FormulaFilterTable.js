"use strict";

const FormulaFilterTable = () => {

    // Common React pattern. Display a "...Loading..." UI while the page
    // is loading. Don't try to render the component until this is false.  
    const [isLoading, setIsLoading] = React.useState(true);

    // this is the data initially read (just once) from the DB.
    const [dbList, setDbList] = React.useState([]);

    // if there is an ajax error (or db connection error, set this state variable)
    const [error, setError] = React.useState(null);

    // the user's input that filters the list. 
    const [filterInput, setFilterInput] = React.useState("");

    // this is the filtered list.
    const [filteredList, setFilteredList] = React.useState([]);

    console.log("UserFilterTable running!!");

    // useEffect takes two params. The first param is the function to be run. 
    // The second param is a list of state variables that (if they change) will 
    // cause the function (first param) to be run again.
    // RUN ONCE PATTERN: With [] as 2nd param, it runs the 1st param (fn) just once. 
    React.useEffect(() => {

        // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
        ajax_alt(
         
            "formulaFile/getAll", // URL for AJAX call to invoke

            // success function (anonymous)
            function (dbList) {   // success function gets obj from ajax_alt
                if (dbList.dbError.length > 0) {
                    console.log("Database error was " + dbList.dbError);
                    setError(dbList.dbError);
                } else {
                    console.log("Data was read from the DB. See next line,");
                    console.log(dbList.formulaFileList);
                    setDbList(dbList.formulaFileList);
                    setFilteredList(dbList.formulaFileList);
                }
                setIsLoading(false); // allow the component to be rendered
            },

            // failure function (also anonymous)
            function (msg) {       // failure function gets error message from ajax_alt
                console.log("Ajax error encountered: " + msg);
                setError(msg);
                setIsLoading(false); // allow the component to be rendered
            }
        );
    }, []);

    function sortByProp(propName, sortType) {
        // sort the user list based on property name and type
        jsSort(dbList, propName, sortType);
        console.log("Sorted list is below");
        console.log(dbList);

        // For state variables that are objects or arrays, you have to do 
        // something like this or else React does not think that the state 
        // variable (dbList) has changed. Therefore, React will not re-render 
        // the component.
        let listCopy = JSON.parse(JSON.stringify(dbList)); 
        setDbList(listCopy);
    }

    const doFilter = (filterInputVal) => {
        let newList = filterObjList(dbList, filterInputVal);
        console.log("function doFilter. filterInputVal is: " + filterInputVal +
            ". See filtered list on next line:");
        console.log(newList);
        setFilteredList(newList);
    };

    const clearFilter = () => {
        setFilterInput("");
        doFilter("");
    }

    function callInsert() {  
        window.location.hash = "#/formulaInsert";
    }

    if (isLoading) {
        console.log("initial rendering, Data not ready yet...");
        return <div> Loading... </div>
    }

    if (error) {
        console.log(`there must have been an ajax error (e.g., bad URL), 
        or database error (e.g., connection error because not tunnelled in)...`);
        return <div>Error: {error} </div>;
    }

    return (
        <div className="clickSort">
            <h3>
                Formula File List &nbsp;
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp; 
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp; 
                <button onClick={clearFilter}>Clear</button> <br></br>
                <img src="icons/insert.png" onClick={callInsert}/>
            </h3>

            <table>
                <thead>
                    <tr>
                        <th onClick={() => sortByProp("serviceType", "text")} >
                            <img src="icons/sortUpDown16.png" />Service Type
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th onClick={() => sortByProp("serviceDate", "date")}
                            className="textAlignCenter">
                            <img src="icons/blackSort.png" />Service Date
                        </th>
                        <th onClick={() => sortByProp("userEmail", "text")} >
                            <img src="icons/sortUpDown16.png" />Email
                        </th>
                        <th onClick={() => sortByProp("serviceCharge", "number")}
                            className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Service Fee
                        </th>
                        <th onClick={() => sortByProp("formula", "text")}>
                            <img src="icons/sortUpDown16.png" />Formula
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
           
                    {/* Render filteredList if filterInput is used */}
                    {filterInput ? (
                        filteredList.map((listObj) =>
                            <tr key={listObj.formulaId}>
                                <td>{listObj.serviceType}</td>
                                <td className="shadowImage textAlignCenter">
                                    {listObj.serviceImg && (
                                        <a target="_blank" href={listObj.serviceImg}>Color Image</a>
                                    )}
                                </td>
                                <td className="textAlignCenter">{listObj.serviceDate}</td>
                                <td>{listObj.userEmail}</td>
                                <td className="textAlignRight">{listObj.serviceCharge}</td>
                                <td className="nowrap">{listObj.formula}</td>
                                <td>{listObj.errorMsg}</td>
                            </tr>
                        )
                    ) : (
                        // Render dbList if filterInput is not used
                        dbList.map((listObj) =>
                            <tr key={listObj.formulaId}>
                                <td>{listObj.serviceType}</td>
                                <td className="shadowImage textAlignCenter">
                                    {listObj.serviceImg && (
                                        <a target="_blank" href={listObj.serviceImg}>Color Image</a>
                                    )}
                                </td>
                                <td className="textAlignCenter">{listObj.serviceDate}</td>
                                <td>{listObj.userEmail}</td>
                                <td className="textAlignRight">{listObj.serviceCharge}</td>
                                <td className="nowrap">{listObj.formula}</td>
                                <td>{listObj.errorMsg}</td>
                            </tr>
                        )
                    )}
                </tbody>


            </table>
        </div>
    );
};