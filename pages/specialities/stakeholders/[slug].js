import { useState, useEffect } from "react";
import Head from 'next/head'

// Client connection
import { menuItems } from 'components/Header/menuItems';
import { client } from "lib/client";
import { mainMenuQueriesObjCreator, chapterItemQuery, slugCurrent } from 'lib/queries';
import { menuCreator, menuItemsMerger } from 'lib/menuCreator';

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";



const StakeholdersItemArticle = ({ stakeholdersPage, mainMenuQO }) => {

  const { title, slug, metaDescription } = stakeholdersPage;

  // MENU FORMATION PART ==============================================
  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {

    const menuObj = menuItemsMerger(
      menuItems,
      mainMenuQO,
    )

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(
          menuObj,
          prevState,
        )
      }
    });
  }, [stakeholdersPage, mainMenuQO]);
  // MENU FORMATION PART ENDS =========================================


  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Спеціальності"
        pageTitle="Наші стейкхолдери"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <PageContentSection data={stakeholdersPage} />
    </>
  )
}


export default StakeholdersItemArticle;

export async function getStaticPaths() {
  const newsArr = await client.fetch(slugCurrent("stakeholders"));

  const paths = newsArr.map((newsItem) => ({
    params: {
      slug: newsItem.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {

  const stakeholdersPage = await client.fetch(chapterItemQuery("specialities-sh", `/specialities/stakeholders/${slug}`));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      stakeholdersPage,
      mainMenuQO,
    }
  }
}