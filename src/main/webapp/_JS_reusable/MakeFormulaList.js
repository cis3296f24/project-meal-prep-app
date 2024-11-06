"use strict"; // prevent browser from globally auto-declaring variables

function MakeFormulaList ( {formulaList=[{}], record="Untitled Record", recNum=0} ) {


    function MakeFormula({
        formula_id = 0, 
        service_type = "unknown service", 
        service_img = null, 
        service_date = "no date", 
        service_charge = -1, 
        formula = "no formula" 
    }) {

        // condition and price are private data members of the object returned by MakeCar

        // This is the DOM element that will be returned.
        var recObj = document.createElement("div");

        recObj.classList.add("rec"); // style object with the ".car" rules from file car.css



        if (formulaList.length === 1 && Object.keys(formulaList[0]).length === 0){
        console.log("Formula List Empty");
        recObj.innerHTML = `
        <p>
            Error: Cannot generate component because object list was not supplied.
        </p>
        `;
        return recObj;
        } else {
                        // Condition setter method (public) - could be used from outside MakeCar
            recObj.setformula = function (newFormula) {
                formula = newFormula;
                display(); // show updated property on the page
            };

            // public method to modify price 
            recObj.changeCharge = function (changeRate) {
                var n = Number(changeRate);
                console.log("changing price by this rate " + n);
                service_charge = service_charge + n;
                display(); // show updated price on the page
            };

            if (service_img == null) {
                recObj.innerHTML = "<p>image not available</p>";
            } else {
                recObj.innerHTML = `<img src='${service_img}'/>`;
            }

            // Build the UI with back tick, more similar to how you would create things coding with HTML.
            // Add a class to every DOM element that you want to style and/or access with JavaScript. 
            recObj.innerHTML += `
                <h3>${service_type}</h3>
                <div class='recInfoClass'></div>
                <button class='formulaButtonClass'>Change Formula: </button>
                <input class='newFormulaInputClass'/> <br/>
                <button class='chargeButtonClass'>Update Charge: </button>
                <input class='chargeFactorInputClass'/> 
                `;

            // Create variable references for all DOM elements (above) that we need to programatically access. 
            var recInfo = recObj.getElementsByClassName("recInfoClass")[0];
            var formulaButton = recObj.getElementsByClassName("formulaButtonClass")[0];
            var newFormulaInput = recObj.getElementsByClassName("newFormulaInputClass")[0];
            var chargeButton = recObj.getElementsByClassName("chargeButtonClass")[0];
            var chargeFactor = recObj.getElementsByClassName("chargeFactorInputClass")[0];

            // private method display, refreshes the Info div with current values for 
            // condition and price. 
            var display = function ( ) {
                recInfo.innerHTML = `
            <p>
                Formula: ${formula}<br/>
                Charge: ${formatCurrency(service_charge)}
            </p>
            `;
            };
            display(); // do this or the carInfo area will be blank initially

            formulaButton.onclick = function () {
                recObj.setformula(newFormulaInput.value);
            };

            chargeButton.onclick = function () {
                recObj.changeCharge(chargeFactor.value);
            };

            // private function, can only be used within function MakeCar
            function formatCurrency(numStr) {

                numStr += ""; // convert to string, if it's not a string.

                // remove formatting characters, if there are any
                numStr = numStr.replace("$", "");
                numStr = numStr.replace(",", "");

                var num = Number(numStr); // convert to number again.

                var formattedNum = num.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
                console.log("formattedNum:" + formattedNum);
                return formattedNum;
            }

            return recObj;
        }
    } // MakeCar



    // *** ENTRY POINT ***
    var formulaListComp = document.createElement("div");
    formulaListComp.classList.add("recList");
    formulaListComp.innerHTML = `<h2>${record}: ${recNum}</h2>`;

//  for (var i = 0; i < carList.length; i++) {
//      var carObj = carList[i];
    for (var recObj of formulaList) { // easier, no need for index variable
        formulaListComp.appendChild(MakeFormula(recObj));
    }

    return formulaListComp;
}