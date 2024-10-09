// FUNCTIONS

// MOBILE DEVICE DETECTION
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

// DESKTOP/MOBILE class to body element
// On Window load, adding a "moibile" or "desktop" class to body element, after a mobile check.
// If GET param "mobile" has been set, a mobile versione will be forced
window.addEventListener('load', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const GETmobile = urlParams.has('mobile');
    mobileCheck()
    if ( window.mobileCheck() == true || (GETmobile == true)) {
        document.body.classList.add('mobile');
    } else if ( window.mobileCheck() == false ) {
        document.body.classList.add('desktop');
    }
});

// PAGINATION
// If is there a "#pagination" element, inside of that element, its child elements will be paginated.
// Default page elements: 30;
function pagination(pageElements=30) {

    if ( document.getElementById('pagination') != null ) {

        var pagination = document.getElementById('pagination');

        if (pagination.children.length > pageElements) {
            
        var thisPage;
        pagination.setAttribute("pages", pageElements);
        var elements = pagination.children;
        for (var i = 0; i < elements.length; i++) {
            elements[i].classList.add('pagination-element', 'element-'+(i+1));
        }

        function showFirstPage() {
            for (var i = 0; i < elements.length; i++) {
                if ( i < pageElements ) {
                    if ( elements[i].classList.contains('d-none') ) {
                        elements[i].classList.remove('d-none')
                    }
                    elements[i].classList.add('d-block');
                } else {
                    elements[i].classList.add('d-none');
                }
            }
            thisPage = 1;
        }

        showFirstPage();


        // Calculate number of pages    
        let pages;
        if ( elements.length % pageElements == 0 ) {
            pages = elements.length / pageElements
        } else {
            pages = ( elements.length - elements.length % pageElements ) / pageElements + 1
        }
        
        // function: go to page
        function showPage(num) {

            var startingElement;
            var endingElement;

            //console.log(elements.length);

            if ( elements.length % pageElements == 0 ) {
                startingElement = num*pageElements-pageElements
                endingElement = num*pageElements
            } else {
                startingElement = num*pageElements-pageElements
                endingElement = num*pageElements
            }

            //console.log(startingElement);
            //console.log(endingElement);

            for (var m = 0; m < elements.length; m++) {
                if ( elements[m].classList.contains('d-block') ) {
                    elements[m].classList.remove('d-block');
                    elements[m].classList.add('d-none');
                }
            }

            for (var n = startingElement; n < endingElement; n++) {
                if ( elements[n] != null ) {
                    if ( elements[n].classList.contains('d-none') ) {
                        elements[n].classList.remove('d-none');
                        elements[n].classList.add('d-block');
                    }
                }
            }

            thisPage = num;
            createControls();
            
        }

        // Create page buttons

        function createControls() {

            if ( document.getElementsByClassName('pagination-controls-wrapper') != null ) {
                controlWrappers = document.getElementsByClassName('pagination-controls-wrapper');
                for ( i=0; i<controlWrappers.length; i++ ) {
                    controlWrappers[i].remove();
                }
            }
    
            let paginationControlsWrapper = document.createElement("div");
            paginationControlsWrapper.setAttribute("id", "pagination-controls-wrapper");
            paginationControlsWrapper.classList.add('pagination-controls-wrapper');
            paginationControlsWrapper.classList.add('boxes');
    
            let paginationControls = document.createElement("div");
            paginationControls.setAttribute("id", "pagination-controls");
            paginationControls.classList.add('box', 'box-100', 'py-0', 'pagination-controls');
        
            // go to first page button
            let firstPage = document.createElement("a");
            firstPage.href = "#top";
            firstPage.setAttribute("id", "page-start-btn");
            firstPage.classList.add('page-start-btn', 'btn', 'me-05', 'mb-05', 'display-inline-block');
            firstPageLabel = document.createTextNode("<<");
            firstPage.appendChild(firstPageLabel);
            paginationControls.appendChild(firstPage);
    
            firstPage.addEventListener("click", function() {
                showPage(1);
            });
    
            // go to prev page button
            if ( thisPage > 1 ) {
    
                let prevPage = document.createElement("a");
                prevPage.href = "#top";
                prevPage.setAttribute("id", "page-start-btn");
                prevPage.classList.add('page-start-btn', 'btn', 'me-05', 'mb-05', 'display-inline-block');
                prevPageLabel = document.createTextNode("<");
                prevPage.appendChild(prevPageLabel);
                paginationControls.appendChild(prevPage);
        
                prevPage.addEventListener("click", function() {
                    showPage(thisPage-1);
                });
        
            }
    
            // go to page button
            k=1;
            while (k <= pages) {
                
                let pageBtn = document.createElement("a");
                pageBtn.href = "#top";
                if (k == 1) {
                    pageBtn.setAttribute("id", "page-"+k+"-btn");
                } else if ( k == pages ) {
                    pageBtn.setAttribute("id", "page-"+k+"-btn");
                } else {
                    pageBtn.setAttribute("id", "page-"+k+"-btn");
                }
                pageBtn.classList.add("page-btn", "page-"+k+"-btn", 'btn', 'me-05', 'mb-05', 'display-inline-block');
                pageBtn.setAttribute('page', k)
                pageBtnLabel = document.createTextNode(k);
                pageBtn.appendChild(pageBtnLabel);
                paginationControls.appendChild(pageBtn);
    
                k++;
    
                pageBtn.addEventListener( 'click', function() { showPage(this.getAttribute('page')) })
    
            }
    
            // go to next page button
            if ( thisPage < pages ) {
    
                let nextPage = document.createElement("a");
                nextPage.href = "#top";
                nextPage.setAttribute("id", "page-start-btn");
                nextPage.classList.add('page-start-btn', 'btn', 'me-05', 'mb-05', 'display-inline-block');
                nextPageLabel = document.createTextNode(">");
                nextPage.appendChild(nextPageLabel);
                paginationControls.appendChild(nextPage);
        
                nextPage.addEventListener("click", function() {
                    showPage(thisPage+1);
                });
        
            }
    
            // go to last page button
            let lastPage = document.createElement("a");
            lastPage.href = "#top";
            lastPage.setAttribute("id", "page-end-btn");
            lastPage.classList.add('page-end-btn', 'btn', 'me-05', 'mb-05', 'display-inline-block');
            lastPageLabel = document.createTextNode(">>");
            lastPage.appendChild(lastPageLabel);
            paginationControls.appendChild(lastPage);
    
            lastPage.addEventListener("click", function() {
                showPage(pages);
            });
    
            paginationControlsWrapper.appendChild(paginationControls);

            parentDiv = pagination.parentNode
            parentDiv.insertBefore(paginationControlsWrapper, pagination)

            function insertAfter(referenceNode, newNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            }
            //insertAfter(pagination, paginationControlsWrapper.cloneNode(true));

            activeBtn = document.querySelectorAll('[page="'+thisPage+'"]');
            activeBtn[0].classList.add('clicked');

        }

        createControls();
            
        }

    }
}
window.addEventListener("load", pagination(30))

