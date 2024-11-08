

function dropDownFW(params) {

    var dropHeaderStyle = params.dropHeaderStyle;
    var dropContentStyle = params.dropContentStyle;
    var showStyle = params.showStyle;
    var hideStyle = params.hideStyle;

    window.onclick = function (event) {

        // private function defined inside of another function
        function hide(ele) {
            ele.classList.remove(showStyle);
            ele.classList.add(hideStyle);
        }

        // private function defined inside of another function
        function show(ele) {
            ele.classList.remove(hideStyle);
            ele.classList.add(showStyle);
        }

        function hideSubMenusExcept(ele) {
            var dropContentList = document.getElementsByClassName(dropContentStyle);
            for (var i = 0; i < dropContentList.length; i++) {
                if (ele !== dropContentList[i]) {
                    hide(dropContentList[i]);
                }
            }
        }

        var clickedEle = event.target;  // this is the DOM element (anywhere on page) that was clicked.
        // console.log("clickedEle on next line");
        // console.log(clickedEle);

        if (clickedEle.classList.contains(dropHeaderStyle)) {

            var subMenu = clickedEle.parentElement.getElementsByClassName(dropContentStyle)[0];
            // console.log("nextEle on next line");
            // console.log(nextEle);

            if (subMenu.classList.contains(showStyle)) {
                hide(subMenu);
            } else {
                show(subMenu);
            }

            hideSubMenusExcept(subMenu);

        } else {

            // This is when they click anywhere on the page (not a dropHeader).
            // console.log("clicked ele is not a MenuHeader");
            hideSubMenusExcept(null); // hide all SubMenus
        }


    };  // window.onclick function 
}