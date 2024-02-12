import { useEffect, useState } from "react";
import Head from "next/head";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  slugCurrent,
  chapterItemQuery,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import { } from "lib/queries";

const LEConference = ({
  chapterConferencePage,
  mainMenuQO,
}) => {
  const { title, slug, metaDescription } = chapterConferencePage;

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

      {/* В хедер треба передавати вже сформований масив */}
      <Header mainMenuArr={mainMenuArr} />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Наука"
        pageTitle="Конференція “Світлотехніка й електроенергетика”"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <PageContentSection data={chapterConferencePage} />
    </>
  );
};

export default LEConference;

export async function getStaticPaths() {

  const pages = await client.fetch(slugCurrent("scienceLEConference"));
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
  const chapterConferencePage = await client.fetch(
    chapterItemQuery("scienceLEConference", `/science/conference-lighting-and-power-engineering/${slug}`)
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      chapterConferencePage,
      mainMenuQO,
    },
  };
}
