import Head from "next/head";

// Client connection
import { client } from "lib/client";

// Helpers
import { chapterItemQuery, slugCurrent } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";

const newsBool = "eduLabsBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const AboutMTBPage = ({ aboutMTBPage }) => {
  const { title, slug, metaDescription } = aboutMTBPage;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Матеріально-технічна база"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      {/* < !-- ======= Features Section ======= --> */}
      {slug.current !==
        "/about/material-and-technical-base/educational-labs" && (
        <PageContentSection data={aboutMTBPage} />
      )}
    </>
  );
};

export default AboutMTBPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent("about-mtb"));
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
  const aboutMTBPage = await client.fetch(
    chapterItemQuery("about-mtb", `/about/material-and-technical-base/${slug}`)
  );

  return {
    props: {
      aboutMTBPage,
    },
  };
}
