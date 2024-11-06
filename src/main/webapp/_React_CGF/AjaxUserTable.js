const AjaxUserTable = () => {

    console.log("AjaxUserTable running");


    // Common React pattern. Display a "...Loading..." UI while the page
    // is loading. Don't try to render the component until this is false.  
    const [isLoading, setIsLoading] = React.useState(true);

    // this is the data initially read (just once) from the DB.
    const [dbList, setDbList] = React.useState([]);

    // if there is an ajax error (or db connection error, set this state variable)
    const [error, setError] = React.useState(null);

    // this is the filtered list.
    const [filteredList, setFilteredList] = React.useState([]);

    const [filterInput, setFilterInput] = React.useState("");


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
        window.location.hash = "#/userInsert";
    }

    // useEffect takes two params. The first param is the function to be run. 
    // The second param is a list of state variables that (if they change) will 
    // cause the function (first param) to be run again.
    // RUN ONCE PATTERN: With [] as 2nd param, it runs the 1st param (fn) just once. 
    React.useEffect(() => {

        // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
        ajax_alt(

            "webUser/getAll", // URL for AJAX call to invoke

            // success function (anonymous)
            function (dbList) {   // success function gets obj from ajax_alt
                if (dbList.dbError.length > 0) {
                    console.log("Database error was " + dbList.dbError);
                    setError(dbList.dbError);
                } else {
                    console.log("Data was read from the DB. See next line,");
                    console.log(dbList.webUserList);
                    setDbList(dbList.webUserList);
                    setFilteredList(dbList.webUserList);
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
        <div>
          {error ? (
            <div>Error: {error} </div>
          ) : (
            <div className="clickSort">
              <h3>
                Web User List &nbsp;
                <input value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                &nbsp; 
                <button onClick={() => doFilter(filterInput)}>Search</button>
                &nbsp; 
                <button onClick={clearFilter}>Clear</button>
                <br />
                <img src="icons/insert.png" onClick={callInsert} />
              </h3>
              <UserFilterTable dbList={dbList} setDbList={setDbList} filteredList={filteredList} filterInput={filterInput} />
            </div>
          )}
        </div>
      );      
                                    
}; // class AjaxUserTable
