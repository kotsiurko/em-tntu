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
import ImageTextItems from "components/ImageTextItems/ImageTextItems";
import NewPagination from "components/Pagination/NewPagination";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------
const InternationalActivityPage = ({
  internationalActivityPage,
  mainMenuQO,
  totalNewsAmountAcadMobil,
  totalNewsAmountIntPractOfStudents,
  totalNewsAmountIntInternship,
  totalNewsAmountECF,
  totalNewsAmountPTP,
}) => {
  const { title, slug, metaDescription, intProgsTrainsAndProjects } =
    internationalActivityPage;
  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();
  const [newsBool, setNewsBool] = useState();
  const [totalNewsAmount, setTotalNewsAmount] = useState();

  useEffect(() => {
    async function getData(page) {
      let res;
      if (slug.current === "/international-activity/academic-mobility") {
        setNewsBool("academicMobilityBool");
        setTotalNewsAmount(totalNewsAmountAcadMobil);
        res = await getPortion(page, "academicMobilityBool");
      }
      if (
        slug.current ===
        "/international-activity/international-practice-of-students"
      ) {
        setNewsBool("intPractOfStudentsBool");
        setTotalNewsAmount(totalNewsAmountIntPractOfStudents);
        res = await getPortion(page, "intPractOfStudentsBool");
      }
      if (slug.current === "/international-activity/international-internship") {
        setNewsBool("intInternshipBool");
        setTotalNewsAmount(totalNewsAmountIntInternship);
        res = await getPortion(page, "intInternshipBool");
      }
      if (
        slug.current === "/international-activity/events-conferences-forums"
      ) {
        setNewsBool("eventsConferencesForumsBool");
        setTotalNewsAmount(totalNewsAmountECF);
        res = await getPortion(page, "eventsConferencesForumsBool");
      }
      if (
        slug.current === "/international-activity/programs-trainings-projects"
      ) {
        setNewsBool("programsTrainingsProjectsBool");
        setTotalNewsAmount(totalNewsAmountPTP);
        res = await getPortion(page, "programsTrainingsProjectsBool");
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
  }, [
    router.asPath,
    slug,
    totalNewsAmountAcadMobil,
    totalNewsAmountECF,
    totalNewsAmountIntInternship,
    totalNewsAmountIntPractOfStudents,
    totalNewsAmountPTP,
  ]);

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
        chapterTitle="Міжнародна діяльність"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

      {/* Page Content */}
      {slug.current !==
        "/international-activity/programs-trainings-projects" && (
        <PageContentSection data={internationalActivityPage} />
      )}

      {slug.current ===
        "/international-activity/programs-trainings-projects" && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4">
              <ImageTextItems currentItems={intProgsTrainsAndProjects} />
            </div>
          </div>
        </section>
      )}

      {/* ======= Inner Page Team-Staff Section ======= */}
      {slug.current !== "/international-activity/international-partners" && (
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
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default InternationalActivityPage;

export async function getStaticPaths() {
  const query = slugCurrent("international-activity");

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
  const internationalActivityPage = await client.fetch(
    chapterPageQuery("international-activity", slug)
  );

  const totalNewsAmountAcadMobil = await client.fetch(
    `count(*[_type == "news" && academicMobilityBool])`
  );

  const totalNewsAmountIntPractOfStudents = await client.fetch(
    `count(*[_type == "news" && intPractOfStudentsBool])`
  );

  const totalNewsAmountIntInternship = await client.fetch(
    `count(*[_type == "news" && intInternshipBool])`
  );

  const totalNewsAmountECF = await client.fetch(
    `count(*[_type == "news" && eventsConferencesForumsBool])`
  );

  const totalNewsAmountPTP = await client.fetch(
    `count(*[_type == "news" && programsTrainingsProjectsBool])`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      internationalActivityPage,
      mainMenuQO,
      totalNewsAmountAcadMobil,
      totalNewsAmountIntPractOfStudents,
      totalNewsAmountIntInternship,
      totalNewsAmountECF,
      totalNewsAmountPTP,
    },
  };
}
