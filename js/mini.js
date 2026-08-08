// FUNCTIONS

// things to do on LOAD
window.addEventListener('load', function() {
    setWebsiteCookie()
    addDeviceClassToBody()
    menuToggle()
    adminMenuToggle()
    dropDownMenuItems()
    buildPageMenu()
    loaderGone()
    checkScrollTopCondition()
    btnClickToClickFeature()
    pageMenuItemActiveOnScroll()
    starsBackground()
    pagination(30)
    vibingText()
    setHeaderHeight()
    updateScrollVars()
    wireDataAttributes()
    setupScrollReveal()
})

// things to do on SCROLL
window.addEventListener('scroll', function() {
    checkScrollTopCondition()
    pageMenuItemActiveOnScroll()
    updateScrollVars()
})

// things to do on RESIZE
window.addEventListener('resize', function() {
    setHeaderHeight()
})

// MOBILE DEVICE DETECTION
window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

    // If GET param "mobile" has been set, a mobile version will be forced
    if (new URLSearchParams(window.location.search).has('mobile')) check = true;

    return check;
};

// WEBSITE SETTINGS
// Persists UI preferences (dark mode, admin sidebar state) across page loads
var website;
function updateWebsiteCookie() {
    setCookie('website', JSON.stringify(website))
}
function setWebsiteCookie() {
    if (readCookie('website')) {
        website = JSON.parse(readCookie('website'))
        // Restore dark mode preference
        // Note: for zero FOUC, also add this inline in <head>:
        //   const w = JSON.parse(document.cookie.match(/website=([^;]+)/)?.[1] ?? '{}');
        //   if (w.theme) document.documentElement.dataset.theme = w.theme;
        if (website.theme) {
            document.documentElement.dataset.theme = website.theme;
        }
    } else {
        website = {}
        updateWebsiteCookie()
    }
}

// DESKTOP/MOBILE class to body element
function addDeviceClassToBody() {
    document.body.classList.add(window.mobileCheck() ? 'mobile' : 'desktop');
}

// HEADER HEIGHT CSS CUSTOM PROPERTY
// Sets --header-height on :root so CSS can use it anywhere.
// Use in CSS: padding-top: var(--header-height)
// Replaces per-element inline padding — apply the class in CSS instead.
function setHeaderHeight() {
    const header = document.getElementById('header');
    if (header) {
        document.documentElement.style.setProperty(
            '--header-height', header.offsetHeight + 'px'
        );
    }
}

// DARK MODE TOGGLE
// Toggles data-theme="dark"/"light" on <html> and persists to the website cookie.
// Wire to any element with data-theme-toggle (handled in wireDataAttributes).
function toggleDarkMode() {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    website.theme = next;
    updateWebsiteCookie();
}

// SCROLL CSS CUSTOM PROPERTIES
// Sets --scroll-y (px) and --scroll-progress (0 to 1) on :root on every scroll.
// Useful for CSS-driven scroll animations, progress bars, parallax.
function updateScrollVars() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll).toFixed(4) : 0;
    document.documentElement.style.setProperty('--scroll-y', Math.round(scrollY) + 'px');
    document.documentElement.style.setProperty('--scroll-progress', progress);
}

// DECLARATIVE DATA-ATTRIBUTE INTERACTIONS
// Wires common interactions via HTML attributes — no onclick needed.
//
//   data-toggle="#selector"     toggle shown/hidden on target
//   data-show="#selector"       show target
//   data-hide="#selector"       hide target
//   data-theme-toggle           toggle dark/light mode
//   data-copy="#selector"       copy text content of target to clipboard
//   data-copy-text="..."        copy a literal string to clipboard
//
// Triggers add class "copied" for 2s to the element (useful for CSS feedback).
function wireDataAttributes() {
    document.addEventListener('click', function(e) {

        const toggle = e.target.closest('[data-toggle]');
        if (toggle) collapse(toggle.dataset.toggle);

        const show = e.target.closest('[data-show]');
        if (show) showElement(show.dataset.show);

        const hide = e.target.closest('[data-hide]');
        if (hide) hideElement(hide.dataset.hide);

        if (e.target.closest('[data-theme-toggle]')) toggleDarkMode();

        const copyEl = e.target.closest('[data-copy]');
        if (copyEl) {
            const source = document.querySelector(copyEl.dataset.copy);
            if (source) copyToClipboard(source.textContent.trim(), copyEl);
        }

        const copyText = e.target.closest('[data-copy-text]');
        if (copyText) copyToClipboard(copyText.dataset.copyText, copyText);

    });
}

