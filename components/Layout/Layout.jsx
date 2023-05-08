import Footer from "/components/Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";

export default function Layout({ children, masterEls }) {
  // console.log("children :>> ", children);
  // console.log("masterEls :>> ", masterEls);
  // const { helloStr } = children;
  // console.log("helloStr :>> ", helloStr);

  // console.log("pathname :>> ", pathname);

  return (
    <>
      <BackToTop />
      <main>{children}</main>
      <Footer />
    </>
  );
}
