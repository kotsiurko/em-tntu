import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

// Client connection
import { client } from "lib/client";
import { chapterPageQuery, slugCurrent } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import DownloadLinkBtn from "components/DownloadLinkBtn/DownloadLinkBtn";
import AboutContacts from "components/AboutContacts/AboutContacts";
import DocsViewer from "components/DocsViewer/DocsViewer";

const AboutPage = ({ aboutPage }) => {
  const { title, slug, metaDescription, contacts, provision } = aboutPage;

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

      <Header />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={aboutPage} />

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
  const aboutPage = await client.fetch(chapterPageQuery("about", slug));

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
    },
  };
}
