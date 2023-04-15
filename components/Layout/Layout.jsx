import { useRouter } from "next/router";

import Header from "/components/Header/Header";
import Footer from "/components/Footer/Footer";

export default function Layout({
  children,
}) {
  const router = useRouter();

  const { pathname } = router;

  console.log(
    "pathname :>> ",
    pathname
  );

  return (
    <>
      {pathname !== "/" && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
