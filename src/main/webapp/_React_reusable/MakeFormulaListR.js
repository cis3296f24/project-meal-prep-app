"use strict"; // prevent browser from globally auto-declaring variables

function MakeFormulaListR({ formulaList = [{}], record = "Untitled Record", recNum = 0}) {


    function MakeFormula ( {
        formula_id = 0, 
        service_type = "unknown service", 
        service_img = null, 
        service_date = "no date", 
        service_charge = 0.00, 
        formula = "no formula" 
    }) {
        if (formulaList.length === 1 && Object.keys(formulaList[0]).length === 0){
            console.log("Formula List Empty");
  
            return (
            <div className="rec">
                <p>Error: Cannot generate component because object list was not supplied.</p>

            </div>);
            } else {

                // Declare a new state variable called 'condition' with initial value = theCondition.
                // Use setCondition whenever you need to change the value of this state variable.
                const [formulaState, setFormulaState] = React.useState(formula);

                // Declare a new state variable called 'conditionInput' with initial value = empty string.
                // Use setConditionInput whenever you need to change the value of this state variable.
                const [formulaInput, setFormulaInput] = React.useState("");

                // Declare a new state variable called 'price' with initial value = formatCurrency(thePrice).
                // Use setPrice whenever you need to change the value of this state variable.
                const [chargeState, setChargeState] = React.useState(service_charge);

                // Declare a new state variable called 'priceFactorInput' with initial value = empty string.
                // Use setPrice whenever you need to change the value of this state variable.
                const [chargeFactorInput, setChargeFactorInput] = React.useState("");

                function makeNum(numStr) {
                    numStr += ""; // convert to string, if it's not a string.

                    // remove formatting characters, if there are any
                    numStr = numStr.replace("$", "");
                    numStr = numStr.replace(",", "");

                    var num = Number(numStr); // convert to number again.
                    return num;
                }


                // private function, can only be used within function MakeCar
                function formatCurrency(numStr) {

                    numStr += ""; // convert to string, if it's not a string.

                    // remove formatting characters, if there are any
                    numStr = numStr.replace("$", "");
                    numStr = numStr.replace(",", "");

                    var num = Number(numStr); // convert to number again.

                    var formattedNum = num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
                    console.log("formattedNum:" + formattedNum);
                    return formattedNum;
                }

                function changeFormula() {
                    setFormulaState(formulaInput);
                    // no need for a "display" function -- react redisplays automatically
                    // whenever a state variable changes (using the official state variable setter function). 
                }

                function changeChargeByFactor() {
                    var n = Number(chargeFactorInput);
                    console.log("changing charge by this rate " + n);
                    var newCharge = makeNum(service_charge) + n;
                    setChargeState(newCharge);
                    // no need for a "display" function -- react redisplays automatically
                    // whenever a state variable changes (using the official state variable setter function). 
                };

                if (service_img == null) {
                    return (
                        <div className="rec"> 
                            <p>image not available</p> 
                            <h3>{service_type}</h3>
                            Formula: {formulaState} <br />
                            Charge: {formatCurrency(chargeState)} <br />
                            <button onClick={changeFormula}> Change formula: </button>
                            <input value={formulaInput} onChange={e => setFormulaInput(e.target.value)} /> <br />
                            <button onClick={changeChargeByFactor}>Update charge: </button>
                            <input value={chargeFactorInput} onChange={e => setChargeFactorInput(e.target.value)} />
                        </div>
                    );
                    
                } else {
                    return (
                        <div className="rec"> 
                            <img src = {service_img} /> 
                            <h3>{service_type}</h3> 
                            Formula: {formulaState} <br />
                            Charge: {formatCurrency(chargeState)} <br />
                            <button onClick={changeFormula}> Change formula: </button>
                            <input value={formulaInput} onChange={e => setFormulaInput(e.target.value)} /> <br />
                            <button onClick={changeChargeByFactor}>Update charge: </button>
                            <input value={chargeFactorInput} onChange={e => setChargeFactorInput(e.target.value)} />
                        </div>
                    );
                    
                }

            }
    } // MakeCar


    // MakeCarList Entry Point 

    return (
        <div className="recList">
            <h2>{record}: {recNum}</h2>
            {
                formulaList.map(form_rec =>
                    <MakeFormula key={form_rec.id} formula_id = {form_rec.formula_id} service_type={form_rec.service_type} 
                    service_img={form_rec.service_img} service_date={form_rec.service_date} service_charge={form_rec.service_charge} 
                    formula={form_rec.formula}
                     />
                )
            }
        </div>
    );
    
}