function copyToClipboard(text, trigger) {
    const done = () => {
        if (!trigger) return;
        trigger.classList.add('copied');
        setTimeout(() => trigger.classList.remove('copied'), 2000);
    };
    if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).then(done);
    } else {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        done();
    }
}

// SCROLL REVEAL
// Adds "revealed" class to [data-reveal] elements when they enter the viewport.
// Use data-reveal-delay="200" (ms) to stagger animations.
// Fires once per element — unobserved after reveal.
function setupScrollReveal() {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const delay = parseInt(entry.target.dataset.revealDelay ?? 0, 10);
            setTimeout(() => entry.target.classList.add('revealed'), delay);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1 });

    targets.forEach(el => observer.observe(el));
}

// PAGINATION
// If there is a "#pagination" element, its child elements will be paginated.
// Default page elements: 30
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
                    elements[i].classList.add('block');
                } else {
                    elements[i].classList.add('none');
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
            num = parseInt(num, 10);
            const startingElement = num * pageElements - pageElements;
            const endingElement   = num * pageElements;

            for (var m = 0; m < elements.length; m++) {
                if ( elements[m].classList.contains('block') ) {
                    elements[m].classList.remove('block');
                    elements[m].classList.add('none');
                }
            }

            for (var n = startingElement; n < endingElement; n++) {
                if ( elements[n] != null ) {
                    if ( elements[n].classList.contains('none') ) {
                        elements[n].classList.remove('none');
                        elements[n].classList.add('block');
                    }
                }
            }

            thisPage = num;
            createControls();
        }

        // Create page buttons
        function createControls() {

            if ( document.getElementsByClassName('pagination-controls-wrapper') != null ) {
                let controlWrappers = document.getElementsByClassName('pagination-controls-wrapper');
                for ( let i=0; i<controlWrappers.length; i++ ) {
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
            firstPage.setAttribute("id", "page-start-btn");
            firstPage.classList.add('page-start-btn', 'btn', 'grey', 'S', 'me-05', 'mb-05', 'display-inline-block');
            firstPage.appendChild(document.createTextNode("<<"));
            paginationControls.appendChild(firstPage);
            firstPage.addEventListener("click", function() { showPage(1); });

            // go to prev page button
            if ( thisPage > 1 ) {
                let prevPage = document.createElement("a");
                prevPage.setAttribute("id", "page-prev-btn");
                prevPage.classList.add('page-prev-btn', 'btn', 'grey', 'S', 'me-05', 'mb-05', 'display-inline-block');
                prevPage.appendChild(document.createTextNode("<"));
                paginationControls.appendChild(prevPage);
                prevPage.addEventListener("click", function() { showPage(thisPage - 1); });
            }

            // page number buttons
            for (let k = 1; k <= pages; k++) {
                let pageBtn = document.createElement("a");
                pageBtn.href = "#top";
                pageBtn.setAttribute("id", "page-"+k+"-btn");
                pageBtn.classList.add("page-btn", "page-"+k+"-btn", 'btn', 'grey', 'S', 'me-05', 'mb-05', 'display-inline-block');
                pageBtn.setAttribute('page', k);
                pageBtn.appendChild(document.createTextNode(k));
                paginationControls.appendChild(pageBtn);
                pageBtn.addEventListener('click', function() { showPage(parseInt(this.getAttribute('page'), 10)); });
            }

            // go to next page button
            if ( thisPage < pages ) {
                let nextPage = document.createElement("a");
                nextPage.setAttribute("id", "page-next-btn");
                nextPage.classList.add('page-next-btn', 'btn', 'grey', 'S', 'me-05', 'mb-05', 'display-inline-block');
                nextPage.appendChild(document.createTextNode(">"));
                paginationControls.appendChild(nextPage);
                nextPage.addEventListener("click", function() { showPage(thisPage + 1); });
            }

            // go to last page button
            let lastPage = document.createElement("a");
            lastPage.href = "#top";
            lastPage.setAttribute("id", "page-end-btn");
            lastPage.classList.add('page-end-btn', 'btn', 'grey', 'S', 'me-05', 'mb-05', 'display-inline-block');
            lastPage.appendChild(document.createTextNode(">>"));
            paginationControls.appendChild(lastPage);
            lastPage.addEventListener("click", function() { showPage(pages); });

            paginationControlsWrapper.appendChild(paginationControls);

            let parentDiv = pagination.parentNode
            parentDiv.insertBefore(paginationControlsWrapper, pagination)

            let activeBtn = document.querySelectorAll('[page="'+thisPage+'"]');
            activeBtn[0].classList.add('clicked');
        }

        createControls();

        }

    }
}