// EVENT -> ACTION CONFIRMATION
// Ask for a basic onfrimation after a certain action.
// Add this function in page elements
function confirmAction(e, message = null)
{
    var text_message = 'Are you sure?';
    if (message != null){
        text_message = message;
    }
    if(!confirm(text_message)) {
        e.preventDefault();
    }
}

// EVENT -> ADD CLASS
// Add a class to a target element after a certain event.
// You can also remove a class from the target element.
// Add this function in page elements
function addClass(targetElement, classToAdd, classToRemove = null) {
    var element = document.querySelectorAll(targetElement);
    for (let i=0; i < element.length; i++) {
        if ( !element[i].classList.contains(classToAdd) ) {
            element[i].classList.add(classToAdd);
        } 
        if ( classToRemove != null && element[i].classList.contains(classToRemove) ) {
            element[i].classList.remove(classToRemove);
        }
    }
}

// EVENT -> REMOVE CLASS
// Remove a class to a target element after a certain event.
// You can also add a class from the target element.
// Add this function in page elements
function removeClass(targetElement, classToRemove, classToAdd = null) {
    var element = document.querySelectorAll(targetElement);
    for (let i=0; i < element.length; i++) {
        if ( element[i].classList.contains(classToRemove) ) {
            element[i].classList.remove(classToRemove);
        }
        if ( classToAdd != null && !element[i].classList.contains(classToAdd) ) {
            element[i].classList.add(classToAdd);
        }
    }
}

