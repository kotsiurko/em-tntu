import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

// Client connection
import { menuItems } from "components/Header/menuItems";
import { client, urlFor } from "lib/client";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
  newsPerPage,
  paginationQuery,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import NewsItems from "components/NewsItems/NewsItems";
import Pagination from "components/Pagination/Pagination";
import LightBoxCustom from "components/LightBoxCustom/LightBoxCustom";

const schoolsCooperationBool = "schoolsCooperationBool";
const studentOlympiadsBool = "studentOlympiadsBool";
const studHonorsBool = "studHonorsBool";

const EntrantsPage = ({
  entrantsPage,
  totalNewsAmountSchoolsCooperation,
  initArrSchoolsCooperation,
  totalNewsAmountStudentOlympiads,
  initArrstudentOlympiads,
  totalNewsAmountStudHonors,
  initArrsStudHonors,
  mainMenuQO,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [imgArr, setImgArr] = useState();

  const {
    title,
    slug,
    newsForEntrants,
    schoolsCooperation,
    studentOlympiads,
    studentsHonors,
    metaDescription,
  } = entrantsPage;

  const closeGallery = (state) => {
    setOpen(state);
  };

  // schoolsCooperationBool
  const [dataFromChildSchoolsCoop, setDataFromChildSchoolsCoop] = useState(
    initArrSchoolsCooperation
  );
  const updateDataFromChildSchoolsCoop = (data) => {
    setDataFromChildSchoolsCoop(data);
  };

  // studentOlympiadsBool
  const [dataFromChildStudOlymp, setDataFromChildStudOlymp] = useState(
    initArrstudentOlympiads
  );
  const updateDataFromChildStudOlymp = (data) => {
    setDataFromChildStudOlymp(data);
  };

  // studHonorsBool
  const [dataFromChildStudHonors, setDataFromChildStudHonors] =
    useState(initArrsStudHonors);
  const updateDataFromChildStudHonors = (data) => {
    setDataFromChildStudHonors(data);
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
  }, [initArrSchoolsCooperation, initArrstudentOlympiads, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ `}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Абітурієнту"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={entrantsPage} />

      {schoolsCooperation && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Події розділу</p>
            </header>

            <div className="row gy-4">
              <NewsItems currentItems={dataFromChildSchoolsCoop} />
            </div>

            {/* PAGINATION BLOCK STARTS */}
            {totalNewsAmountSchoolsCooperation > newsPerPage && (
              <Pagination
                bool={schoolsCooperationBool}
                totalNewsAmount={totalNewsAmountSchoolsCooperation}
                sendDataToParent={updateDataFromChildSchoolsCoop}
              />
            )}
            {/* PAGINATION BLOCK ENDS */}
          </div>
        </section>
      )}

      {studentOlympiads && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Події розділу</p>
            </header>

            <div className="row gy-4">
              <NewsItems currentItems={dataFromChildStudOlymp} />
            </div>

            {/* PAGINATION BLOCK STARTS */}
            {totalNewsAmountStudentOlympiads > newsPerPage && (
              <Pagination
                bool={studentOlympiadsBool}
                totalNewsAmount={totalNewsAmountStudentOlympiads}
                sendDataToParent={updateDataFromChildStudOlymp}
              />
            )}
            {/* PAGINATION BLOCK ENDS */}
          </div>
        </section>
      )}

      {studentsHonors && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Події розділу</p>
            </header>

            <div className="row gy-4">
              <NewsItems currentItems={dataFromChildStudHonors} />
            </div>

            {/* PAGINATION BLOCK STARTS */}
            {totalNewsAmountStudentOlympiads > newsPerPage && (
              <Pagination
                bool={studHonorsBool}
                totalNewsAmount={totalNewsAmountStudHonors}
                sendDataToParent={updateDataFromChildStudHonors}
              />
            )}
            {/* PAGINATION BLOCK ENDS */}
          </div>
        </section>
      )}

      {studentsHonors && (
        <section className="features">
          <div className="container text-justify">
            {studentsHonors.map((el) => {
              const { honorsPerYear, year, _key } = el;

              return (
                <div key={_key}>
                  <header className="section-header">
                    <p>{year}</p>
                  </header>
                  <div className="row">
                    <div className="d-flex flex-wrap justify-content-center">
                      {honorsPerYear.map((photo, idx) => {
                        const imgLink = urlFor(photo).url();

                        return (
                          <div className="p-1" key={photo._key}>
                            <div
                              className="image-container"
                              style={{
                                position: "relative",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setSelectedIndex(idx);
                                setImgArr(honorsPerYear);
                                setOpen(true);
                              }}
                            >
                              <Image
                                src={imgLink}
                                className="img-thumbnail"
                                alt={photo.caption}
                                width={440}
                                height={280}
                                priority
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <LightBoxCustom
        imageGallery={imgArr}
        isOpen={open}
        closeGallery={closeGallery}
        index={selectedIndex}
      />
    </>
  );
};

export default EntrantsPage;

export async function getStaticPaths() {
  const query = slugCurrent("entrant");

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
  const entrantsPage = await client.fetch(chapterPageQuery("entrant", slug));

  const totalNewsAmountSchoolsCooperation = await client.fetch(
    `count(*[_type == "news" && ${schoolsCooperationBool}])`
  );
  const initArrSchoolsCooperation = await client.fetch(
    paginationQuery(0, newsPerPage, schoolsCooperationBool)
  );

  const totalNewsAmountStudentOlympiads = await client.fetch(
    `count(*[_type == "news" && ${studentOlympiadsBool}])`
  );
  const initArrstudentOlympiads = await client.fetch(
    paginationQuery(0, newsPerPage, studentOlympiadsBool)
  );

  const totalNewsAmountStudHonors = await client.fetch(
    `count(*[_type == "news" && ${studHonorsBool}])`
  );
  const initArrsStudHonors = await client.fetch(
    paginationQuery(0, newsPerPage, studHonorsBool)
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      entrantsPage,
      // totalNewsAmountForEntrants,
      // initArrNewsForEntrants,
      totalNewsAmountSchoolsCooperation,
      initArrSchoolsCooperation,
      totalNewsAmountStudentOlympiads,
      initArrstudentOlympiads,
      totalNewsAmountStudHonors,
      initArrsStudHonors,
      mainMenuQO,
    },
  };
}
