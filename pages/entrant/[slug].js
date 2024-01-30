import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// Client connection
import { client, urlFor } from "lib/client";

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
// import Pagination from "components/Pagination/Pagination";
import LightBoxCustom from "../../components/LightboxCustom/LightBoxCustom";
import NewPagination from "components/Pagination/NewPagination";

const schoolsCooperationBool = "schoolsCooperationBool";
const studentOlympiadsBool = "studentOlympiadsBool";
const studHonorsBool = "studHonorsBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------
const EntrantsPage = ({
  entrantsPage,
  mainMenuQO,
  totalNewsAmountSchoolsCooperation,
  totalNewsAmountStudentOlympiads,
  totalNewsAmountStudHonors,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [imgArr, setImgArr] = useState();

  const { title, slug, studentsHonors, metaDescription } = entrantsPage;

  const closeGallery = (state) => {
    setOpen(state);
  };

  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();
  const [newsBool, setNewsBool] = useState();
  const [totalNewsAmount, setTotalNewsAmount] = useState();

  useEffect(() => {
    async function getData(page) {
      let res;
      if (slug.current === "/entrant/schools-cooperation") {
        setNewsBool("schoolsCooperationBool");
        setTotalNewsAmount(totalNewsAmountSchoolsCooperation);
        res = await getPortion(page, "schoolsCooperationBool");
      }
      if (slug.current === "/entrant/student-olympiads") {
        setNewsBool("studentOlympiadsBool");
        setTotalNewsAmount(totalNewsAmountStudentOlympiads);
        res = await getPortion(page, "studentOlympiadsBool");
      }
      if (slug.current === "/entrant/students-honors") {
        setNewsBool("studHonorsBool");
        setTotalNewsAmount(totalNewsAmountStudHonors);
        res = await getPortion(page, "studHonorsBool");
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
    totalNewsAmountSchoolsCooperation,
    totalNewsAmountStudentOlympiads,
    totalNewsAmountStudHonors,
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

      {/* ======= Inner Page Team-Staff Section ======= */}
      {(slug.current === "/entrant/student-olympiads" ||
        slug.current === "/entrant/students-honors" ||
        slug.current === "/entrant/schools-cooperation") && (
        <section id="team" className="team">
          <div className="container">
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
      )}
      {/* ======= End Team-Staff Page Section ======= */}

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

  const totalNewsAmountStudentOlympiads = await client.fetch(
    `count(*[_type == "news" && ${studentOlympiadsBool}])`
  );

  const totalNewsAmountStudHonors = await client.fetch(
    `count(*[_type == "news" && ${studHonorsBool}])`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      entrantsPage,
      mainMenuQO,
      totalNewsAmountSchoolsCooperation,
      totalNewsAmountStudentOlympiads,
      totalNewsAmountStudHonors,
    },
  };
}
