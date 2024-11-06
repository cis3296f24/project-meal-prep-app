"use strict";

const UserFilterTable = ({dbList, setDbList, filteredList, filterInput}) => {

    console.log("UserFilterTable running!!");

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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th onClick={() => sortByProp("userEmail", "text")} >
                            <img src="icons/sortUpDown16.png" />Email
                        </th>
                        <th className="textAlignCenter">Image</th>
                        <th onClick={() => sortByProp("birthday", "date")}
                            className="textAlignCenter">
                            <img src="icons/blackSort.png" />Birthday
                        </th>
                        <th onClick={() => sortByProp("membershipFee", "number")}
                            className="textAlignRight" >
                            <img src="icons/whiteSort.png" />Membership Fee
                        </th>
                        <th onClick={() => sortByProp("userRoleType", "text")}>
                            <img src="icons/sortUpDown16.png" />Role
                        </th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render filteredList if filterInput is used */}
                    {filterInput ? (
                        filteredList.map((listObj) =>
                        
                            <tr key={listObj.webUserId}>
                                <td>
                                    <a href={'#/userUpdate/:'+listObj.webUserId}><img src="icons/update.png" className="clickLink"/></a>
                                </td>
                                <td>{listObj.userEmail + ' ('+listObj.webUserId+')'}</td>
                                <td className="shadowImage textAlignCenter">
                                    {listObj.userImage && (
                                        <img src= {listObj.userImage} />
                                        
                                    )}
                                </td>
                                <td className="textAlignCenter">{listObj.birthday}</td>
                                <td className="textAlignRight">{listObj.membershipFee}</td>
                                <td className="nowrap">{listObj.userRoleType}</td>
                                <td>{listObj.errorMsg}</td>
                            </tr>
                        )
                    ) : (
                        // Render dbList if filterInput is not used
                        dbList.map((listObj) =>
                            <tr key={listObj.webUserId}>
                                <td>
                                    <a href={'#/userUpdate/:'+listObj.webUserId}><img src="icons/update.png" className="clickLink"/></a>
                                </td>
                                <td>{listObj.userEmail + ' ('+listObj.webUserId+')'}</td>
                                <td className="shadowImage textAlignCenter">
                                    {listObj.userImage && (
                                        <img src= {listObj.userImage} />
                                    )}
                                </td>
                                <td className="textAlignCenter">{listObj.birthday}</td>
                                <td className="textAlignRight">{listObj.membershipFee}</td>
                                <td className="nowrap">{listObj.userRoleType}</td>
                                <td>{listObj.errorMsg}</td>
                            </tr>
                        )
                    )}
                </tbody>


            </table>
        </div>
    );
};