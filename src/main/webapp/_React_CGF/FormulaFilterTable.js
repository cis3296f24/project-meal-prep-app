"use strict";

const FormulaFilterTable = ({dbList, setDbList, filteredList, filterInput}) => {

    console.log("FormulaFilterTable running!!");

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
                                <td>
                                    <a href={'#/formulaUpdate/:'+listObj.formulaId}><img src="icons/update.png" className="clickLink"/></a>
                                </td>
                                <td>{listObj.serviceType+ ' ('+listObj.formulaId+')'}</td>
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
                                <td>
                                    <a href={'#/formulaUpdate/:'+listObj.formulaId}><img src="icons/update.png" className="clickLink"/></a>
                                </td>
                                <td>{listObj.serviceType+ ' ('+listObj.formulaId+')'}</td>
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