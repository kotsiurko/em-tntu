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
import PageContentSection from "@/components/PageContentSection/PageContentSection";
import DownloadLinkBtn from "@/components/DownloadLinkBtn/DownloadLinkBtn";

const AboutPage = ({ aboutPage, mainMenuQO }) => {
  const { title, slug, metaDescription } = aboutPage;
  // console.log('slug :>> ', slug);
  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [aboutPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Про кафедру"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={aboutPage} />

      {slug.current === "/about/strategy" &&
        <DownloadLinkBtn href={aboutPage.docURL} />
      }
      {/* prop = docURL */}
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
  console.log("slug :>> ", slug);
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
