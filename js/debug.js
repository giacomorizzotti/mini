// DEBUG
window.addEventListener('load', function() {
    if ( document.getElementById('debug-box') ) {

        var debugBox = document.getElementById('debug-box');

        // debugBox | Title
        let debugBoxWr = document.createElement("div");
        debugBoxWr.setAttribute("class", "debugData");
        debugBox.appendChild(debugBoxWr);
        let debugBoxP = document.createElement("p");
        debugBoxP.setAttribute('class', 'S m0 whTxt mono');
        debugBoxP.innerHTML = '<i class="fa fa-bug" aria-hidden="true"></i> <i><span class="miniColTxt">mini</span>debug</i>';
        debugBoxWr.appendChild(debugBoxP);


        // debugBox | Device orientation
        if (window.mobileCheck() == true) {
            let deviceOrientationWr = document.createElement("div");
            deviceOrientationWr.setAttribute("id", "deviceOrientation");
            deviceOrientationWr.setAttribute("class", "debugData");
            debugBox.appendChild(deviceOrientationWr);
            let deviceOrientationP = document.createElement("p");
            deviceOrientationP.setAttribute('class', 'S m0 whTxt mono');
            deviceOrientationWr.appendChild(deviceOrientationP);
        }

        // debugBox | Mobile detection
        let mobileDetectionWr = document.createElement("div");
        mobileDetectionWr.setAttribute("id", "mobileDetection");
        mobileDetectionWr.setAttribute("class", "debugData");
        debugBox.appendChild(mobileDetectionWr);
        let mobileDetectionP = document.createElement("p");
        mobileDetectionP.setAttribute('class', 'S m0 whTxt mono');
        mobileDetectionWr.appendChild(mobileDetectionP);
        let mobileDetectionCont = document.querySelector('#mobileDetection > p');

        // debugBox | Screen size
        let screenSizeWr = document.createElement("div");
        screenSizeWr.setAttribute("id", "screenSize");
        screenSizeWr.setAttribute("class", "debugData");;
        debugBox.appendChild(screenSizeWr);
        let screenSizeP = document.createElement("p");
        screenSizeP.setAttribute('class', 'S m0 whTxt mono');
        screenSizeWr.appendChild(screenSizeP);
        let screenSizeCont = document.querySelector('#screenSize > p');

        // debugBox | Breakpoint indicator
        let breakpointsWr = document.createElement("div");
        breakpointsWr.setAttribute("id", "breakpoints");
        breakpointsWr.setAttribute("class", "debugData");
        debugBox.appendChild(breakpointsWr);
        let breakpointsP = document.createElement("p");
        breakpointsP.setAttribute('class', 'S m0 whTxt mono');
        breakpointsWr.appendChild(breakpointsP);
        let breakpointsCont = document.querySelector('#breakpoints > p');

        // GET parameters
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const GETenv = urlParams.get('env');
        const GETlocal = urlParams.has('local');
        const GETserver = urlParams.has('server');

        const GETdebug = urlParams.has('debug');

        const GETmobile = urlParams.has('mobile');

        const GETstaging = urlParams.has('staging');
        const GETstage = urlParams.get('stage');
        const GETdev = urlParams.has('dev');
        const GETprod = urlParams.has('prod');

        // debugBox | Environment
        //let envWr = document.createElement("div");
        //envWr.setAttribute("id", "env");
        //envWr.setAttribute("class", "debugData");
        //debugBox.appendChild(envWr);
        //let envP = document.createElement("p");
        //envWr.appendChild(envP);
        //let envCont = document.querySelector('#env > p');
        //let configEnv = config.env;

        //if(GETlocal == true) {
        //    envCont.innerHTML = '<span class="whTxt light">env:</span> local';
        //} else if (GETserver == true) {
        //    envCont.innerHTML = '<span class="whTxt light">env:</span> server';
        //} else if (GETenv !== null) {
        //    if(GETenv == 'local') {
        //        envCont.innerHTML = '<span class="whTxt light">env:</span> local';
        //    } else if (GETenv == 'server') {
        //        envCont.innerHTML = '<span class="whTxt light">env:</span> server';
        //    }
        //} else {
        //    envCont.innerHTML = '<span class="whTxt light">env:</span> '+configEnv;
        //}

        // debugBox | Staging
        ////let stagingWr = document.createElement("div");
        ////stagingWr.setAttribute("id", "staging");
        ////stagingWr.setAttribute("class", "debugData");
        ////debugBox.appendChild(stagingWr);
        ////let stagingP = document.createElement("p");
        ////stagingWr.appendChild(stagingP);
        ////let stagingCont = document.querySelector('#staging > p');
        ////let configStaging = config.staging;

        //if(GETstaging == true) {
        //    stagingCont.innerHTML = '<span class="whTxt light">staging:</span> true';
        //} else {
        //    stagingCont.innerHTML = '<span class="whTxt light">staging:</span> '+configStaging;
        //}

        // debugBox | Stage
        //let stageWr = document.createElement("div");
        //stageWr.setAttribute("id", "stage");
        //stageWr.setAttribute("class", "debugData");
        //debugBox.appendChild(stageWr);
        //let stageP = document.createElement("p");
        //stageWr.appendChild(stageP);
        //let stageCont = document.querySelector('#stage > p');
        //let configStage = config.stage;
        //stageCont.innerHTML = '<span class="whTxt light">stage:</span> '+configStage;

        //if(GETdev == true && GETstaging == true) {
        //    stageCont.innerHTML = '<span class="whTxt light">stage:</span> dev';
        //} else if (GETprod == true && GETstaging == true) {
        //    stageCont.innerHTML = '<span class="whTxt light">stage:</span> prod';
        //} else if (GETstage !== null) {
        //    if(GETstage == 'dev' && GETstaging == true) {
        //        stageCont.innerHTML = '<span class="whTxt light">stage:</span> dev';
        //    } else if (GETenv == 'prod' && GETstaging == true) {
        //        stageCont.innerHTML = '<span class="whTxt light">stage:</span> prod';
        //    }
        //} else {
        //    stageCont.innerHTML = '<span class="whTxt light">stage:</span> '+configStage;
        //}

        // Mobile detection
        if ( window.mobileCheck() == true || GETmobile == true ) {
            mobileDetectionCont.innerHTML = 'mobile';
        } else {
            mobileDetectionCont.innerHTML = 'desktop';
        }

        // Screen size
        screenSizeCont.innerHTML = window.innerWidth + '<span class="grTxt">x</span>' + window.innerHeight + '<span class="grTxt">px</span>';

        // Breakpoint indicator
        let breakpoint;
        if ( window.innerWidth < 576 ) {
            breakpoint = 'XS';
        } else if ( window.innerWidth >= 576 && window.innerWidth < 768 ) {
            breakpoint = 'S';
        } else if ( window.innerWidth >= 768 && window.innerWidth < 992 ) {
            breakpoint = 'M';
        } else if ( window.innerWidth >= 992 && window.innerWidth < 1200 ) {
            breakpoint = 'L';
        } else if ( window.innerWidth >= 1200 && window.innerWidth < 1920 ) {
            breakpoint = 'XL';
        } else if ( window.innerWidth >= 1920 ) {
            breakpoint = 'XXL';
        }
        breakpointsCont.innerHTML = breakpoint;

    }
})
window.addEventListener('resize', function() {
    if ( document.getElementById('debug-box') ) {

        // Mobile detection
        let mobileDetectionCont = document.querySelector('#mobileDetection > p');
        if (window.mobileCheck() == true) {
            mobileDetectionCont.innerHTML = 'mobile';
        } else {
            mobileDetectionCont.innerHTML = 'desktop';
        }

        // Screen size
        let screenSizeCont = document.querySelector('#screenSize > p');
        screenSizeCont.innerHTML = window.innerWidth + '<span class="whTxt">x</span>' + window.innerHeight + '<span class="whTxt">px</span>';

        // Breakpoint indicator
        let breakpointsCont = document.querySelector('#breakpoints > p');
        let breakpoint;
        if ( window.innerWidth < 576 ) {
            breakpoint = 'XS';
        } else if ( window.innerWidth >= 576 && window.innerWidth < 768 ) {
            breakpoint = 'S';
        } else if ( window.innerWidth >= 768 && window.innerWidth < 992 ) {
            breakpoint = 'M';
        } else if ( window.innerWidth >= 992 && window.innerWidth < 1200 ) {
            breakpoint = 'L';
        } else if ( window.innerWidth >= 1200 && window.innerWidth < 1920 ) {
            breakpoint = 'XL';
        } else if ( window.innerWidth >= 1920 ) {
            breakpoint = 'XXL';
        }
        breakpointsCont.innerHTML = breakpoint;

    }
})
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(event) {
        // alpha: rotation around z-axis
        var rotateDegrees = event.alpha;
        // gamma: left to right
        var leftToRight = event.gamma;
        // beta: front back motion
        var frontToBack = event.beta;

        if ( document.getElementById('deviceOrientation') ) {
            let deviceOrientationCont = document.querySelector('#deviceOrientation > p');
            deviceOrientationCont.innerHTML = '<span class="whTxt"><i class="fa fa-refresh" aria-hidden="true"></i> <i>alpha</i>:</span>' + Math.round(rotateDegrees) + ' <span class="whTxt"><i class="fa fa-arrow-left" aria-hidden="true"></i> <i class="fa fa-arrow-right" aria-hidden="true"></i> <i>gamma</i>:</span>' + Math.round(leftToRight) + ' <span class="whTxt"><i class="fa fa-arrow-up" aria-hidden="true"></i> <i class="fa fa-arrow-down" aria-hidden="true"></i> <i>beta</i>:</span>' + Math.round(frontToBack);
        }

    }, true);
}
// END of DEBUG