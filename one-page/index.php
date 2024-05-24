<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">

    <title>### TITLE ###</title>

    <link href="favicon.ico" rel="icon" type="image/x-icon"/>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="theme-color" content="var(--miniColor)" />

    <meta name="description" content="### DESCRIPTION ###">
    <meta name="keywords" content="### KEYWORDS ###">
    <meta name="author" content="uwa.agency [Giacomo Jack Rizzotti]">

    <meta property="og:title" content="### TITLE ###">
    <meta property="og:description" content="### DESCRIPTION ###">
    <meta property="og:image" content="### PATH TO YOUR thumbnail.jpg ###">
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='627' />
    <meta property="og:url" content="### YOUR URL ###">

    <meta name="twitter:title" content="### TITLE ###">
    <meta name="twitter:description" content="### DESCRIPTION ###">
    <meta name="twitter:image" content="favicon.ico">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="apple-touch-icon" href="favicon.ico">

    <?php ### CDN ### ?>
    <link rel="stylesheet" type="text/css" href="https://mini.uwa.agency/css/mini.min.css">
    <?php ### LOCAL ### ?>
    <?php /* <link rel="stylesheet" type="text/css" href="css/mini.min.css"> */ ?>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

    <?php ### FontAwesome ### ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossorigin="anonymous" />
    <?php ### NEW icons ### ?>
    <?php /* <script src="https://kit.fontawesome.com/c62adab8d9.js" crossorigin="anonymous"></script> */ ?>

    <?php ### AOS ### ?>
    <?php /* <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"> */ ?>

    <?php ### Google tag (gtag.js) ### ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=###ANALYTICS_CODE###"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag("js", new Date());
        gtag("config", "###ANALYTICS_CODE###");
    </script>

</head>

<body class="mini">
    <div class="loader"></div>
    <div id="top"></div>
    <a href="#top"><div class="top-link"><p class="v-cent"><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></p></div></a>

    <header id="header" class="header fixed">
        <div class="container">
            <div class="boxes boxes-h-between boxes-vv-center">
                <div class="box brand">
                    <a href="#" class="">
                        <img src="https://mini.uwa.agency/img/brand/mini_emblem.svg" class="logo emblem mr1" alt="emblem"/>
                    </a>
                    <a href="#" class="NOxlDown">
                        <img src="https://mini.uwa.agency/img/brand/mini_logotype.svg" class="logo logotype" alt="logotype"/>
                    </a>
                    <a href="#" class=""><h3 class="site-title mini-title v-cent">mini</h3></a>
                </div>
                <div class="box menus">
                    <div id="menu-toggle"><div class="line"></div><div class="line"></div><div class="line"></div></div>
                    <div id="head-menu" class="head-menu bRad10">
                        <nav id="main-menu" class="main-menu menu">
                            <ul class="main-menu menu">
                                <ul class="menu page-menu">
                                </ul>
                                <li class="menu-item"><a href="#">home</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main>

        <section id="content" class="container fw pageMenuItem" menuItemName="content">
            <div class="container">
                <div class="boxes fh boxes-v-center space-top-bot">
                    <div class="box box100">

                        <h1 class="m0">Here goes the content!</h1>

                    </div>
                </div>
            </div>
        </section>

    </main>

    <footer id="footer" class="footer">
        <div class="container space-top-bot">
            <div class="boxes">
                <div class="box box33 footer-info bRad10">
                    <p class=""><?php echo date("Y"); ?>&nbsp;©&nbsp;<span class="bold">uwa.agency</span></p>
                    <p class="S">A <a href="https://mini.uwa.agency/" target="_blank" class="miniTxt"><i>mini</i></a> based website by <a href="https://www.uwa.agency/" target="_blank" class="miniTxt"><strong>UWA</strong></a></p>
                </div>
                <div class="box box33 footer-logo">
                    <a href="#top" class=""><img src="https://mini.uwa.agency/img/brand/mini_emblem.svg" class="logo emblem v-cent" alt="emblem"/></a>
                </div>
                <div class="box box33 footer-menu">
                </div>
            </div>
        </div>
    </footer>

    <?php ### CDN ### ?>
    <script type="text/javascript" src="https://mini.uwa.agency/js/mini.js"></script>
    <?php ### LOCAL ### ?>
    <?php /* <script type="text/javascript" src="js/mini.js"></script> */ ?>

    <?php ### AOS ### ?>
    <?php /* <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script> */ ?>
    <?php /* <script>AOS.init();</script> */ ?>

</body>
</html>