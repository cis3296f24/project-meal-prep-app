function MakeObj (title, imgFile, text) {
    
    var ele = document.createElement("div");
    ele.classList.add("obj"); // adds styling to ele - see obj.css rules for ".obj"

    // create h2 tag. Will be styled by rules (in obj.css) for ".obj h2"
    var myHeading = document.createElement("h2");
    myHeading.innerHTML = title; 
    ele.appendChild(myHeading);

    myHeading.onclick= function() {
        alert("You'll love "+title + "!!");
    };

    // create img tag. Will be styled by rules (in obj.css) for ".obj img"
    var myImage = document.createElement("img");
    myImage.src = imgFile;
    ele.appendChild(myImage);

    // create p (paragraph) tag. Will be styled by rules (in obj.css) for ".obj p"
    var myPara = document.createElement("p");
    myPara.innerHTML = text;
    ele.appendChild(myPara);

    return ele;
}