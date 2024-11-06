"use strict"; // prevent browser from globally auto-declaring variables

function MakeFormulaListR_CGF() {
    // function Car(theCondition, thePrice) {
// <Car .../> calls function Car, passing an object with properties condition and price, 
// with the property values as given.

var clientFormulaList = [
    {id: 1, service_type: "Vivid Color", service_img: 'userPics/ClientFive.jpeg', 
    service_date: "date", service_charge: 123.33, formula: "6N 20 vol" },
    {},
    {id: 2, service_type: "Pink Dream", service_img: 'userPics/ClientTwo.jpeg'}
];



    return (
        <div className = "flex">
            <MakeFormulaListR formulaList={clientFormulaList} record="Client Record" recNum={1}/>
            <MakeFormulaListR formulaList={clientFormulaList} />
            <MakeFormulaListR />
        </div>
    )
}


        
        