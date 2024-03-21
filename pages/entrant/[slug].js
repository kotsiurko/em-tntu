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

  // -----------------------------------

  const [selectedYear, setSelectedYear] = useState();

  const handleYearClick = (year) => {
    if (selectedYear === year) {
      setSelectedYear(null); // Закриття акордеону при повторному кліку
    } else {
      setSelectedYear(year);
    }
    setSelectedIndex(null); // Скидання вибору зображення при зміні року
  };

  const handleImageClick = (idx, honorsPerYear) => {
    setSelectedIndex(idx);
    setImgArr(honorsPerYear);
    setOpen(true);
  };

  // -----------------------------------

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

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

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
        <section id="faq" className="faq">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Галерея відзнак студентів</p>
            </header>

            <div className="row">
              <div className="col-lg-12">
                <div className="accordion accordion-flush" id="faqlist">
                  {studentsHonors.map((el, index) => (
                    <div className="accordion-item" key={el._key}>
                      <h2 className="accordion-header">
                        <button
                          className={
                            index === 0
                              ? `accordion-button`
                              : `accordion-button collapsed`
                          }
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-content-${el._key}`}
                          onClick={() => handleYearClick(el.year)}
                        >
                          {el.year}
                        </button>
                      </h2>
                      <div
                        id={`faq-content-${el._key}`}
                        className={
                          index === 0
                            ? "accordion-collapse collapse show"
                            : "accordion-collapse collapse"
                        }
                        data-bs-parent="#faqlist"
                      >
                        <div className="accordion-body">
                          <div className="row">
                            <div className="d-flex flex-wrap justify-content-center align-items-center">
                              {el.honorsPerYear.map((photo, idx) => {
                                const imgLink = urlFor(photo).url();

                                return (
                                  <div className="p-1" key={photo._key}>
                                    <div
                                      style={{
                                        position: "relative",
                                        cursor: "pointer",
                                      }}
                                      onClick={() =>
                                        handleImageClick(idx, el.honorsPerYear)
                                      }
                                    >
                                      <Image
                                        src={imgLink}
                                        className="img-thumbnail"
                                        alt={photo.caption}
                                        height={280}
                                        width={200}
                                        priority
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
