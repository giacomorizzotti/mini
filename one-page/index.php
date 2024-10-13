<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">

    <title>### TITLE ###</title>

    <link href="favicon.ico" rel="icon" type="image/x-icon"/>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="theme-color" content="var(--mini-color)" />

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
    <?php /* <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/giacomorizzotti/mini@main/css/mini.min.css"> */ ?>
    <?php ### LOCAL ### ?>
    <link rel="stylesheet" type="text/css" href="../css/mini.min.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php ### Sans ### ?>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <?php ### Serif ### ?>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
    <?php ### Handwriting ### ?>
    <?php /* <link href="https://fonts.googleapis.com/css2?family=Edu+VIC+WA+NT+Beginner:wght@400..700&display=swap" rel="stylesheet"> */ ?>
    <?php ### Mono ### ?>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">

    <?php ### Iconoir ### ?>
    <?php /* https://iconoir.com/ */ ?>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css"/>
    
    <?php ### Boxicons ### ?>
    <?php /* https://boxicons.com/ */ ?>
    <?php /* <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'> */ ?>
    
    <?php ### FontAwesome ### ?>
    <?php /* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==" crossorigin="anonymous" /> */ ?>
    <?php ### FontAwesome | NEW icons ### ?>
    <?php /* <script src="https://kit.fontawesome.com/c62adab8d9.js" crossorigin="anonymous"></script> */ ?>

    <?php ### AOS ### ?>
    <?php /* <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"> */ ?>

    <?php ### Google tag (gtag.js) ### ?>
    <?php /* 
    <script async src="https://www.googletagmanager.com/gtag/js?id=###ANALYTICS_CODE###"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag("js", new Date());
        gtag("config", "###ANALYTICS_CODE###");
    </script>
    */ ?>

</head>

<body class="mini">
    <div class="loader"></div>
    <div id="top"></div>
    <a href="#top"><div class="top-link"><p class=""><i class="iconoir-dot-arrow-up"></i></p></div></a>

    <header id="header" class="header">
        <div class="container">
            <div class="boxes align-items-center justify-content-between">
                <div class="box brand px-2">
                    <a href="#top" class="">
                        <img src="https://mini.uwa.agency/img/brand/mini_emblem.svg" class="logo emblem me-1" alt="emblem"/>
                    </a>
                    <a href="#top" class=""><h3 class="site-title">mini</h3></a>
                </div>
                <div class="box menus px-2">
                    <div id="menu-toggle"><div class="line"></div><div class="line"></div><div class="line"></div></div>
                    <div id="head-menu" class="head-menu">
                        <nav class="menu page-menu">
                            <ul id="page-menu" class="menu page-menu">
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div class="sheet">

        <aside id="side-menu" class="">
            <nav class="menu main-menu">
                <ul id="main-menu" class="menu main-menu px-2">
                    <li class="menu-item active"><a href="/" class="active">home</a></li>
                    <li class="menu-item"><a href="#">Item_1</a></li>
                    <li class="menu-item"><a href="#">Item_2</a></li>
                    <li class="menu-item"><a href="#">Item_3</a></li>
                </ul>
            </nav>
            <nav class="menu user-menu">
                <ul id="user-menu" class="menu user-menu px-2">
                    <li class="menu-item active"><a href="#">Item_1</a></li>
                    <li class="menu-item"><a href="#">Item_2</a></li>
                    <li class="menu-item"><a href="#">Item_3</a></li>
                </ul>
            </nav>
        </aside>

        <main>

            <section id="content" class="container fw page-menu" menuItemName="content">
                <div class="container">
                    <div class="boxes fh align-content-center space-top-bot">
                        <div class="box box-100">

                            <h1 class="m-0"><i class="iconoir-linux fourth-color-box m-0"></i><span class="fw-box dark-grey-text" style="line-height: 1; vertical-align: text-top;">&nbsp;mini.</span></h1>

                        </div>
                    </div>
                </div>
            </section>
            
            <section id="test_1" class="container fw page-menu" menuItemName="Test_section_1"></section>
            <section id="test_2" class="container fw page-menu" menuItemName="Test_section_2"></section>

        </main>

    </div>

    <footer id="footer" class="footer">
        <div class="container space-top-bot">
            <div class="boxes">
                <div class="box box-33 footer-info px-2">
                    <p class=""><?php echo date("Y"); ?>&nbsp;©&nbsp;<span class="bold">uwa.agency</span></p>
                    <p class="s">A <a href="https://mini.uwa.agency/" target="_blank" class="mini-text"><i>mini</i></a> based website by <a href="https://www.uwa.agency/" target="_blank" class="mini-text"><strong>UWA</strong></a></p>
                </div>
                <div class="box box-33 footer-logo px-2">
                    <a href="#top" class=""><img src="https://mini.uwa.agency/img/brand/mini_emblem.svg" class="logo emblem" alt="emblem"/></a>
                </div>
                <div class="box box-33 footer-menu px-2">
                    <nav class="menu footer-menu">
                        <ul id="footer-menu" class="menu footer-menu p-0">
                            <li class="item active">
                                <a href="#" class="active">Item_1</a>
                            </li>
                            <li class="item">
                                <a href="#">Item_1</a>
                            </li>
                            <li class="item">
                                <a href="#">Item_3</a>
                            </li>
                            <li class="item">
                                <a href="#">Item_4</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </footer>

    <div id="credits" class="fw-bg">
        <p class="S m-0 center grey-text p-1 pt-05">
            <i class="fa fa-heart mini-text heart" aria-hidden="true"></i>&nbsp;
            Proudly <i>fully custom</i> designed & developed by&nbsp;
            <a href="https://www.uwa.agency/" target="_blank" class="fb-text hover-col">
                <img src="https://mini.uwa.agency/img/uwa/brand/uwa_logo.svg" class="img" alt="UWA logo" style="display: inline-block; width: 26px; transform: translate(0, 25%);"/>
            </a>&nbsp;
            using&nbsp;
            <a href="https://mini.uwa.agency/" target="_blank" class="fb-text link-hover-text">
                <img src="https://mini.uwa.agency/img/brand/mini_emblem.svg" class="img" alt="mini logo" style="display: inline-block; width: 16px;"/>&nbsp;
                mini
            </a>
        </p>
    </div>

    <?php ### CDN ### ?>
    <?php /* <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/giacomorizzotti/mini@main/js/mini.js"></script> */ ?>
    <?php ### LOCAL ### ?>
    <script type="text/javascript" src="../js/mini.js"></script>

    <?php ### AOS ### ?>
    <?php /* <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script> */ ?>
    <?php /* <script>AOS.init();</script> */ ?>

</body>
</html>