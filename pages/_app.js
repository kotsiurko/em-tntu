import Layout from '../components/Layout/Layout'

import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// import Vendor CSS Files
// import "../public/assets/vendor/aos/aos.css"
import "../public/assets/vendor/bootstrap/css/bootstrap.min.css"
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css"
// import "../public/assets/vendor/glightbox/css/glightbox.min.css"
import "../public/assets/vendor/remixicon/remixicon.css"
// import "../public/assets/vendor/swiper/swiper-bundle.min.css"
// Template Main CSS File
import "../public/assets/css/style.css"
// Custom styles
import "styles/styles.css"

export default function App({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({
      delay: 300,
      duration: 1500,
      // delay: 10,
      // duration: 15,
    });
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}