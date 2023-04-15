import Layout from '../components/Layout/Layout'

// import '@/styles/globals.css'
import '@/styles/styles.css'
import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// import CSS
// import "../public/assets/vendor/aos/aos.css"
import "../public/assets/vendor/bootstrap/css/bootstrap.min.css"
import "../public/assets/vendor/bootstrap-icons/bootstrap-icons.css"
import "../public/assets/vendor/glightbox/css/glightbox.min.css"
import "../public/assets/vendor/remixicon/remixicon.css"
import "../public/assets/vendor/swiper/swiper-bundle.min.css"

{/* Template Main CSS File */ }
import "../public/assets/css/style.css"
// 

export default function App({ Component, pageProps }) {

  useEffect(() => {
    AOS.init({
      delay: 300,
      duration: 1500,
    });
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}