// EVENT -> TOGGLE CLASS
// Toggle a class to a target element after a certain event.
// You can also toggle another (invert) class from the target element.
// Add this function in page elements
function toggleClass(elementToLookFor, classToToggle, invertClassToToggle = null) {
    var element = document.querySelectorAll(elementToLookFor);
    for (let i=0; i < element.length; i++) {
        if ( element[i].classList.contains(classToToggle) ) {
            element[i].classList.remove(classToToggle);
            if ( invertClassToToggle != null && !element[i].classList.contains(invertClassToToggle)) {
                element[i].classList.add(invertClassToToggle);
            }
        } else if ( !element[i].classList.contains(classToToggle) ) {
            element[i].classList.add(classToToggle);
            if ( invertClassToToggle != null && element[i].classList.contains(invertClassToToggle)) {
                element[i].classList.remove(invertClassToToggle);
            }
        }
    }
}

// EVENT -> COLLAPSE CLASS
// Toggle "show" and "hidden" classes in a target element after a click event.
// Add this function in page elements
function collapse(targetObject) {
    var element = document.querySelectorAll(targetObject);
    for (i=0; i<element.length; i++) {
        if (!element[i].classList.contains("hidden") && !element[i].classList.contains("shown")) {
            element[i].classList.add("shown")
        }
    }
    toggleClass(targetObject, 'shown', 'hidden');
}
function showElement(targetObject) {
    removeClass(targetObject, 'hidden');
    addClass(targetObject, 'shown');
}
function hideElement(targetObject) {
    removeClass(targetObject, 'shown');
    addClass(targetObject, 'hidden');
}

// COOKIES
// SET COOKIE
function setCookie(cname, cvalue, exdays, path, domain=0) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    var domainToCookie;
    if ( domain != 0 ) {
        domainToCookie = "domain=" + domain + ";";
    } else if (domain == 1) {
        domainToCookie = "domain=" + window.location.hostname + ";";
    } else {
        domainToCookie = "";
    }

    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=" + path + ";" + domainToCookie;
}

// READ COOKIE
function readCookie(name) {
    var nameEQ = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}
// DELETE COOKIE
function deleteCookie(name) {
    setCookie(name,"",-1, "/");
}

// LOADER
window.addEventListener("load", function() {
    if ( document.querySelectorAll(".loader") ) {
        var loader = document.querySelectorAll(".loader");
        loader[0].classList.add("done");
        setTimeout(function () {
            loader[0].classList.remove("done");
            loader[0].classList.add("gone");
        }, 1000);
    }
});

// TOP/SCROLL class to body element
// On Window load and scroll, adding a "top" or "scroll" class to body element
window.addEventListener('load', function() {
    var body = document.body;
    if ( window.pageYOffset < 100 ) {
        if ( body.classList.contains('scroll') ) {
            body.classList.remove('scroll');
        }
        body.classList.add('top');
    } else {
        if (body.classList.contains('top')) {
            body.classList.remove('top');
        }
        body.classList.add('scroll');
    }
});
window.addEventListener('scroll', function() {
    var body = document.body;
    if ( window.pageYOffset > 100 ) {
        body.classList.add("scroll");
        body.classList.remove("top");
    } else {
        body.classList.add("top");
        body.classList.remove("scroll");
    }
});

