import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  chapterItemQuery,
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

const newsBool = "eduLabsBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const eduLabsPage = ({
  // aboutMTBPage,
  // totalNewsAmount,
  mainMenuQO,
}) => {
  // const { title, slug, metaDescription } = aboutMTBPage;

  // const router = useRouter();

  // const [resultQuery, setResultQuery] = useState();
  // const [currPage, setCurrPage] = useState();

  // useEffect(() => {
  //   if (router.asPath.includes("?page=")) {
  //     // розрізаю стрічку адреси пополам і дістаю з неї праву частину
  //     const pageNum = parseInt(router.asPath.split("?page=")[1]);
  //     setCurrPage(pageNum);
  //     getData(pageNum);
  //   } else {
  //     setCurrPage(1);
  //     getData(1);
  //   }
  // }, [router.asPath]);

  // async function getData(page) {
  //   const res = await getPortion(page, newsBool);
  //   setResultQuery(res);
  // }

  // // MENU FORMATION PART ==============================================

  // const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  // useEffect(() => {
  //   const menuObj = menuItemsMerger(menuItems, mainMenuQO);

  //   setMainMenuArr((prevState) => {
  //     if (prevState) {
  //       return menuCreator(menuObj, prevState);
  //     }
  //   });
  // }, [aboutMTBPage, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <p>Hello</p>
    </>
  );
};

export default eduLabsPage;

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
  // const aboutMTBPage = await client.fetch(
  //   chapterItemQuery("about-mtb", `/about/material-and-technical-base/${slug}`)
  // );
  // const totalNewsAmount = await client.fetch(
  //   `count(*[_type == "news" && ${newsBool}])`
  // );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      // aboutMTBPage,
      // totalNewsAmount,
      mainMenuQO,
    },
  };
}
