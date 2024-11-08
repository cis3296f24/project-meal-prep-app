"use strict"; // prevent browser from globally auto-declaring variables

function MakeFormulaList_CGF() {

    var destEle = document.createElement("div");
    destEle.classList.add("flex");

    //my client formula list
    var clientFormulaList = [
        {formula_id: 1, service_type: "Single Process", service_img: 'userPics/ClientFour.jpeg', 
        service_date: "2024-01-08", service_charge: 65.00, formula: "10A 30vol" },
        {formula_id: 2, service_type: "Balayage", service_img: 'userPics/ClientThree.jpeg'},
        {}
    ];

    //invoke
    var clientFormulaComp = MakeFormulaList({
        formulaList: clientFormulaList, 
        record: "Client Record",
        recNum: 1
    });

    var clientFormulaCompTwo = MakeFormulaList({
        formulaList: clientFormulaList, 
    });
    var clientFormulaCompThree = MakeFormulaList({});


    destEle.appendChild(clientFormulaComp);
    destEle.appendChild(clientFormulaCompTwo);
    destEle.appendChild(clientFormulaCompThree);

    return destEle;

}