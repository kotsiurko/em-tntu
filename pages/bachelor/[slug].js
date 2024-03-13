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
import DocsViewer from "components/DocsViewer/DocsViewer";
import CallSchedule from "components/CallSchedule/CallSchedule";
import WeeksSchedule from "components/WeeksSchedule/WeeksSchedule";
import Practices from "components/Practices/Practices";
import NewPagination from "components/Pagination/NewPagination";
import EduPlanList from "../../components/EduPlanList/EduPlanList";
import TitleAndLinkList from "../../components/TitleAndLinkList/TitleAndLinkList";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const BachelorPage = ({
  bachelorPage,
  totalNewsAmountNormative,
  totalNewsAmountElective,
  totalNewsAcHonestyAmount,
  mainMenuQO,
}) => {
  // console.log('bachelorPage :>> ', bachelorPage);

  const {
    title,
    slug,
    // academicHonesty,
    metaDescription,
    blankList,
    docURL,
    docsForBachThesisList,
    lessonDuration,
    callSchedule,
    semesterPeriod,
    weeksAmount,
    semesterStarts,
    eduPlanList,
    bachPracticesList,
    eduPlansList,
  } = bachelorPage;

  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();

  useEffect(() => {
    if (
      slug.current === "/bachelor/academic-honesty" ||
      slug.current === "/bachelor/elective-disciplines" ||
      slug.current === "/bachelor/normative-disciplines"
    ) {
      async function getData(page, newsBool) {
        const res = await getPortion(page, newsBool);
        setResultQuery(res);
      }

      if (router.asPath.includes("?page=")) {
        const pageNum = parseInt(router.asPath.split("?page=")[1]);
        setCurrPage(pageNum);
        getData(pageNum, getNewsBool(slug.current));
      } else {
        setCurrPage(1);
        getData(1, getNewsBool(slug.current));
      }
    }
  }, [router.asPath, slug]);

  const getNewsBool = (currentSlug) => {
    switch (currentSlug) {
      case "/bachelor/academic-honesty":
        return "bachelorAcademicHonestyBool";
      case "/bachelor/elective-disciplines":
        return "bachelorElectiveDiscBool";
      case "/bachelor/normative-disciplines":
        return "bachelorNormativeDiscBool";
      default:
        return "";
    }
  };

  const getTotalNewsAmount = (currentSlug) => {
    switch (currentSlug) {
      case "/bachelor/academic-honesty":
        return totalNewsAcHonestyAmount;
      case "/bachelor/elective-disciplines":
        return totalNewsAmountElective;
      case "/bachelor/normative-disciplines":
        return totalNewsAmountNormative;
      default:
        return 0;
    }
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
        chapterTitle="Бакалавру"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {slug.current === "/bachelor/practices" && (
        <Practices prList={bachPracticesList} />
      )}

      {/* Е-навчання */}
      {slug.current === "/bachelor/e-learning" && (
        <section className="services">
          <div className="container">
            <div class="row gy-4">
              <div class="col-lg-12 col-md-6 aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                <div class="service-box blue" style={{ padding: 15 }} >
                  <h3>ATutor</h3>
                  <a href="#" class="read-more"><span>Сервер дистанційного навчання ТНТУ імені Івана Пулюя</span> <i class="bi bi-arrow-right"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section >
      )}

      {/* Page Content */}
      {slug.current !== "/bachelor/educational-plans" && (
        <PageContentSection data={bachelorPage} />
      )}

      {/* Методичні рекомендації до курсових робіт */}
      {slug.current ===
        "/bachelor/methodological-recommendations-for-courseworks" &&
        blankList && (
          <section id="team" className="team">
            <div className="container">
              <header className="section-header">
                <p className="fs-4">
                  Документи для курсового проєктування. Бланки
                </p>
              </header>
              <TitleAndLinkList list={blankList} />
            </div>
          </section>
        )}

      {/* В МАГІСТРА цієї секції немає. звідти йде перенаправлення на сторінку з інформацією в бакалаврів */}
      {slug.current === "/bachelor/consultations" && (
        <DocsViewer docURL={docURL} />
      )}

      {/* Виконання кваліфікаційних робіт бакалаврів */}
      {slug.current ===
        "/bachelor/performance-of-qualification-works-of-bachelors" &&
        docsForBachThesisList && (
          <section id="team" className="team">
            <div className="container">
              <header className="section-header">
                <p className="fs-4">
                  Необхідні документи для виконання кваліфікаційних робіт
                  бакалавра
                </p>
              </header>
              <TitleAndLinkList list={docsForBachThesisList} />
            </div>
          </section>
        )}

      {/* Графіки навчального процесу */}
      {slug.current === "/bachelor/schedules-of-educational-process" && (
        <>
          <CallSchedule data={{ lessonDuration, callSchedule }} />
          <WeeksSchedule
            data={{ semesterPeriod, weeksAmount, semesterStarts }}
          />

          <header
            className="section-header"
            style={{ paddingBottom: 0, paddingTop: 60 }}
          >
            <p>Графіки освітнього процесу</p>
          </header>
          {/* eduPlanList */}
          {eduPlanList.map((el) => {
            const { eduPlanTitle, eduPlanURL, _key } = el;
            return (
              <div key={_key}>
                <header className="section-header">
                  <h5>{eduPlanTitle}</h5>
                </header>
                <DocsViewer docURL={eduPlanURL} />
              </div>
            );
          })}
        </>
      )}

      {slug.current === "/bachelor/academic-honesty" && (
        <section id="team" className="team">
          <div className="container">
            <header className="section-header">
              <p>Події розділу</p>
            </header>

            <div className="row gy-4">
              <NewsItems currentItems={resultQuery} />
            </div>

            {getTotalNewsAmount(slug.current) > newsPerPage && (
              <NewPagination
                totalNewsAmount={getTotalNewsAmount(slug.current)}
                currPage={currPage}
                setResultQuery={setResultQuery}
                setCurrPage={setCurrPage}
                newsBool={getNewsBool(slug.current)}
              />
            )}
          </div>
        </section>
      )}

      {/* сторінка НАВЧАЛЬНІ ПЛАНИ */}
      {slug.current === "/bachelor/educational-plans" && (
        <EduPlanList list={eduPlansList} />
      )}

    </>
  );
};

export default BachelorPage;

export async function getStaticPaths() {
  const query = slugCurrent("bachelor");

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
  const bachelorPage = await client.fetch(chapterPageQuery("bachelor", slug));

  const totalNewsAmountNormative = await client.fetch(
    `count(*[_type == "news" && bachelorNormativeDiscBool])`
  );
  const totalNewsAmountElective = await client.fetch(
    `count(*[_type == "news" && bachelorElectiveDiscBool])`
  );
  const totalNewsAcHonestyAmount = await client.fetch(
    `count(*[_type == "news" && bachelorAcademicHonestyBool])`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  if (slug === "educational-and-professional-programs") {
    return {
      redirect: {
        destination:
          "/bachelor/educational-and-professional-programs/programs-and-guarantor",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  return {
    props: {
      bachelorPage,
      totalNewsAmountNormative,
      totalNewsAmountElective,
      totalNewsAcHonestyAmount,
      mainMenuQO,
    },
  };
}
