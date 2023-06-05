import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/image";
import { useRouter } from "next/router";

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent, newsPerPage } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

import { urlFor } from "../../lib/client";

import BlockContent from "@sanity/block-content-to-react";

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';

// Other libs
import moment from "moment";
import NewsItems from '@/components/NewsItems/NewsItems';
import Pagination from '@/components/Pagination/Pagination';

const InternationalActivityPage = ({
  internationalActivityPageData,
  totalNewsAmountAcadMobil,
  initArrAcadMobil,
  totalNewsAmountIntPractOfStudents,
  initArrIntPractOfStudents,
  totalNewsAmountIntInternship,
  initArrIntInternship,
  totalNewsAmountECF,
  initArrECF,
  totalNewsAmountPTP,
  initArrPTP,
  mainMenuQO,
}) => {

  const [dataFromAcadMobil, setDataFromAcadMobil] = useState(initArrAcadMobil);
  const updateDataFromAcadMobil = (data) => {
    setDataFromAcadMobil(data);
  };

  const [dataFromIntPractOfStud, setDataFromIntPractOfStud] = useState(initArrIntPractOfStudents);
  const updateDataFromIntPractOfStud = (data) => {
    setDataFromIntPractOfStud(data);
  };

  const [dataFromIntInternship, setDataFromIntInternship] = useState(initArrIntInternship);
  const updateDataFromIntInternship = (data) => {
    setDataFromIntInternship(data);
  };

  const [dataFromECF, setDataFromECF] = useState(initArrECF);
  const updateDataFromECF = (data) => {
    setDataFromECF(data);
  };

  const [dataFromPTP, setDataFromPTP] = useState(initArrPTP);
  const updateDataFromPTP = (data) => {
    setDataFromPTP(data);
  };



  const {
    title,
    slug,
    academicMobility,
    intPractOfStudents,
    intInternship,
    eventsConferencesForums,
    programsTrainingsProjects,
    metaDescription,
  } = internationalActivityPageData;


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

    // if (asPath === "/international-activity/academic-mobility") {
    //   setNewsArrForMap(sortedArrayAcademicMobility);
    // }
    // if (asPath === "/international-activity/international-practice-of-students") {
    //   setNewsArrForMap(sortedArrayIntPractOfStudents);
    // }
    // if (asPath === "/international-activity/international-internship") {
    //   setNewsArrForMap(sortedArrayIntInternship);
    // }
    // if (asPath === "/international-activity/events-conferences-forums") {
    //   setNewsArrForMap(sortedArrayEventsConferencesForums);
    // }
    // if (asPath === "/international-activity/programs-trainings-projects") {
    //   setNewsArrForMap(sortedArrayProgramsTrainingsProjects);
    // }

    // --------------------------------------

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internationalActivityPageData, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Міжнародна діяльність"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={internationalActivityPageData} />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
          </header>

          {/* PAGE "/international-activity/academic-mobility" */}
          {(asPath === "/international-activity/academic-mobility") && (
            <div className="row gy-4">
              <NewsItems currentItems={dataFromAcadMobil} />
            </div>
          )}

          {/* PAGINATION BLOCK STARTS */}
          {((asPath === "/international-activity/academic-mobility")
            && (totalNewsAmountAcadMobil > newsPerPage)) && (
              <Pagination
                bool="academicMobilityBool"
                totalNewsAmount={totalNewsAmountAcadMobil}
                sendDataToParent={updateDataFromAcadMobil}
              />
            )}
          {/* PAGINATION BLOCK ENDS */}
          {/* PAGE END "/international-activity/academic-mobility" */}

          {/* PAGE "/international-activity/international-practice-of-students" */}
          {(asPath === "/international-activity/international-practice-of-students") && (
            <div className="row gy-4">
              <NewsItems currentItems={dataFromIntPractOfStud} />
            </div>
          )}

          {/* PAGINATION BLOCK STARTS */}
          {((asPath === "/international-activity/international-practice-of-students")
            && (totalNewsAmountIntPractOfStudents > newsPerPage)) && (
              <Pagination
                bool="intPractOfStudentsBool"
                totalNewsAmount={totalNewsAmountIntPractOfStudents}
                sendDataToParent={updateDataFromIntPractOfStud}
              />
            )}
          {/* PAGINATION BLOCK ENDS */}
          {/* PAGE ENDS "/international-activity/international-practice-of-students" */}

          {/* PAGE "/international-activity/international-internship" */}
          {(asPath === "/international-activity/international-internship") && (
            <div className="row gy-4">
              <NewsItems currentItems={dataFromIntInternship} />
            </div>
          )}

          {/* PAGINATION BLOCK STARTS */}
          {((asPath === "/international-activity/international-internship")
            && (totalNewsAmountIntInternship > newsPerPage)) && (
              <Pagination
                bool="intInternshipBool"
                totalNewsAmount={totalNewsAmountIntInternship}
                sendDataToParent={updateDataFromIntInternship}
              />
            )}
          {/* PAGINATION BLOCK ENDS */}
          {/* PAGE ENDS "/international-activity/international-internship" */}

          {/* PAGE "/international-activity/events-conferences-forums" */}
          {(asPath === "/international-activity/events-conferences-forums") && (
            <div className="row gy-4">
              <NewsItems currentItems={dataFromECF} />
            </div>
          )}

          {/* PAGINATION BLOCK STARTS */}
          {((asPath === "/international-activity/events-conferences-forums")
            && (totalNewsAmountECF > newsPerPage)) && (
              <Pagination
                bool="eventsConferencesForumsBool"
                totalNewsAmount={totalNewsAmountECF}
                sendDataToParent={updateDataFromECF}
              />
            )}
          {/* PAGINATION BLOCK ENDS */}
          {/* PAGE ENDS "/international-activity/events-conferences-forums" */}

          {/* PAGE "/international-activity/programs-trainings-projects" */}
          {(asPath === "/international-activity/programs-trainings-projects") && (
            <div className="row gy-4">
              <NewsItems currentItems={dataFromPTP} />
            </div>
          )}

          {/* PAGINATION BLOCK STARTS */}
          {((asPath === "/international-activity/programs-trainings-projects")
            && (totalNewsAmountPTP > newsPerPage)) && (
              <Pagination
                bool="programsTrainingsProjectsBool"
                totalNewsAmount={totalNewsAmountPTP}
                sendDataToParent={updateDataFromPTP}
              />
            )}
          {/* PAGINATION BLOCK ENDS */}
          {/* PAGE ENDS "/international-activity/programs-trainings-projects" */}
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}

    </>
  )
}