// EVENT -> ACTION CONFIRMATION
function confirmAction(e, message = null) {
    if (!confirm(message ?? 'Are you sure?')) {
        e.preventDefault();
    }
}

// EVENT -> ADD CLASS
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
// Optionally toggle an invert class simultaneously.
function toggleClass(elementToLookFor, classToToggle, invertClassToToggle = null) {
    var element = document.querySelectorAll(elementToLookFor);
    for (let i=0; i < element.length; i++) {
        if ( element[i].classList.contains(classToToggle) ) {
            element[i].classList.remove(classToToggle);
            if ( invertClassToToggle != null && !element[i].classList.contains(invertClassToToggle)) {
                element[i].classList.add(invertClassToToggle);
            }
        } else {
            element[i].classList.add(classToToggle);
            if ( invertClassToToggle != null && element[i].classList.contains(invertClassToToggle)) {
                element[i].classList.remove(invertClassToToggle);
            }
        }
    }
}

// EVENT -> COLLAPSE
// Toggle "shown" and "hidden" classes on a target element.
function collapse(targetObject) {
    var element = document.querySelectorAll(targetObject);
    for (let i=0; i<element.length; i++) {
        if (!element[i].classList.contains("hidden") && !element[i].classList.contains("shown")) {
            element[i].classList.add("shown")
        }
    }
    toggleClass(targetObject, 'shown', 'hidden');
}
function toggleAndCloseOthers(elementToShow, elementsToHide, buttons=null, thisButton=null ) {
    var elsToToggle = document.querySelectorAll(elementToShow);
    var elsToHide = document.querySelectorAll(elementsToHide);
    for (let j=0; j<elsToToggle.length; j++) {
        if (elsToToggle[j].classList.contains('shown')) {
            elsToToggle[j].classList.remove('shown')
            elsToToggle[j].classList.add('hidden')
        } else if (elsToToggle[j].classList.contains('hidden')) {
            elsToToggle[j].classList.remove('hidden')
            elsToToggle[j].classList.add('shown')
        }
        for (let i=0; i<elsToHide.length; i++) {
            if (!elsToHide[i].isSameNode(elsToToggle[j])) {
                if(elsToHide[i].classList.contains('shown')) {
                    elsToHide[i].classList.remove('shown')
                    elsToHide[i].classList.add('hidden')
                }
            }
        }
    }
    if (buttons && thisButton) {
        var buttonsToClickClicked = document.querySelectorAll(buttons)
        for (let k=0; k<buttonsToClickClicked.length; k++) {
            if (thisButton && buttonsToClickClicked[k].isSameNode(thisButton)) {
                if(!buttonsToClickClicked[k].classList.contains('to-click') && !buttonsToClickClicked[k].classList.contains('clicked')) {
                    buttonsToClickClicked[k].classList.add('clicked')
                } else if ( buttonsToClickClicked[k].classList.contains('to-click') ) {
                    buttonsToClickClicked[k].classList.remove('to-click')
                    buttonsToClickClicked[k].classList.add('clicked')
                } else if ( buttonsToClickClicked[k].classList.contains('clicked') ) {
                    buttonsToClickClicked[k].classList.remove('clicked')
                    buttonsToClickClicked[k].classList.add('to-click')
                }
            } else {
                if(buttonsToClickClicked[k].classList.contains('clicked'))
                    buttonsToClickClicked[k].classList.remove('clicked')
                if(!buttonsToClickClicked[k].classList.contains('to-click'))
                    buttonsToClickClicked[k].classList.add('to-click')
            }
        }
    }
}

function showElement(targetObject) {
    removeClass(targetObject, 'hidden');
    addClass(targetObject, 'shown');
}
function hideElement(targetObject) {
    removeClass(targetObject, 'shown');
    addClass(targetObject, 'hidden');
}
function removeClickedClass(targetObject) {
    var els = document.querySelectorAll(targetObject);
    for (let j=0; j<els.length; j++) {
        if (els[j].classList.contains('clicked')) {
            els[j].classList.remove('clicked')
            els[j].classList.add('to-click')
        }
    }
}
function removeToClickClass(targetObject) {
    var els = document.querySelectorAll(targetObject);
    for (let j=0; j<els.length; j++) {
        if (els[j].classList.contains('to-click')) {
            els[j].classList.remove('to-click')
            els[j].classList.add('clicked')
        }
    }
}

// COOKIES
function setCookie(cname, cvalue, exdays = 30, path = '/', domain = 0) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    var domainToCookie;
    if (domain === 1) {
        domainToCookie = "domain=" + window.location.hostname + ";";
    } else if (domain) {
        domainToCookie = "domain=" + domain + ";";
    } else {
        domainToCookie = "";
    }
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=" + path + ";" + domainToCookie;
}

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

