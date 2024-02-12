import { useEffect, useState } from "react";
import Head from "next/head";
// import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  // chapterPageQuery,
  slugCurrent,
  chapterItemQuery,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
// import { getPortion } from "lib/helpers";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import { } from "../../../lib/queries";

const LEConference = ({
  chapterConferencePage,
  // totalNewsAmount,
  // initArr,
  mainMenuQO,
}) => {
  console.log('chapterConferencePage :>> ', chapterConferencePage);
  const { title, slug, metaDescription } = chapterConferencePage;
  // const router = useRouter();

  // const [resultQuery, setResultQuery] = useState();
  // const [currPage, setCurrPage] = useState();

  // useEffect(() => {
  //   if (router.asPath.includes("?page=")) {
  //     // розрізаю стрічку адреси пополам і дістаю з неї праву частину
  //     const pageNum = parseInt(router.asPath.split("?page=")[1]);
  //     setCurrPage(pageNum);
  //     getData(pageNum);
  //   } else {
  //     setCurrPage(1);
  //     getData(1);
  //   }
  // }, [router.asPath]);

  // async function getData(page) {
  //   const res = await getPortion(page, newsBool);
  //   setResultQuery(res);
  // }

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
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      <Header mainMenuArr={mainMenuArr} />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Наука"
        pageTitle="Конференція “Світлотехніка й електроенергетика”"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <PageContentSection data={chapterConferencePage} />

      {/* ======= Inner Page Team-Staff Section ======= */}
      {/* <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>НОВИНИ РОЗДІЛУ</p>
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
      </section> */}
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default LEConference;

export async function getStaticPaths() {

  const pages = await client.fetch(slugCurrent("scienceLEConference"));
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
  // console.log('slug :>> ', slug);
  const chapterConferencePage = await client.fetch(
    chapterItemQuery("scienceLEConference", `/science/conference-lighting-and-power-engineering/${slug}`)
  );
  // const chapterConferencePage = await client.fetch(
  //   chapterPageQuery("scienceLEConference", slug)
  // );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      chapterConferencePage,
      mainMenuQO,
    },
  };
}
