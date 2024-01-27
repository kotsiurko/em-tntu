import Head from "next/head";
import { useEffect, useState } from "react";
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
import Practices from "components/Practices/Practices";
import NewPagination from "components/Pagination/NewPagination";

const newsBool = "masterAcademicHonestyBool";

const MasterPage = ({ masterPage, totalNewsAmount, mainMenuQO }) => {
  const { title, slug, academicHonesty, metaDescription, masterPracticesList } =
    masterPage;

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
  }, []);

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
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Магістру"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {slug.current === "/master/practices" && (
        <Practices prList={masterPracticesList} />
      )}

      {/* Page Content */}
      <PageContentSection data={masterPage} />

      {academicHonesty && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Події розділу</p>
            </header>

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
      )}

    </>
  );
};

export default MasterPage;

export async function getStaticPaths() {
  const query = slugCurrent("master");

  const pages = await client.fetch(query);
  const paths = pages.map((master) => ({
    params: {
      slug: master.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const masterPage = await client.fetch(chapterPageQuery("master", slug));
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  if (slug === "educational-and-professional-programs") {
    return {
      redirect: {
        destination:
          "/master/educational-and-professional-programs/programs-and-guarantor",
        permanent: false,
      },
    };
  }
  return {
    props: {
      masterPage,
      totalNewsAmount,
      mainMenuQO,
    },
  };
}