function deleteCookie(name) {
    setCookie(name, "", -1, "/");
}

// LOADER
function loaderGone() {
    var loader = document.querySelectorAll(".loader");
    if (loader.length > 0) {
        loader[0].classList.add("done");
        setTimeout(function () {
            loader[0].classList.remove("done");
            loader[0].classList.add("gone");
        }, 1000);
    }
}

// TOP/SCROLL class to body element
function checkScrollTopCondition() {
    var body = document.body;
    if ( window.pageYOffset < 80 ) {
        if ( body.classList.contains('scrolled') ) {
            body.classList.remove('scrolled');
        }
        if (!body.classList.contains('top')) {
            body.classList.add('top');
        }
    } else {
        if (body.classList.contains('top')) {
            body.classList.remove('top');
        }
        if (!body.classList.contains('scrolled')) {
            body.classList.add('scrolled');
        }
    }
}

// CLICKED/TO-CLICK state for .click elements
function btnClickToClickFeature() {
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
}

// PAGE MENU
// Auto-builds an in-page nav from section[id].page-menu elements
function buildPageMenu() {
    var autoMenuSection = document.querySelectorAll("section.page-menu");
    var autoMenu = document.querySelectorAll("#page-menu ul");
    if ( autoMenuSection.length > 0 ) {
        document.body.classList.add('page-menu');
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
        liA.textContent = thisSectionMenuItemName ?? '#' + thisSectionName;
    });
}

// Items active on scroll
function pageMenuItemActiveOnScroll() {
    var anchors = document.querySelectorAll('ul.menu > li.page-menu-item > a');
    for (var i = 0; i < anchors.length; ++i) {
        var thisAnchor = anchors[i];
        var thisAnchorHref = thisAnchor.getAttribute('href');
        if (thisAnchorHref[0] === '/') {
            thisAnchorHref = thisAnchorHref.substring(2);
        } else if (thisAnchorHref[0] === '#') {
            thisAnchorHref = thisAnchorHref.substring(1);
        }
        var target = document.getElementById(thisAnchorHref);
        if (!target) continue;
        var targetDistance = target.getBoundingClientRect();
        if ( targetDistance.top <= (-1 + window.innerHeight) && targetDistance.bottom >= 1 ) {
            thisAnchor.classList.add("active");
        } else {
            if ( thisAnchor.classList.contains("active") ) {
                thisAnchor.classList.remove("active");
            }
        }
    }
}

// menu toggle
function menuToggle() {
    var body = document.body
    var menuToggle = document.getElementById('menu-toggle');
    var sideLeft = document.getElementById('side-left');
    var sideRight = document.getElementById('side-right');
    var mainMenuItem = document.querySelectorAll('#side-right > nav.menu > ul.menu > li.menu-item > a');
    var header = document.getElementById('header');
    var sheet = document.getElementById('sheet');
    if ( sideRight ) {
        if (menuToggle)
            menuToggle.classList.add('to-click');
        function toggleMenuVisibility() {
            window.scrollTo(0, 0);
            if (sideRight) {
                if (!sideRight.classList.contains("open-menu")) {
                    sideRight.classList.add("open-menu");
                    if (!body.classList.contains("open-menu")) {
                        body.classList.add("open-menu");
                    }
                } else if (sideRight.classList.contains("open-menu")) {
                    sideRight.classList.remove("open-menu");
                    if (body.classList.contains("open-menu") ) {
                        if ( !sideLeft || !sideLeft.children.length > 0 || !sideLeft.classList.contains('open-menu') ) {
                            body.classList.remove("open-menu");
                        }
                    }
                }
            }
            if (sheet) {
                if (sheet.classList.contains('open-menu')) {
                    sheet.classList.remove('open-menu')
                } else {
                    sheet.classList.add('open-menu')
                }
            }
            if (header) {
                if (header.classList.contains('open-menu')) {
                    header.classList.remove('open-menu')
                } else {
                    header.classList.add('open-menu')
                }
            }
            if (menuToggle && menuToggle.classList.contains('clicked')) {
                menuToggle.classList.add("to-click");
                menuToggle.classList.remove("clicked");
            } else if (menuToggle && menuToggle.classList.contains('to-click')) {
                menuToggle.classList.add("clicked");
                menuToggle.classList.remove("to-click");
            }
        }
        function hideMenuVisibility() {
            if (header) {
                if (header.classList.contains("open-menu")) {
                    header.classList.remove("open-menu");
                }
            }
            if (sideRight) {
                if (sideRight.classList.contains("open-menu")) {
                    sideRight.classList.remove("open-menu");
                }
            }
            if (sheet) {
                if (sheet.classList.contains("open-menu")) {
                    sheet.classList.remove("open-menu");
                }
            }
            if (body.classList.contains("open-menu")) {
                if ( !sideLeft || !sideLeft.children.length > 0 || !sideLeft.classList.contains('open-menu') ) {
                    body.classList.remove("open-menu");
                }
            }
            if (menuToggle && menuToggle.classList.contains('clicked')) {
                menuToggle.classList.add("to-click");
                menuToggle.classList.remove("clicked");
            }
        }
        if (menuToggle)
            menuToggle.onclick = toggleMenuVisibility;
        for (let i=0; i<mainMenuItem.length; i++) {
            if (!mainMenuItem[i].parentElement.classList.contains('drop-down')) {
                mainMenuItem[i].addEventListener('click', hideMenuVisibility);
            }
        }
        var lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            var st = window.pageYOffset || document.documentElement.scrollTop;
            if (st > lastScrollTop && window.mobileCheck() == false) {
                if ( window.pageYOffset > 150 ) {
                    hideMenuVisibility();
                }
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }, false);
    }
}

