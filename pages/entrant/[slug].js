import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/image";

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent, newsPerPage } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

import { urlFor } from "../../lib/client";

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';

// Other libs
import { Lightbox } from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import NewsItems from '@/components/NewsItems/NewsItems';
import Pagination from '@/components/Pagination/Pagination';

const schoolsCooperationBool = "schoolsCooperationBool";
const studentOlympiadsBool = "studentOlympiadsBool";


const EntrantsPage = ({ entrantsPage,
  totalNewsAmountSchoolsCooperation,
  initArrSchoolsCooperation,
  totalNewsAmountStudentOlympiads,
  initArrstudentOlympiads,
  mainMenuQO, }) => {

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [imgArr, setImgArr] = useState();

  const { title, slug, studentsHonors, schoolsCooperation, studentOlympiads, metaDescription } = entrantsPage;

  const [dataFromChildSchoolsCoop, setDataFromChildSchoolsCoop] = useState(initArrSchoolsCooperation);
  const updateDataFromChildSchoolsCoop = (data) => {
    setDataFromChildSchoolsCoop(data);
  };

  const [dataFromChildStudOlymp, setDataFromChildStudOlymp] = useState(initArrstudentOlympiads);
  const updateDataFromChildStudOlymp = (data) => {
    setDataFromChildStudOlymp(data);
  };

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

  }, [initArrSchoolsCooperation, initArrstudentOlympiads, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
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

      {newsForEntrants && <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
          </header>

          <div className="row gy-4">
            <NewsItems currentItems={newsForEntrants} />
          </div>

          {/* PAGINATION BLOCK STARTS */}
          {totalNewsAmountForEntrants > newsPerPage && (
            <Pagination
              bool={newsForEntrantsBool}
              totalNewsAmount={totalNewsAmountForEntrants}
              sendDataToParent={updateNewsForEntrants}
            />
          )}
          {/* PAGINATION BLOCK ENDS */}
        </div>
      </section>}

      {schoolsCooperation && <section id="team" className="team">
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
      </section>}

      {studentOlympiads && <section id="team" className="team">
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
      </section>}

      {studentsHonors && <section className="features">
        <div className="container text-justify">
          {studentsHonors.map(el => {

            const { honorsPerYear, year, _key } = el;

            // При такому коді реакт лімітує кількість ререндерів
            const galleryArray = honorsPerYear.map(el => { return { src: urlFor(el).url() } })

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
                        <div className='p-1' key={photo._key}>

                          <a href="#"
                            className="image-container"
                            style={{ position: "relative" }}

                            onClick={() => {
                              setSelectedIndex(idx);
                              setImgArr(galleryArray);
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

                          </a>
                        </div>
                      )
                    })}

                  </div>
                </div>

              </div>

            )
          })}
        </div>
      </section>}

      <Lightbox
        index={selectedIndex}
        open={open}
        close={() => setOpen(false)}
        slides={imgArr}
      />

    </>
  )
}


export default EntrantsPage;

export async function getStaticPaths() {
  const query = slugCurrent('entrant');

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
  const entrantsPage = await client.fetch(chapterPageQuery('entrant', slug));

  const totalNewsAmountSchoolsCooperation = await client.fetch(
    `count(*[_type == "news" && ${schoolsCooperationBool}])`
  );
  const initArrSchoolsCooperation = await client.fetch(
    `*[_type == "news" && ${schoolsCooperationBool}] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  const totalNewsAmountStudentOlympiads = await client.fetch(
    `count(*[_type == "news" && ${studentOlympiadsBool}])`
  );
  const initArrstudentOlympiads = await client.fetch(
    `*[_type == "news" && ${studentOlympiadsBool}] | order(publishedDate desc) [0...${newsPerPage}]`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      entrantsPage,
      totalNewsAmountSchoolsCooperation,
      initArrSchoolsCooperation,
      totalNewsAmountStudentOlympiads,
      initArrstudentOlympiads,
      mainMenuQO,
    }
  }
}