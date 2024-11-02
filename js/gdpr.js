// cookie consent

var yes;
var no;

// things to do on load
window.addEventListener('load', function() {
    basicTranslations()
    checkConsent()
    cookieConstentStatus()
});

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

function basicTranslations() {
    if (lang=='it') {
        yes = 'si';
        no= 'no';
    } else {
        yes = 'yes';
        no= 'no';
    }
}

var consentBanner = document.getElementById('consent-banner');

function setAnalyticsCode(code) {
    if (typeof analyticsCode === "undefined") {
        if (typeof config != "undefined") {
            window.analyticsCode = config.analyticsCode;
        } else {
            if (typeof code != "undefined") {
                window.analyticsCode = code;
            }
            else {
                window.analyticsCode = "XX-NONE";
            }
        }
    }
}

function gtagYes() {
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

function consentGranted() {
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'ad_storage': 'granted'
        });
    }
}

function gtagNo() {
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
}

// First access
function firstAccess() {
    if (consentBanner) {
        // Create black layer
        var blackLayer = document.createElement('div');
        blackLayer.className = 'black-layer';
        document.body.insertBefore(blackLayer, consentBanner);
        // Lock website scroll
        document.body.classList.add('lock');
        // Deny consent
        gtagNo();
        // Set MAYBE cookie
        setCookie('consent_banner', 'maybe', '30', "/", "");
    } else {
        gtagYes();
    }
}

function consentGranted() {
    if (document.body.classList.contains('lock')) {
        document.body.classList.remove('lock');
    }
    gtagYes();
    setCookie('consent_banner', 'yes', '30', "/", "");
    // Write cookies status
    cookieConstentStatus()
    // Minimize banner
    closeConsentBanner();
    var blackLayer = document.querySelector('.black-layer');
    if ( blackLayer ) {
        blackLayer.style.transform = "translate(100%, 100%)";
        blackLayer.style.opacity = "0";
        setTimeout(function(){
            blackLayer[0].remove();
            }, 3000);
    }
    // Add YES class to banner
    if(consentBanner) {
        if ( consentBanner.classList.contains('no') ) {
            consentBanner.classList.remove('no');
            consentBanner.classList.add('yes');
        } else {
            consentBanner.classList.add('yes');
        }
    }
    //location.reload();
}

function consentDenied() {
    setAnalyticsCode();
    if (document.body.classList.contains('lock')) {
        document.body.classList.remove('lock');
    }
    gtagNo();
    deleteCookie('_ga');
    deleteCookie('_gat_gtag_'+(analyticsCode.substring(1)) );
    deleteCookie('_ga_'+(analyticsCode.substring(1)) );
    deleteCookie('_gat_gtag_'+(analyticsCode.substring(2)) );
    deleteCookie('_ga_'+(analyticsCode.substring(2)) );
    deleteCookie('_gid');
    setCookie('consent_banner', 'no', '30', "/", "");
    // Write cookies status
    cookieConstentStatus()
    // Minimize banner
    closeConsentBanner();
    var blackLayer = document.querySelector('.black-layer');
    if (blackLayer) {
        blackLayer.style.transform = "translate(100%, 100%)";
        blackLayer.style.opacity = "0";
        setTimeout(function(){
            blackLayer.remove();
        }, 3000);
    }
    // Add NO class to banner
    if ( consentBanner.classList.contains('yes') ) {
        consentBanner.classList.remove('yes');
        consentBanner.classList.add('no');
    } else {
        consentBanner.classList.add('no');
    }
    //location.reload();
}

function checkConsent() {
    let consent = readCookie("consent_banner");
    if (consent=="maybe") {
        // Create black layer
        if (consentBanner) {
            var blackLayer = document.createElement('div');
            blackLayer.className = 'black-layer';
            document.body.insertBefore(blackLayer, consentBanner);
        }
        // Lock website scroll
        document.body.classList.add('lock');
        // Write cookies status
        cookieConstentStatus()
        // Add NO class
        if (consentBanner) {
            if ( consentBanner.classList.contains('yes') ) {
                consentBanner.classList.remove('yes');
                consentBanner.classList.add('no');
            } else {
                consentBanner.classList.add('no');
            }
        }
    } else if (!consent) {
        firstAccess();
    }
    if (consent=="yes") {
        gtagYes();
        // Remove website scroll lock
        document.body.classList.remove('lock');
        // Write cookies status
        cookieConstentStatus()
        // Minimize banner
        if(consentBanner.classList.contains('full')) {
            consentBanner.classList.remove('full');
            consentBanner.classList.add('mini');
        }
        // Add YES class
        if ( consentBanner.classList.contains('no') ) {
            consentBanner.classList.remove('no');
            consentBanner.classList.add('yes');
        } else {
            consentBanner.classList.add('yes');
        }
    } else if (consent=="no") {
        gtagNo();
        // Remove website scroll lock
        if(document.body.classList.contains('lock')) {
            document.body.classList.remove('lock');
        }
        // Write cookies status
        cookieConstentStatus()
        // Minimize banner
        if (consentBanner) {
            if(consentBanner.classList.contains('full')) {
                consentBanner.classList.remove('full');
                consentBanner.classList.add('mini');
            }
        }
        // Add NO class
        if (consentBanner) {
            if (consentBanner.classList.contains('yes')) {
                consentBanner.classList.remove('yes');
                consentBanner.classList.add('no');
            } else {
                consentBanner.classList.add('no');
            }
        }
    }
}
function openConsentBanner() {
    if ( consentBanner ) {
        if (consentBanner.classList.contains('mini')) {
            consentBanner.classList.remove('mini');
            consentBanner.classList.add('full');
        }
    }
}
function closeConsentBanner() {
    if ( consentBanner ) {
        if( consentBanner.classList.contains('full') ) {
            consentBanner.classList.remove('full');
            consentBanner.classList.add('mini');
        }
    }
}

function cookieConstentStatus() {
    var consentStatusWrapper = document.getElementsByClassName('consent-status');
    var consentStatus = readCookie("consent_banner");
    for (i=0;i<consentStatusWrapper.length;i++) {
        if (consentStatus == 'yes') {
            consentStatusWrapper[i].innerHTML = yes;
        } else {
            consentStatusWrapper[i].innerHTML = no;
        }
    }
}