// admin menu
function adminMenuToggle() {
    if (document.getElementById('side-left') != null && document.getElementById('admin-menu-toggle') != null ) {
        var body = document.body
        var adminMenuToggle = document.getElementById('admin-menu-toggle');
        var sideLeft = document.getElementById('side-left');
        var sideRight = document.getElementById('side-right');
        if (website.adminMenuOpen == true) {
            if (sideLeft)
                sideLeft.classList.add('open-menu')
        }
        if (
            !sideLeft.classList.contains('open-menu')
        ) {
            if (!adminMenuToggle.classList.contains('to-click'))
                adminMenuToggle.classList.add('to-click')
        } else if (
            sideLeft.classList.contains('open-menu')
        ) {
            if (!adminMenuToggle.classList.contains('clicked'))
                adminMenuToggle.classList.add('clicked')
            if (!body.classList.contains("open-menu"))
                body.classList.add("open-menu")
        }
        function toggleMenuVisibility() {
            if (sideLeft && sideLeft.children.length > 0) {
                if (!sideLeft.classList.contains("open-menu")) {
                    sideLeft.classList.add("open-menu");
                    if (!body.classList.contains("open-menu")) {
                        body.classList.add("open-menu");
                    }
                    website.adminMenuOpen = true;
                    updateWebsiteCookie()
                } else if (sideLeft.classList.contains("open-menu")) {
                    sideLeft.classList.remove("open-menu");
                    if (body.classList.contains("open-menu") ) {
                        if ( !sideRight ) {
                            body.classList.remove("open-menu");
                        }
                    }
                    website.adminMenuOpen = false;
                    updateWebsiteCookie()
                }
            }
            if (adminMenuToggle.classList.contains('clicked')) {
                adminMenuToggle.classList.add("to-click");
                adminMenuToggle.classList.remove("clicked");
            } else if (adminMenuToggle.classList.contains('to-click')) {
                adminMenuToggle.classList.add("clicked");
                adminMenuToggle.classList.remove("to-click");
            }
        }
        adminMenuToggle.onclick = toggleMenuVisibility;
    }
}

// dropdown menu
function dropDownMenuItems() {
    var dropDownMenu = document.querySelectorAll('li.menu-item.drop-down');
    for (let i=0; i<dropDownMenu.length; i++) {
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
}

// STARS background
// Injects three layer divs into .stars-bg elements for CSS star animations
function starsBackground() {
    let starsBg = document.querySelectorAll('.stars-bg');
    starsBg.forEach(function(stars){
        let divStarOne   = document.createElement("div");
        let divStarTwo   = document.createElement("div");
        let divStarThree = document.createElement("div");
        divStarOne.setAttribute("id","stars1");
        divStarTwo.setAttribute("id","stars2");
        divStarThree.setAttribute("id","stars3");
        stars.prepend(divStarThree);
        stars.prepend(divStarTwo);
        stars.prepend(divStarOne);
    });
};

// VIBING TEXT
// Wraps each character of .vibing elements in a <span> for per-letter animation
function vibingText() {
    let vibing = document.querySelectorAll(".vibing");
    vibing.forEach(function(thisVibing){
        thisVibing.innerHTML = "<span>" + thisVibing.textContent.split('').join("</span><span>") + "</span>";
    });
};
