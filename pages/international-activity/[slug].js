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


  const [dataFromChild, setDataFromChild] = useState([]);
  const [dataFromChildAmount, setDataFromChildAmount] = useState();
  const [dataFromChildBool, setDataFromChildBool] = useState('');
  const updateDataFromChild = (data) => {
    setDataFromChild(data);
  }

  const {
    title,
    slug,
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

    // ------------------------------------------------------------------
    if (asPath === "/international-activity/academic-mobility") {
      setDataFromChild(initArrAcadMobil);
      setDataFromChildAmount(totalNewsAmountAcadMobil);
      setDataFromChildBool("academicMobilityBool");
    }
    if (asPath === "/international-activity/international-practice-of-students") {
      setDataFromChild(initArrIntPractOfStudents);
      setDataFromChildAmount(totalNewsAmountIntPractOfStudents);
      setDataFromChildBool("intPractOfStudentsBool");
    }
    if (asPath === "/international-activity/international-internship") {
      setDataFromChild(initArrIntInternship);
      setDataFromChildAmount(totalNewsAmountIntInternship);
      setDataFromChildBool("intInternshipBool");
    }
    if (asPath === "/international-activity/events-conferences-forums") {
      setDataFromChild(initArrECF);
      setDataFromChildAmount(totalNewsAmountECF);
      setDataFromChildBool("eventsConferencesForumsBool");
    }
    if (asPath === "/international-activity/programs-trainings-projects") {
      setDataFromChild(initArrPTP);
      setDataFromChildAmount(totalNewsAmountPTP);
      setDataFromChildBool("programsTrainingsProjectsBool");
    }
    // ------------------------------------------------------------------



  }, [asPath, initArrAcadMobil, initArrECF, initArrIntInternship, initArrIntPractOfStudents, initArrPTP, internationalActivityPageData, mainMenuQO, totalNewsAmountAcadMobil, totalNewsAmountECF, totalNewsAmountIntInternship, totalNewsAmountIntPractOfStudents, totalNewsAmountPTP]);

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