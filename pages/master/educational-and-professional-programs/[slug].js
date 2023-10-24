import { useEffect, useState } from 'react'
import Head from 'next/head'

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterItemQuery, slugCurrent } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';
import GuarantorsList from '@/components/GuarantorsList/GuarantorsList';


const MasterPPPage = ({ masterEPPPage, mainMenuQO }) => {

  const { title, slug, metaDescription, filteredPerson } = masterEPPPage;

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
  }, [masterEPPPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Магістру"
        pageTitle="Освітньо-професійні програми"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={masterEPPPage} />

      {/* Тут має бути компонент зі списком гарантів */}
      {/* ... */}
      < GuarantorsList personList={filteredPerson} />
    </>
  )
}


export default MasterPPPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent('bachelor'));

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

  const masterEPPPage = await client.fetch(
    `${chapterItemQuery('master-epp', `/master/educational-and-professional-programs/${slug}`)}
    {..., 'filteredPerson': *[_type == 'person' && _id in ^.personReferences[]._ref]}`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      masterEPPPage,
      mainMenuQO,
    }
  }
}