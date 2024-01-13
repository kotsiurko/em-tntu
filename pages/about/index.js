import { useEffect, useState } from "react";
import Head from "next/head";

// Client connection
import { menuItems } from "@/components/Header/menuItems";
import { client } from "@/lib/client";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
} from "@/lib/queries";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";

// Components
import Header from "@/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import IndexPageWithLinks from "@/components/IndexPageWithLinks/IndexPageWithLinks";

const AboutPage = ({ mainMenuQO }) => {
  // const { title, slug, metaDescription } = aboutPage;

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  const title = "Про кафедру";

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [mainMenuQO]);

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content="metaDescription" />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs chapterTitle={title} pageTitle={title} pageUrl="/about" />

      {/* Page Content */}
      <IndexPageWithLinks
        title={"Про кафедру"}
        list={mainMenuArr[0].children}
      />
    </>
  );
};

export default AboutPage;

export async function getStaticProps() {
  // const aboutPage = await client.fetch(chapterPageQuery("about", slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      // aboutPage,
      mainMenuQO,
    },
  };
}
