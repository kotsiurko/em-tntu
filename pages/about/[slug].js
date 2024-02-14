import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

// Client connection
import { menuItems } from "components/Header/menuItems";
import { client } from "lib/client";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import DownloadLinkBtn from "components/DownloadLinkBtn/DownloadLinkBtn";
import AboutContacts from "components/AboutContacts/AboutContacts";
import DocsViewer from "components/DocsViewer/DocsViewer";

const AboutPage = ({ aboutPage, mainMenuQO }) => {
  console.log('aboutPage :>> ', aboutPage);
  const { title, slug, metaDescription, contacts, provision } = aboutPage;
  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [aboutPage, mainMenuQO]);

  const [isOPPOpen, setIsOPPOpen] = useState(false);
  const [opp_URL, setOpp_URL] = useState();

  const handleProgramClick = (edProgURL) => {
    if (isOPPOpen === false && opp_URL !== edProgURL) {
      setIsOPPOpen(true);
      setOpp_URL(edProgURL);
    }
    if (isOPPOpen === true && opp_URL === edProgURL) {
      setIsOPPOpen(false);
      setOpp_URL(null);
    }
    if (isOPPOpen === true && opp_URL !== edProgURL) {
      setIsOPPOpen(true);
      setOpp_URL(edProgURL);
    }
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

      {/* Page Content */}
      <PageContentSection data={aboutPage} />


      {slug.current === "/about/strategy" &&
        <DownloadLinkBtn href={aboutPage.docURL} />
      }

      {slug.current === "/about/contacts" &&
        <AboutContacts data={contacts} />
      }

      {slug.current === '/about/provision' &&
        <section className="features guaranors">
          <div className="container aos-init aos-animate" data-aos="fade-up">
            {provision.map(el => {
              const { provisionTitle, provisionUrl, _key } = el;
              return (
                // <p key={_key}>{provisionTitle}</p>
                <div
                  className="col-md-12 m-2"
                  data-aos="zoom-out"
                  data-aos-delay="100"
                  key={_key}
                >
                  <div className="feature-box d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <Link href={provisionUrl}>
                        <i className="bi bi-cloud-download"></i>
                      </Link>
                      <h3 style={{ maxWidth: 1080 }}>{provisionTitle}</h3>
                    </div>

                    <button
                      onClick={() => handleProgramClick(provisionUrl)}
                      style={{ width: 120 }}
                    >
                      {((isOPPOpen && opp_URL !== provisionUrl) ||
                        !isOPPOpen) && <>Переглянути</>}
                      {isOPPOpen && opp_URL === provisionUrl && <>Закрити</>}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      }

      {isOPPOpen && <DocsViewer docURL={opp_URL} />}
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
      mainMenuQO,
    },
  };
}