// SQUARE DIV MIN
// Checked on load and on resize
window.addEventListener('load', squareDiv, false);
window.addEventListener('resize', squareDiv, false);
function squareDiv() {
    document.querySelectorAll(".square").forEach( function (item) {
        item.style.minHeight = item.offsetWidth + "px"
    });
}

// SQUARE DIV FIXED
// Checked on load and on resize
window.addEventListener('load', squareFixDiv, false);
window.addEventListener('resize', squareFixDiv, false);
function squareFixDiv() {
    document.querySelectorAll(".square-fixed").forEach( function (item) {
        item.style.height = item.offsetWidth + "px"
    });
}

// FULLHD DIV MIN
// Checked on load and on resize
window.addEventListener('load', fullHdDiv, false);
window.addEventListener('resize', fullHdDiv, false);
function fullHdDiv() {
    document.querySelectorAll(".full-hd").forEach( function (item) {
        item.style.minHeight = (item.offsetWidth * 0.5625) + "px"
    });
}

// USE MEDIA ELEMENT AS BACKGROUND
// If an element has a '.media-cover' class, that element would cover all the size of the parent (position-relative) element
window.addEventListener('load', imageCoverOnLoad);
window.addEventListener('resize', imageCoverOnResize);
function imageCoverOnLoad() {
    imageCover();
}
function imageCoverOnResize() {
    imageCover();
}
function imageCover(target = '.media-cover') {

    var element = document.querySelectorAll(target);

    for (j=0;j<element.length;j++) {

        element[j].style.position = 'absolute';
        element[j].style.top = '50%';
        element[j].style.left = '50%';
        element[j].style.transform= 'translate(-50%, -50%)';

        let elementWrapper = element[j].parentNode;

        let imageWidth = element[j].offsetWidth;
        let imageHeight = element[j].offsetHeight;
        let parentWidth = elementWrapper.offsetWidth;
        let parentHeight = elementWrapper.offsetHeight;
        let screenWidth = window.innerWidth;
        let screenHeight = window.innerHeight;

        let screenRatio = screenWidth / screenHeight;
        let wrapperRatio = parentWidth / parentHeight;
        let imgRatio = imageWidth / imageHeight;

        elementWrapper.style.overflow = "hidden";
        elementWrapper.style.position = "relative";

        if (wrapperRatio >= 1) {                        // SCHERMO ORIZZONTALE o QUADRATO
            if (imgRatio < 1) {                         // IMMAGINE VERTICALE
                element[j].style.width = '100%';
                element[j].style.height = 'auto';
            } else {                                    // IMMAGINE ORIZZONTALE o QUADRATA
                if (imgRatio >= wrapperRatio) {
                    element[j].style.width = 'auto';
                    element[j].style.height = '100%';
                } else {
                    element[j].style.width = '100%';
                    element[j].style.height = 'auto';
                }
            }
        } else {                                        // SCHERMO VERTICALE
            if (imgRatio >= 1) {                        // IMMAGINE ORIZZONTALE o QUADRATA
                element[j].style.width = 'auto';
                element[j].style.height = '100%';
            } else {                                    // IMMAGINE VERTICALE
                if (imgRatio < wrapperRatio) {
                    element[j].style.width = '100%';
                    element[j].style.height = 'auto';
                } else {
                    element[j].style.width = 'auto';
                    element[j].style.height = '100%';
                }
            }
        }

    }
}

