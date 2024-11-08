function infoContent() {

  // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
  var content = `
    <h4>Info</h4>
    <p>
      This is my Info Page Content !!! 
      The home and blog links should work.
    </p>
  `;
  
  var ele = document.createElement("div");
  ele.innerHTML = content;
  return ele; 
}