import Footer from "/components/Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";

export default function Layout({ children }) {
  return (
    <>
      <BackToTop />
      <main>{children}</main>
      <Footer />
    </>
  );
}