// CLICKED/TO-CLICK FUNCTION TO ELEMENTS
// Toggle "cliced" and "to-click" classes from a target element
window.addEventListener('load', function() {

    let btn = document.querySelectorAll(".click");

    for (let i=0; i<btn.length; i++) {
        
        if ( !btn[i].classList.contains("to-click") && !btn[i].classList.contains("clicked") ) {
            btn[i].classList.add("to-click");
        }

        btn[i].addEventListener( 'mousedown', function() {
            
            if ( btn[i].classList.contains("clicklist") ) {
                
                let clicklist = document.getElementsByClassName('clicklist');
                for (let k=0; k<clicklist.length; k++) {
                    if ( clicklist[k].classList.contains("clicked") ) {
                        clicklist[k].classList.remove("clicked");
                        clicklist[k].classList.add("to-click");
                    }
                }
                
            }

            if ( btn[i].classList.contains("to-click") ) {
                btn[i].classList.remove("to-click");
                btn[i].classList.add("clicked");
            } else if ( btn[i].classList.contains("clicked") ) {
                btn[i].classList.remove("clicked");
                btn[i].classList.add("to-click");
            }

        });

    }

});

// PAGE MENU
// Add elements to page menu
window.addEventListener('load', function() {

    var autoMenuSection = document.querySelectorAll("section.page-menu");
    var autoMenu = document.querySelectorAll("ul#page-menu");

    if ( autoMenuSection.length > 0 ) {
        let icon = document.createElement("li");
        icon.classList.add("item");
        icon.classList.add("menu-icon");
        icon.innerHTML = '<i class="fa fa-file-text-o" aria-hidden="true"></i>';
        for (let i=0; i<autoMenu.length; i++) {
            autoMenu[0].appendChild(icon);
        }
    } else {
        for (let i=0; i<autoMenu.length; i++) {
            autoMenu[0].style.display = "none";
        }
    }

    autoMenuSection.forEach(function(thisSection) {
        let thisSectionName = thisSection.id;
        let thisSectionMenuItemName = thisSection.getAttribute('menuItemName');
        let li = document.createElement("li");
        let liA = document.createElement("a");
        for (let i=0; i<autoMenu.length; i++) {
            autoMenu[0].appendChild(li).appendChild(liA);
        }
        li.classList.add("item");
        li.classList.add("page-menu-item");
        liA.href = "#"+thisSectionName;
        if (thisSectionMenuItemName) {
            liA.textContent = thisSectionMenuItemName;
        } else {
            liA.textContent = '#'+thisSectionName;
        }
    });

});

// Items active on scroll
window.addEventListener('load', makeItemActive);
window.addEventListener('scroll', makeItemActive);

function makeItemActive() {

    var anchors = document.querySelectorAll('ul.menu > li.page-menu-item > a');

    for (var i = 0; i < anchors.length; ++i) {

        var thisAnchor = anchors[i];
        var thisAnchorHref = thisAnchor.getAttribute('href');
        if (thisAnchorHref[0] === '/') {
            thisAnchorHref = thisAnchorHref.substring(2);
        } else if (thisAnchorHref[0] === '#') {
            thisAnchorHref = thisAnchorHref.substring(1);
        } else {
            //console.log('there\'s a problem with one of the link in the main menu.');
        }
        var target = document.getElementById(thisAnchorHref);

        var targetDistance = target.getBoundingClientRect();

        if (thisAnchor.href === 'top') {
            if ( targetDistance.bottom >= (0 - window.innerHeight) ) {
                thisAnchor.classList.add("active");
            } else {
                if ( thisAnchor.classList.contains("active") ) {
                    thisAnchor.classList.remove("active");
                }
            }
        } else {
            if ( targetDistance.top <= (-1 + window.innerHeight) && targetDistance.bottom >= 1 ) { // WAS 0 and 0
                thisAnchor.classList.add("active");
            } else {
                if ( thisAnchor.classList.contains("active") ) {
                    thisAnchor.classList.remove("active");
                }
            }
        }
    }

}

// Close mobile menu after item click
window.addEventListener('load', function() {
    let autoMenuItems = document.getElementsByClassName('page-menu-item');
    for (let i = 0; i < autoMenuItems.length; i++) {
        let headMenu = document.getElementById('head-menu');
        autoMenuItems[i].addEventListener('click', function () {
            if (headMenu.classList.contains('open')) {
                headMenu.classList.remove('open');
                headMenu.classList.add('closed');
            }
        })
    }
})

