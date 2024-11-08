function ObjContentNoReact() {

var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display:flex; 
                flex-direction: row;
                background-color: grey;
            }
            .flexContainer .obj {
                width: 33%; /* to fit three columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
        </style>
        <h3>This Function Generates Content Using JS</h3>
        <p>
            Function ObjContentNoReact (non-React) creates 
            a parent div and calls a reusable function to create several child divs that get appended 
            into the parent. So that we can show this non-react component through the React router, 
            we use React function ObjContentReact to build a React div and place the non-React div 
            inside. 
        </p>
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content; // the HTML code specified just above...
        var objContainer = document.createElement("div");
        objContainer.classList.add('flexContainer'); // see styling in this file, above...
        ele.appendChild(objContainer);
        objContainer.appendChild(MakeObj("Nevada", "http://cis-linux2.temple.edu/~sallyk/pics_sk/balloons.png", "$695 for 3 days/nights"));
        objContainer.appendChild(MakeObj("Japan", "http://cis-linux2.temple.edu/~sallyk/pics_sk/japan.png", "$2400 for 6 days/nights"));
        objContainer.appendChild(MakeObj("Sydney", "http://cis-linux2.temple.edu/~sallyk/pics_sk/sydney.png", "$5900 for 9 days/nights"));

        return ele;
}