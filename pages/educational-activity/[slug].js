import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
  newsPerPage,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { getPortion } from "lib/helpers";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------
const EducationalActivityPage = ({
  educationalActivityPage,
  mainMenuQO,
  totalNewsAmountSportLife,
  totalNewsAmountExcursions,
  totalNewsAmountFacultyDays,
}) => {

  const { title, slug, metaDescription } = educationalActivityPage;
  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();
  const [newsBool, setNewsBool] = useState();
  const [totalNewsAmount, setTotalNewsAmount] = useState();

  useEffect(() => {
    async function getData(page) {
      let res;
      if (slug.current === "/educational-activity/sport-life") {
        setNewsBool("eaSportLifeBool")
        setTotalNewsAmount(totalNewsAmountSportLife);
        res = await getPortion(page, "eaSportLifeBool");
      }
      if (slug.current === "/educational-activity/excursions") {
        setNewsBool("eaExcursionsBool")
        setTotalNewsAmount(totalNewsAmountExcursions);
        res = await getPortion(page, "eaExcursionsBool");
      }
      if (slug.current === "/educational-activity/faculty-days") {
        setNewsBool("eaFacultyDaysBool")
        setTotalNewsAmount(totalNewsAmountFacultyDays);
        res = await getPortion(page, "eaFacultyDaysBool");
      }
      setResultQuery(res);
    }

    if (router.asPath.includes("?page=")) {
      // розрізаю стрічку адреси пополам і дістаю з неї праву частину
      const pageNum = parseInt(router.asPath.split("?page=")[1]);
      setCurrPage(pageNum);
      getData(pageNum);
    } else {
      setCurrPage(1);
      getData(1);
    }
  }, [router.asPath, slug, totalNewsAmountExcursions, totalNewsAmountFacultyDays, totalNewsAmountSportLife]);



  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });

    // MENU FORMATION PART ENDS =========================================
  }, [mainMenuQO, resultQuery]);

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Виховна діяльність"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

      {/* Page Content */}
      <PageContentSection data={educationalActivityPage} />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
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

export default EducationalActivityPage;

export async function getStaticPaths() {
  const query = slugCurrent("educational-activity");

  const pages = await client.fetch(query);
  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const educationalActivityPage = await client.fetch(
    chapterPageQuery("educational-activity", slug)
  );

  const totalNewsAmountSportLife = await client.fetch(
    `count(*[_type == "news" && eaSportLifeBool])`
  );

  const totalNewsAmountExcursions = await client.fetch(
    `count(*[_type == "news" && eaExcursionsBool])`
  );

  const totalNewsAmountFacultyDays = await client.fetch(
    `count(*[_type == "news" && eaFacultyDaysBool])`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      educationalActivityPage,
      mainMenuQO,
      totalNewsAmountSportLife,
      totalNewsAmountExcursions,
      totalNewsAmountFacultyDays,
    },
  };
}
