import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { mainMenuQueriesObjCreator } from "@/lib/queries";
import { menuItems } from "@/components/Header/menuItems";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";



const ProtectedPage = ({ mainMenuQO }) => {

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);
  const router = useRouter();

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });

    // Перевірити, чи існує статус аутентифікації в localStorage
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      router.push("/secret"); // Перенаправити на головну сторінку, якщо не аутентифіковано
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: Історія кафедри</title>
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Про кафедру"
        pageTitle="Колектив"
        pageUrl="/about/staff"
      />

      {/* ======= Inner Page Section ======= */}
      <section className="inner-page">
        <div className="container">
          <header className="section-header">
            <p>ВНУТРІШНЬОКАФЕДРАЛЬНІ ПОЛОЖЕННЯ, РОЗПОРЯДЖЕННЯ ТА НАКАЗИ</p>
          </header>

          <div className="d-flex justify-content-between align-items-center">
            <h6>Ця сторінка доступна лише за введенням правильного пароля.</h6>
            <button type="submit"
              className="btn btn-primary"
              onClick={() => {
                localStorage.removeItem("authenticated");
                router.push("/secret");
              }}>
              Вийти
            </button>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            Таблиця із списком документів
          </div>
        </div>
      </section>
      {/* ======= End Inner Page Section ======= */}
    </>
  );
};

export default ProtectedPage;

export async function getStaticProps() {
  // const staffData = await client.fetch(staffListQuery);
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      // staffData,
      mainMenuQO,
    },
  };
}