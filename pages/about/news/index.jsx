import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import { mainMenuQueriesObjCreator, newsPerPage } from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { getPortion } from "lib/helpers";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";

const newsBool = "allNewsBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const NewsList = ({ totalNewsAmount, mainMenuQO }) => {
  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();

  useEffect(() => {
    if (router.asPath.includes("?page=")) {
      // розрізаю стрічку адреси пополам і дістаю з неї праву частину
      const pageNum = parseInt(router.asPath.split("?page=")[1]);
      setCurrPage(pageNum);
      getData(pageNum);
    } else {
      setCurrPage(1);
      getData(1);
    }
  }, [router.asPath]);

  async function getData(page) {
    const res = await getPortion(page, newsBool);
    setResultQuery(res);
  }

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>Новини | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content="Новини та події кафедри електричної інженерії ТНТУ"
        />
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      <Header mainMenuArr={mainMenuArr} />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Новини"
        pageUrl="/about/news"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container">
          <header className="section-header">
            <p>НОВИНИ КАФЕДРИ</p>
          </header>

          <div className="row gy-4">
            <NewsItems currentItems={resultQuery} />
          </div>

          {totalNewsAmount > newsPerPage && (
            <NewPagination
              totalNewsAmount={totalNewsAmount}
              currPage={currPage}
              setResultQuery={setResultQuery}
              setCurrPage={setCurrPage}
              newsBool={newsBool}
            />
          )}
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default NewsList;

export async function getStaticProps() {
  const totalNewsAmount = await client.fetch(`count(*[_type == "news"])`);
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      totalNewsAmount,
      mainMenuQO,
    },
  };
}
