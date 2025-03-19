import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";
import { urlFor } from "lib/client";

import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
  newsPerPage,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { getPortion } from "lib/helpers";

import BlockContent from "@sanity/block-content-to-react";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";
import TitleAndLinkList from "../../components/TitleAndLinkList/TitleAndLinkList";

const SpecialitiesPage = ({
  specialitiesPage,
  totalNewsAmountAlumni,
  totalNewsAmountNonFormalEduc,
  totalNewsAmountDualEduc,
  totalNewsAmountEventsWOLecturers,
  mainMenuQO,
}) => {
  const { title, slug, alumni, metaDescription, bachAgreementList } =
    specialitiesPage;

  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();
  const [newsBool, setNewsBool] = useState();
  const [totalNewsAmount, setTotalNewsAmount] = useState();

  useEffect(() => {
    async function getData(page) {
      let res;
      if (slug.current === "/specialities/alumni") {
        setNewsBool("alumniBool");
        setTotalNewsAmount(totalNewsAmountAlumni);
        res = await getPortion(page, "alumniBool");
      }
      if (slug.current === "/specialities/non-formal-education") {
        setNewsBool("nonFormalEducationBool");
        setTotalNewsAmount(totalNewsAmountNonFormalEduc);
        res = await getPortion(page, "nonFormalEducationBool");
      }
      if (slug.current === "/specialities/dual-education") {
        setNewsBool("dualEducationBool");
        setTotalNewsAmount(totalNewsAmountDualEduc);
        res = await getPortion(page, "dualEducationBool");
      }
      if (slug.current === "/specialities/events-with-other-lecturers") {
        setNewsBool("eventsWOLecturersBool");
        setTotalNewsAmount(totalNewsAmountEventsWOLecturers);
        res = await getPortion(page, "eventsWOLecturersBool");
      }
      // /specialities/events-with-other-lecturers
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
    totalNewsAmountAlumni,
    totalNewsAmountDualEduc,
    totalNewsAmountNonFormalEduc,
    totalNewsAmountEventsWOLecturers,
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
        chapterTitle="Спеціальності"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

      {/* Page Content */}
      {slug.current !== "/specialities/events-with-other-lecturers" && (
        <PageContentSection data={specialitiesPage} />
      )}

      {/* Сторінка ДУАЛЬНА ОСВІТА */}
      {slug.current === "/specialities/dual-education" && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Договори</p>
            </header>

            <TitleAndLinkList list={bachAgreementList} />
          </div>
        </section>
      )}

      {/* ======= Inner Page Team-Staff Section ======= */}
      {(slug.current === "/specialities/alumni" ||
        slug.current === "/specialities/non-formal-education" ||
        slug.current === "/specialities/dual-education") && (
        <section className="features my-personal">
          <div className="row feature-icons">
            <h3>Події розділу</h3>
          </div>
        </section>
      )}
      {(slug.current === "/specialities/alumni" ||
        slug.current === "/specialities/non-formal-education" ||
        slug.current === "/specialities/dual-education" ||
        slug.current === "/specialities/events-with-other-lecturers") && (
        <>
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
        </>
      )}
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default SpecialitiesPage;

export async function getStaticPaths() {
  const query = slugCurrent("specialities");

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
  const specialitiesPage = await client.fetch(
    chapterPageQuery("specialities", slug)
  );

  const totalNewsAmountAlumni = await client.fetch(
    `count(*[_type == "news" && alumniBool])`
  );

  const totalNewsAmountNonFormalEduc = await client.fetch(
    `count(*[_type == "news" && nonFormalEducationBool])`
  );
  const totalNewsAmountDualEduc = await client.fetch(
    `count(*[_type == "news" && dualEducationBool])`
  );

  const totalNewsAmountEventsWOLecturers = await client.fetch(
    `count(*[_type == "news" && eventsWOLecturersBool])`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  if (slug === "stakeholders") {
    return {
      redirect: {
        destination: "/specialities/stakeholders/principles",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  return {
    props: {
      specialitiesPage,
      totalNewsAmountAlumni,
      totalNewsAmountNonFormalEduc,
      totalNewsAmountDualEduc,
      totalNewsAmountEventsWOLecturers,
      mainMenuQO,
    },
  };
}
