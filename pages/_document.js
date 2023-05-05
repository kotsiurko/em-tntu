import { Html, Head, Main, NextScript, Script } from 'next/document';

export default function Document() {
  return (
    <Html lang="uk">
      <Head>

        <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />

        {/* Favicons */}
        <link href="/favicon.ico" rel="icon" />

        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i&display=optional" rel="stylesheet" />

        {/* <script src="scripts/lytebox.js" type="text/javascript"></script>
        <script src="jwplayer/jwplayer.js" type="text/javascript"></script> */}

      </Head>
      <body>
        <Main />
        <NextScript />


        {/* Vendor JS Files */}
        {/* <script src="/assets/vendor/aos/aos.js" async></script> */}
        <script src="/assets/vendor/purecounter/purecounter.js" async></script>
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" async></script>
        {/* <script src="/assets/vendor/glightbox/js/glightbox.min.js" async></script> */}
        <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" async></script>
        {/* <script src="/assets/vendor/swiper/swiper-bundle.min.js" async></script> */}

        {/* Template Main JS File */}
        {/* <script src="/assets/js/main.js" defer /> */}


      </body>
    </Html>
  )
}
