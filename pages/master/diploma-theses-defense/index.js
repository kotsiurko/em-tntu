import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from 'components/Header/menuItems';
import { mainMenuQueriesObjCreator, newsPerPage } from 'lib/queries';
import { menuCreator, menuItemsMerger } from 'lib/menuCreator';
import { getPortion } from "lib/helpers";

// Components
import Header from 'components/Header/Header';
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";

const newsBool = "masterDiplomaDefenceBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------


const BachelorDefencePage = ({ mainMenuQO, totalNewsAmount }) => {

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
  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {

    const menuObj = menuItemsMerger(
      menuItems,
      mainMenuQO,
    )

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(
          menuObj,
          prevState,
        )
      }
    });
  }, [mainMenuQO]);

  return (
    <>
      <Head>
        <title>Захисти дипломних робіт магістрів | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content="Захисти дипломних робіт магістрів" />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Магістру"
        pageTitle="Захисти дипломних робіт магістрів"
        pageUrl="/master/diploma-theses-defense"
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>Захисти дипломних робіт магістрів</h3>
        </div>
      </section>

      {/* NEWS LIST */}
      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">

          <div className="row gy-4">
            <NewsItems currentItems={resultQuery} />
          </div>

          {/* PAGINATION BLOCK STARTS */}
          {totalNewsAmount > newsPerPage && (
            <NewPagination
              totalNewsAmount={totalNewsAmount}
              currPage={currPage}
              setResultQuery={setResultQuery}
              setCurrPage={setCurrPage}
              newsBool={newsBool}
            />
          )}
          {/* PAGINATION BLOCK ENDS */}
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  )
}


export default BachelorDefencePage;


export async function getStaticProps() {
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );

  return {
    props: {
      mainMenuQO,
      totalNewsAmount,
    }
  }
}