function Login() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [userEmailInput, setUserEmailInput] = React.useState("");
    const [userPasswordInput, setUserPasswordInput] = React.useState("");
    const [msg, setMsg] = React.useState("");

    function launchAPI() {
        setIsLoading(true);


        var api = "webUser/getMisc?";
        var URL_email = userEmailInput;
        var URL_password = userPasswordInput;
        var URL_params = "userEmail=" + URL_email + "&userPassword=" + URL_password;
        
        // Assuming encodeURI is the correct choice for your use case
        var url = api + encodeURI(URL_params);
 


        console.log("onclick function will call ajax_alt with url: " + url);

        // for testing, this shows findClick was called, but if everything works, 
        // this test message will be overwritten by the success or failure fn below.
        setMsg("findClick was called (testing)"); 

        // ajax_alt takes three parameters:
        //   1. url to call
        //   2. success function (input param is object converted from json page)
        //   3. failure function (input param is error message string)
        ajax_alt(
            url,
            function (obj) {
                console.log("Ajax Success - got object (see next line).");
                console.log(obj);
                if (obj.errorMsg.length > 0) {
                    setMsg(<strong>{obj.errorMsg}</strong>);
                } else {
                    setMsg(
                        <div className="login">
                            <h2>Welcome Web User {obj.webUserId} </h2>

                            Birthday: {obj.birthday} <br />
                            MembershipFee: {obj.membershipFee} <br />
                            User Role: {obj.userRoleType} <br />
                            {obj.userImage == "" ? <p>No user image available</p> : <img src={obj.userImage} />}
                        </div>
                    );
                }
                setIsLoading(false);
            },
            function (errorMsg) {
                console.log("AJAX error. Here's the message: " + errorMsg);
                setMsg("ajax failure: " + errorMsg);
                setIsLoading(false);
            }
        );

    }  // function findClick

    if (isLoading) {
        return (
            <div>
                <h1>... Loading ....</h1>
            </div>
        );
    }

    return (
        <div className="login first">
            <h2>Login</h2>
            <label>Email: </label>
            <input id="URL_user" type="email" value={userEmailInput} onChange={(e) => setUserEmailInput(e.target.value)} /> <br />
            <label>Password: </label>
            <input id="URL_password" type="password" value={userPasswordInput} onChange={(e) => setUserPasswordInput(e.target.value)} />
            <br />

            {/* Corrected onClick */}
            <button onClick={launchAPI}>Login</button>
            <div>{msg}</div>
      </div>
    );
}