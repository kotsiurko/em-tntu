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

const newsBool = "dualEducationBool";

const DualEducationNews = ({ totalNewsAmount, initArr, mainMenuQO }) => {
  const [dataFromChild, setDataFromChild] = useState(initArr);

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
  }, [initArr, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>Дуальна освіта | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content="Зустрічі та обговорення, присвячені питанням дуальної освіти на кафедрі"
        />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Спеціальності"
        pageTitle="Дуальна освіта"
        pageUrl="dual-education"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>ДУАЛЬНА ОСВІТА</p>
          </header>

          <div className="row gy-4">
            <NewsItems currentItems={dataFromChild} />
          </div>

          {/* PAGINATION BLOCK STARTS */}
          {totalNewsAmount > newsPerPage && (
            <Pagination
              bool={newsBool}
              totalNewsAmount={totalNewsAmount}
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

export default DualEducationNews;

export async function getStaticProps() {
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );
  const initArr = await client.fetch(
    `*[_type == "news" && ${newsBool}] | order(publishedDate desc) [0...${newsPerPage}]`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      totalNewsAmount,
      initArr,
      mainMenuQO,
    },
  };
}
