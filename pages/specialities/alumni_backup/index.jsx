import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  chapterPageQuery,
  mainMenuQueriesObjCreator,
  newsPerPage,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { getPortion } from "lib/helpers";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";
import PageContentSection from "components/PageContentSection/PageContentSection";

const newsBool = "alumniBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const Alumni = ({ specialitiesPage, totalNewsAmount, mainMenuQO }) => {
  console.log("specialitiesPage", specialitiesPage);
  const { title, slug, alumni, metaDescription, bachAgreementList } =
    specialitiesPage;

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
        <title>Випускники | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content="Випускники кафедри електричної інженерії"
        />
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      <Header mainMenuArr={mainMenuArr} />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Спеціальності"
        pageTitle="Випускники"
        pageUrl="alumni"
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>Випускники</h3>
        </div>
      </section>

      {/* Page Content */}
      {slug.current !== "/specialities/events-with-other-lecturers" && (
        <PageContentSection data={specialitiesPage} />
      )}

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>Події розділу</h3>
        </div>
      </section>

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
  );
};

export default Alumni;

export async function getStaticProps() {
  const specialitiesPage = await client.fetch(
    chapterPageQuery("specialities", "alumni")
  );

  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      specialitiesPage,
      totalNewsAmount,
      mainMenuQO,
    },
  };
}
