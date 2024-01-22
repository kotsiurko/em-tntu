import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

// Client connection
import { menuItems } from 'components/Header/menuItems';
import { client } from "lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent, newsPerPage } from 'lib/queries';
import { menuCreator, menuItemsMerger } from 'lib/menuCreator';

import { urlFor } from "lib/client";

// Components
import Header from 'components/Header/Header';
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from 'components/PageContentSection/PageContentSection';

// Other libs
import NewsItems from 'components/NewsItems/NewsItems';
import Pagination from 'components/Pagination/Pagination';



const EducationalActivityPage = ({
  educationalActivityData,
  totalNewsAmountSportLife,
  initArrSportLife,
  totalNewsAmountExcursions,
  initArrExcursions,
  totalNewsAmountFacultyDays,
  initArrFacultyDays,
  mainMenuQO,
}) => {

  const [dataFromChild, setDataFromChild] = useState([]);
  const [dataFromChildAmount, setDataFromChildAmount] = useState();
  const [dataFromChildBool, setDataFromChildBool] = useState('');
  const updateDataFromChild = (data) => {
    setDataFromChild(data);
  }

  const {
    title,
    slug,
    eaSportLife,
    eaExcursions,
    eaFacultyDays,
    metaDescription,
  } = educationalActivityData;


  const router = useRouter();
  const { asPath } = router;

  // MENU FORMATION PART ==============================================

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

    // MENU FORMATION PART ENDS =========================================

    // ---------------------------------

    if (asPath === "/educational-activity/sport-life") {
      setDataFromChild(initArrSportLife);
      setDataFromChildAmount(totalNewsAmountSportLife);
      setDataFromChildBool("eaSportLifeBool");
    }
    if (asPath === "/educational-activity/excursions") {
      setDataFromChild(initArrExcursions);
      setDataFromChildAmount(totalNewsAmountExcursions);
      setDataFromChildBool("eaExcursionsBool");
    }
    if (asPath === "/educational-activity/faculty-days") {
      setDataFromChild(initArrFacultyDays);
      setDataFromChildAmount(totalNewsAmountFacultyDays);
      setDataFromChildBool("eaFacultyDaysBool");
    }

    // --------------------------------------

  }, [asPath, educationalActivityData, initArrExcursions, initArrFacultyDays, initArrSportLife, mainMenuQO, totalNewsAmountExcursions, totalNewsAmountFacultyDays, totalNewsAmountSportLife]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Виховна діяльність"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={educationalActivityData} />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
          </header>


          <div className="row gy-4">
            <NewsItems currentItems={dataFromChild} />
          </div>

          {/* PAGINATION BLOCK STARTS */}
          {(dataFromChildAmount > newsPerPage) && (
            <Pagination
              bool={dataFromChildBool}
              totalNewsAmount={dataFromChildAmount}
              sendDataToParent={updateDataFromChild}
            />
          )}
          {/* PAGINATION BLOCK ENDS */}


        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}

    </>
  )
}


export default EducationalActivityPage;

export async function getStaticPaths() {
  const query = slugCurrent('educational-activity');

  const pages = await client.fetch(query);
  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {
  const educationalActivityData = await client.fetch(chapterPageQuery('educational-activity', slug));

  const totalNewsAmountSportLife = await client.fetch(
    `count(*[_type == "news" && eaSportLifeBool])`
  );
  const initArrSportLife = await client.fetch(
    `*[_type == "news" && eaSportLifeBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const totalNewsAmountExcursions = await client.fetch(
    `count(*[_type == "news" && eaExcursionsBool])`
  );
  const initArrExcursions = await client.fetch(
    `*[_type == "news" && eaExcursionsBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const totalNewsAmountFacultyDays = await client.fetch(
    `count(*[_type == "news" && eaFacultyDaysBool])`
  );
  const initArrFacultyDays = await client.fetch(
    `*[_type == "news" && eaFacultyDaysBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      educationalActivityData,
      totalNewsAmountSportLife,
      initArrSportLife,
      totalNewsAmountExcursions,
      initArrExcursions,
      totalNewsAmountFacultyDays,
      initArrFacultyDays,
      mainMenuQO,
    }
  }
}