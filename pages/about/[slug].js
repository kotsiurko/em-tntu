import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Client connection
import { menuItems } from "components/Header/menuItems";
import { client } from "lib/client";
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
import NewPagination from "components/Pagination/NewPagination";
import DownloadLinkBtn from "components/DownloadLinkBtn/DownloadLinkBtn";
import AboutContacts from "components/AboutContacts/AboutContacts";
import DocsViewer from "components/DocsViewer/DocsViewer";

const AboutPage = ({ aboutPage, totalNewsAmountprofDevel, mainMenuQO }) => {
  // console.log('aboutPage :>> ', aboutPage);
  const { title, slug, metaDescription, contacts, provision } = aboutPage;

  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();
  const [newsBool, setNewsBool] = useState();
  const [totalNewsAmount, setTotalNewsAmount] = useState();

  // profDevelBool
  useEffect(() => {
    async function getData(page) {
      let res;
      if (slug.current === "/about/professional-development") {
        setNewsBool("profDevelBool");
        setTotalNewsAmount(totalNewsAmountprofDevel);
        res = await getPortion(page, "profDevelBool");
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
  }, [router.asPath, slug, totalNewsAmountprofDevel]);

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [aboutPage, mainMenuQO]);

  const [openedDocIndex, setOpenedDocIndex] = useState(null);

  const handleProgramClick = (index) => {
    setOpenedDocIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

      {/* Page Content */}
      <PageContentSection data={aboutPage} />

      {/* ======= Inner Page Team-Staff Section ======= */}
      {slug.current === "/about/professional-development" && (
        <section className="features my-personal">
          <div className="row feature-icons">
            <h3>Події розділу</h3>
          </div>
        </section>
      )}
      {slug.current === "/about/professional-development" && (
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

      {slug.current === "/about/strategy" && (
        <DownloadLinkBtn href={aboutPage.docURL} />
      )}

      {slug.current === "/about/contacts" && <AboutContacts data={contacts} />}

      {slug.current === "/about/provision" && (
        <section className="features guaranors">
          <div
            className="container aos-init aos-animate py-4"
            data-aos="fade-up"
          >
            {provision.map((el, index) => {
              const { provisionTitle, provisionUrl, _key } = el;
              const isOpen = openedDocIndex === index;

              return (
                <div className="col-md-12 my-2" key={_key}>
                  <div className="feature-box d-flex align-items-center justify-content-between py-2">
                    <div className="d-flex align-items-center">
                      <Link href={provisionUrl}>
                        <i
                          className="bi bi-cloud-download"
                          style={{ fontSize: 16 }}
                        ></i>
                      </Link>
                      <h3 style={{ maxWidth: 1080 }}>{provisionTitle}</h3>
                    </div>
                    <button
                      style={{ width: 120 }}
                      onClick={() => handleProgramClick(index)}
                    >
                      {isOpen ? "Закрити" : "Переглянути"}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="mt-4">
                      <DocsViewer docURL={provisionUrl} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default AboutPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent("about"));

  const paths = pages.map((about) => ({
    params: {
      slug: about.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  // console.log("slug :>> ", slug);
  const aboutPage = await client.fetch(chapterPageQuery("about", slug));

  const totalNewsAmountprofDevel = await client.fetch(
    `count(*[_type == "news" && profDevelBool])`
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  if (slug === "material-and-technical-base") {
    return {
      redirect: {
        destination: "/about/material-and-technical-base/university-base",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  return {
    props: {
      aboutPage,
      totalNewsAmountprofDevel,
      mainMenuQO,
    },
  };
}