export default InternationalActivityPage;

export async function getStaticPaths() {
  const query = slugCurrent('international-activity');

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
  const internationalActivityPageData = await client.fetch(chapterPageQuery('international-activity', slug));

  const totalNewsAmountAcadMobil = await client.fetch(
    `count(*[_type == "news" && academicMobilityBool])`
  );
  const initArrAcadMobil = await client.fetch(
    `*[_type == "news" && academicMobilityBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const totalNewsAmountIntPractOfStudents = await client.fetch(
    `count(*[_type == "news" && intPractOfStudentsBool])`
  );
  const initArrIntPractOfStudents = await client.fetch(
    `*[_type == "news" && intPractOfStudentsBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const totalNewsAmountIntInternship = await client.fetch(
    `count(*[_type == "news" && intInternshipBool])`
  );
  const initArrIntInternship = await client.fetch(
    `*[_type == "news" && intInternshipBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const totalNewsAmountECF = await client.fetch(
    `count(*[_type == "news" && eventsConferencesForumsBool])`
  );
  const initArrECF = await client.fetch(
    `*[_type == "news" && eventsConferencesForumsBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const totalNewsAmountPTP = await client.fetch(
    `count(*[_type == "news" && programsTrainingsProjectsBool])`
  );
  const initArrPTP = await client.fetch(
    `*[_type == "news" && programsTrainingsProjectsBool] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      internationalActivityPageData,
      totalNewsAmountAcadMobil,
      initArrAcadMobil,
      totalNewsAmountIntPractOfStudents,
      initArrIntPractOfStudents,
      totalNewsAmountIntInternship,
      initArrIntInternship,
      totalNewsAmountECF,
      initArrECF,
      totalNewsAmountPTP,
      initArrPTP,
      mainMenuQO,
    },
  };
}