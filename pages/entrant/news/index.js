import Head from "next/head";
import { useEffect, useState } from "react";

// Client connection
import { menuItems } from "@/components/Header/menuItems";
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, newsPerPage } from "@/lib/queries";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import NewsItems from "@/components/NewsItems/NewsItems";
import Pagination from "@/components/Pagination/Pagination";

const newsForEntrantsBool = "newsForEntrantsBool";

const NewsForEntrants = ({ totalNewsAmountForEntrants,
  initArrNewsForEntrants,
  mainMenuQO, }) => {

  const [dataFromChild, setDataFromChild] = useState(initArrNewsForEntrants);

  const updateDataFromChild = (data) => {
    setDataFromChild(data);
  };

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [initArrNewsForEntrants, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>
          Новини для абітурієнтів | Кафедра електричної інженерії ТНТУ
        </title>
        <meta name="description" content="Новини для абітурієнтів" />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Абітураієнту"
        pageTitle="Новини для абітурієнта"
        pageUrl="news"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>НОВИНИ ДЛЯ АБІТУРІЄНТІВ</p>
          </header>

          <div className="row gy-4">
            <NewsItems currentItems={dataFromChild} />
          </div>

          {/* PAGINATION BLOCK STARTS */}
          {totalNewsAmountForEntrants > newsPerPage && (
            <Pagination
              bool={newsBool}
              totalNewsAmount={totalNewsAmountForEntrants}
              sendDataToParent={updateDataFromChild}
            />
          )}
          {/* PAGINATION BLOCK ENDS */}
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default NewsForEntrants;

export async function getStaticProps() {

  const totalNewsAmountForEntrants = await client.fetch(
    `count(*[_type == "news" && ${newsForEntrantsBool}])`
  );
  const initArrNewsForEntrants = await client.fetch(
    `*[_type == "news" && ${newsForEntrantsBool}] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      totalNewsAmountForEntrants,
      initArrNewsForEntrants,
      mainMenuQO,
    },
  };
}