// menu toggle
window.addEventListener('load', function() {

    if (document.getElementById('side-menu') != null && document.getElementById('side-menu') != null ) {

        var menuToggle = document.getElementById('menu-toggle');
        var headMenu = document.getElementById('side-menu');
        var mainMenuItem = document.querySelectorAll('#side-menu > nav.menu > ul.menu > li.menu-item > a');
    
        headMenu.classList.add('closed');
    
        menuToggle.onclick = function() {
            if (headMenu.classList.contains("closed")) {
                headMenu.classList.add("open");
                headMenu.classList.remove("closed");
            } else if (headMenu.classList.contains("open")) {
                headMenu.classList.add("closed");
                headMenu.classList.remove("open");
            }
        }
    
        for (i=0;i<mainMenuItem.length;i++) {
            if(!mainMenuItem[i].parentElement.classList.contains('drop-down')) {
                mainMenuItem[i].addEventListener('click', function() {
                    for (j=0;j<headMenu.length;j++) {
                        if (headMenu[j].classList.contains("open")) {
                            headMenu[j].classList.add("closed");
                            headMenu[j].classList.remove("open");
                        }
                    }
                })
            }
        }

    }

});

// dropdown menu
window.addEventListener('load', function() {
    var dropDownMenu = document.querySelectorAll('li.item.drop-down');

    for (i=0; i<dropDownMenu.length; i++) {
        let thisDropDownItem = dropDownMenu[i];
        let thisDropDownMenu = thisDropDownItem.querySelectorAll('ul.menu.drop-down');
        if (thisDropDownMenu.length>0 && thisDropDownMenu.length<2) {
            thisDropDownMenu[0].classList.add('hidden');

            if (mobileCheck() == false) {
                if (thisDropDownItem.classList.contains('ho')) {
                    thisDropDownItem.addEventListener('mouseover', function() {
                        if (thisDropDownMenu[0].classList.contains('hidden')) {
                            thisDropDownMenu[0].classList.remove('hidden');
                            thisDropDownMenu[0].classList.add('shown');
                        }
                    })
                }
                if (thisDropDownItem.classList.contains('hc')) {
                    thisDropDownItem.addEventListener('mouseout', function () {
                        if (thisDropDownMenu[0].classList.contains('shown')) {
                            thisDropDownMenu[0].classList.remove('shown');
                            thisDropDownMenu[0].classList.add('hidden');
                        }
                    })
                }
                if (thisDropDownItem.classList.contains('c')) {
                    thisDropDownItem.addEventListener('click', function () {
                        if (thisDropDownMenu[0].classList.contains('hidden')) {
                            thisDropDownMenu[0].classList.remove('hidden');
                            thisDropDownMenu[0].classList.add('shown');
                        } else if (thisDropDownMenu[0].classList.contains('shown')) {
                            thisDropDownMenu[0].classList.remove('shown');
                            thisDropDownMenu[0].classList.add('hidden');
                        }
                    })
                }
            } else {
                thisDropDownItem.addEventListener('click', function() {
                    if (thisDropDownMenu[0].classList.contains('hidden')) {
                        thisDropDownMenu[0].classList.remove('hidden');
                        thisDropDownMenu[0].classList.add('shown');
                    } else if (thisDropDownMenu[0].classList.contains('shown')) {
                        thisDropDownMenu[0].classList.remove('shown');
                        thisDropDownMenu[0].classList.add('hidden');
                    }
                })
            }

        }
    }

})

// START | DEPRECATED
// consider browser's bar on smartphones in full height calculation
/*
window.addEventListener('load', function () {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
*/

// We listen to the resize event
/*
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});
*/
// END | DEPRECATED

