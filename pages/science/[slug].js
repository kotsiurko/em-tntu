import { useEffect, useState } from 'react'
import Head from 'next/head'

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent, newsQuery } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';
import SciPublTypes from '@/components/SciPublTypes/SciPublTypes';


const SciencePage = ({ chapterPage, mainMenuQO }) => {

  console.log('chapterPage :>> ', chapterPage);

  const { title, slug, metaDescription, sciPublTypes } = chapterPage;

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

  }, [chapterPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Наука"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {!sciPublTypes && <PageContentSection data={chapterPage} />}

      {/* {sciPublTypes && Компонент, що відображає сторінку із вкладками} */}
      {sciPublTypes && <SciPublTypes data={chapterPage} />}

    </>
  )
}



export default SciencePage;

export async function getStaticPaths() {
  const query = slugCurrent('science');

  const pages = await client.fetch(query);
  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {
  const chapterPage = await client.fetch(chapterPageQuery('science', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      chapterPage,
      mainMenuQO,
    }
  }
}
