import { useRouter } from "next/router";

import Header from "/components/Header/Header";
import Footer from "/components/Footer/Footer";
import BackToTop from "../BackToTop/BackToTop";

export default function Layout({ children }) {
  const router = useRouter();

  const { pathname } = router;

  // console.log("pathname :>> ", pathname);

  return (
    <>
      {/* {pathname === "/" && (
        <Header
          styles={{
            display: "none",
          }}
        />
      )} */}
      {pathname !== "/" && <Header />}
      <BackToTop />
      {/* <Header /> */}
      <main>{children}</main>
      <Footer />
    </>
  );
}
