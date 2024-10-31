// DEBUG

var queryString = window.location.search
var urlParams = new URLSearchParams(queryString)
var GETdebug = urlParams.has('debug')

if (GETdebug == true)
    window.addEventListener('load', function() {
        buildDebugBox()
        updateDebugBoxData()
    })
    window.addEventListener('resize', function() {
        updateDebugBoxData()
    })

function buildDebugBox() {
    var debugBox = document.createElement('div')
    debugBox.id = 'debug-box'
    document.body.appendChild(debugBox)
    // debugBox | Title
    let debugBoxWr = document.createElement("div");
    debugBoxWr.setAttribute("class", "debug-data");
    debugBox.appendChild(debugBoxWr);
    let debugBoxP = document.createElement("p");
    debugBoxP.setAttribute('class', 'S m-0 wh-text mono');
    debugBoxP.innerHTML = '<i class="iconoir-jellyfish"></i> <span class="mini-text black">mini</span> debug';
    debugBoxWr.appendChild(debugBoxP);
    // debugBox | Device orientation
    if (window.mobileCheck() == true) {
        let deviceOrientationWr = document.createElement("div");
        deviceOrientationWr.setAttribute("id", "device-orientation");
        deviceOrientationWr.setAttribute("class", "debug-data");
        debugBox.appendChild(deviceOrientationWr);
        let deviceOrientationP = document.createElement("p");
        deviceOrientationP.setAttribute('class', 'S m-0 wh-text mono');
        deviceOrientationWr.appendChild(deviceOrientationP);
    }
    // debugBox | Mobile detection
    let mobileDetectionWr = document.createElement("div");
    mobileDetectionWr.setAttribute("id", "mobile-detection");
    mobileDetectionWr.setAttribute("class", "debug-data");
    debugBox.appendChild(mobileDetectionWr);
    let mobileDetectionP = document.createElement("p");
    mobileDetectionP.setAttribute('class', 'S m-0 wh-text mono');
    mobileDetectionWr.appendChild(mobileDetectionP);
    // debugBox | Screen size
    let screenSizeWr = document.createElement("div");
    screenSizeWr.setAttribute("id", "screen-size");
    screenSizeWr.setAttribute("class", "debug-data");;
    debugBox.appendChild(screenSizeWr);
    let screenSizeP = document.createElement("p");
    screenSizeP.setAttribute('class', 'S m-0 wh-text mono');
    screenSizeWr.appendChild(screenSizeP);
    // debugBox | Breakpoint indicator
    let breakpointsWr = document.createElement("div");
    breakpointsWr.setAttribute("id", "breakpoints");
    breakpointsWr.setAttribute("class", "debug-data");
    debugBox.appendChild(breakpointsWr);
    let breakpointsP = document.createElement("p");
    breakpointsP.setAttribute('class', 'S m-0 wh-text mono');
    breakpointsWr.appendChild(breakpointsP);
    // debugBox | Scroll indicator
    let scrollWr = document.createElement("div");
    scrollWr.setAttribute("id", "scroll-indicator");
    scrollWr.setAttribute("class", "debug-data");
    debugBox.appendChild(scrollWr);
    let scrollP = document.createElement("p");
    scrollP.setAttribute('class', 'S m-0 wh-text mono');
    scrollWr.appendChild(scrollP);
}
function updateDebugBoxData() {
    // Mobile detection
    let mobileDetectionCont = document.querySelector('#mobile-detection > p');
    if ( window.mobileCheck() == true ) {
        mobileDetectionCont.innerHTML = '<span class="grey-text">dev</span> mobile';
    } else {
        mobileDetectionCont.innerHTML = '<span class="grey-text">dev</span> desktop';
    }
    // Screen size
    let screenSizeCont = document.querySelector('#screen-size > p');
    screenSizeCont.innerHTML = '<span class="grey-text">screen</span> '+window.innerWidth + '<span class="grTxt">x</span>' + window.innerHeight + '<span class="grTxt">px</span>';
    // Breakpoint indicator
    let breakpoint;
    if ( window.innerWidth < 576 ) {
        breakpoint = 'XS';
    } else if ( window.innerWidth >= 576 && window.innerWidth < 768 ) {
        breakpoint = 'S';
    } else if ( window.innerWidth >= 768 && window.innerWidth < 992 ) {
        breakpoint = 'M';
    } else if ( window.innerWidth >= 992 && window.innerWidth < 1400 ) {
        breakpoint = 'L';
    } else if ( window.innerWidth >= 1400 && window.innerWidth < 1920 ) {
        breakpoint = 'XL';
    } else if ( window.innerWidth >= 1920 ) {
        breakpoint = 'XXL';
    }
    let breakpointsCont = document.querySelector('#breakpoints > p');
    breakpointsCont.innerHTML = '<span class="grey-text">bp</span> '+breakpoint;
    
    if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", function(event) {
            // alpha: rotation around z-axis
            var rotateDegrees = event.alpha;
            // gamma: left to right
            var leftToRight = event.gamma;
            // beta: front back motion
            var frontToBack = event.beta;

            if ( document.getElementById('device-orientation') ) {
                let deviceOrientationCont = document.querySelector('#device-orientation > p');
                deviceOrientationCont.innerHTML = '<span class="wh-text"><i class="fa fa-refresh" aria-hidden="true"></i> <i>alpha</i>:</span>' + Math.round(rotateDegrees) + ' <span class="wh-text"><i class="fa fa-arrow-left" aria-hidden="true"></i> <i class="fa fa-arrow-right" aria-hidden="true"></i> <i>gamma</i>:</span>' + Math.round(leftToRight) + ' <span class="wh-text"><i class="fa fa-arrow-up" aria-hidden="true"></i> <i class="fa fa-arrow-down" aria-hidden="true"></i> <i>beta</i>:</span>' + Math.round(frontToBack);
            }

        }, true);
    }
    
    let scrollIndicatorCont = document.querySelector('#scroll-indicator > p');
    scrollIndicatorCont.innerHTML = '<span class="grey-text">scroll</span> '+window.scrollY;
    window.addEventListener('scroll', function() {
        if ( document.getElementById('scroll-indicator') ) {
            scrollIndicatorCont.innerHTML = '<span class="grey-text">scroll</span> '+window.scrollY;
        }
    })
}

// END of DEBUG