// LANGs
function setLang(languageCode) {
    setCookie('lang', languageCode, 30, '/');
}
var lang;
if (readCookie('lang') == 'en') {
    lang = 'en';
} else if (readCookie('lang') == 'it') {
    lang = 'it';
} else if (readCookie('lang') == null) {
    lang = document.documentElement.lang;
}

// STARs background
window.addEventListener('load', function (){
    let starsBg = document.querySelectorAll('.stars-bg');
    starsBg.forEach(function(stars){
        let divStarOne = document.createElement("div");
        let divStarTwo = document.createElement("div");
        let divStarThree = document.createElement("div");

        divStarOne.setAttribute("id","stars1");
        divStarTwo.setAttribute("id","stars2");
        divStarThree.setAttribute("id","stars3");

        stars.prepend(divStarThree);
        stars.prepend(divStarTwo);
        stars.prepend(divStarOne);
    });
});

// VIBING TEXT (auto span wrap)
window.addEventListener('load', function (){
    let vibing = document.querySelectorAll(".vibing");
    vibing.forEach(function(thisVibing){
        thisVibing.innerHTML = "<span>"+thisVibing.textContent.split('').join("</span><span>");+"</span>";
    });
});

// BUTTONS
window.onload = function() {
    var z = 1000;
    for (i=1;i<=z;i++) {
        let btns = document.querySelectorAll(".btn"+i);
        let tgts = document.querySelectorAll(".tgt"+i);
        let bOrs = document.querySelectorAll(".bOr"+i);
        let tOrs = document.querySelectorAll(".tOr"+i);

        if (btns.length > z) { z = z*z; };

        btns.forEach( function(btn) {
            btn.onclick = function() {

                tgts.forEach( function(tgt) {
                    if (tgt.classList.contains("hidden")) {
                        tgt.classList.remove("hidden");
                        tgt.classList.add("shown");
                    } else if (tgt.classList.contains("shown")) {
                        tgt.classList.remove("shown");
                        tgt.classList.add("hidden");
                    };
                });

                tOrs.forEach( function(tOr) {
                    if (tOr.classList.contains("shown")) {
                        tOr.classList.add("hidden");
                        tOr.classList.remove("shown");
                    };
                });

            };
        });

    }

};

// ERRORS
window.addEventListener('load', function() {
    var warningMsg = document.getElementById('warnings');
    var errorMsg = document.getElementById('errors');
    if (readCookie('minifyErrors') != null) {
        if (readCookie('minifyErrors') == '1') {
            if (warningMsg) {
                warningMsg.classList.add('minified');
            }
            if (errorMsg) {
                errorMsg.classList.add('minified');
            }
        } else {
            if (warningMsg) {
                warningMsg.classList.remove('minified');
            }
            if (errorMsg) {
                errorMsg.classList.remove('minified');
            }
        }
    } else {
    }
})
function minifyWandE() {
    var warningMsg = document.getElementById('warnings');
    var errorMsg = document.getElementById('errors');
    if (warningMsg) {
        if (warningMsg.classList.contains('minified')) {
            warningMsg.classList.remove('minified');
            setCookie('minifyErrors',0, 1, '/');
        } else {
            warningMsg.classList.add('minified');
            setCookie('minifyErrors',1, 1, '/');
        }
    }
    if (errorMsg) {
        if (errorMsg.classList.contains('minified')) {
            errorMsg.classList.remove('minified');
            setCookie('minifyErrors',0, 1, '/');
        } else {
            errorMsg.classList.add('minified');
            setCookie('minifyErrors',1, 1, '/');
        }
    }
}

// LANG translations
var yes;
var no;
window.addEventListener('load', basicTranslations());
function basicTranslations() {
    if (lang=='en') {
        yes = 'yes';
        no= 'no';
    } else if(lang=='it') {
        yes = 'si';
        no= 'no';
    }
}

/*
window.addEventListener('load',function() {
    console.log('mini loaded. ♥ Have a good navigation!');
})
*/
