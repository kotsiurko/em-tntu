import { useEffect, useState } from 'react'
import Head from 'next/head'

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';


const InternationalActivityPage = ({
  referencesData,
  mainMenuQO,
}) => {

  const {
    title,
    slug,
  } = referencesData;

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referencesData, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Посилання"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <PageContentSection data={referencesData} />

    </>
  )
}


export default InternationalActivityPage;

export async function getStaticPaths() {
  const query = slugCurrent('references');

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
  const referencesData = await client.fetch(chapterPageQuery('references', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      referencesData,
      mainMenuQO,
    }
  }
}