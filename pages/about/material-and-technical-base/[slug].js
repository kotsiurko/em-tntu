import { useEffect, useState } from "react";
import Head from "next/head";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  chapterItemQuery,
  slugCurrent,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";


const newsBool = "eduLabsBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const AboutMTBPage = ({ aboutMTBPage, totalNewsAmount, mainMenuQO }) => {

  const { title, slug, metaDescription } = aboutMTBPage;

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [aboutMTBPage, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Матеріально-технічна база"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <section className="features my-personal container">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

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
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      aboutMTBPage,
      totalNewsAmount,
      mainMenuQO,
    },
  };
}
