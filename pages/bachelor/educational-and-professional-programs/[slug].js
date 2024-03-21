import { useEffect, useState } from 'react'
import Head from 'next/head'

// Client connection
import { menuItems } from 'components/Header/menuItems';
import { client } from "lib/client";
import { mainMenuQueriesObjCreator, chapterItemQuery, slugCurrent } from 'lib/queries';
import { menuCreator, menuItemsMerger } from 'lib/menuCreator';

// Components
import Header from 'components/Header/Header';
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from 'components/PageContentSection/PageContentSection';
import GuarantorsList from 'components/GuarantorsList/GuarantorsList';
import ReviewsList from 'components/ReviewsList/ReviewsList';


const BachelorPPPage = ({ bachelorEPPPage, mainMenuQO, guarantorsList }) => {

  const { title, slug, metaDescription } = bachelorEPPPage;;

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
  }, [bachelorEPPPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Бакалавру"
        pageTitle="Освітньо-професійні програми"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

      <PageContentSection data={bachelorEPPPage} />

      {slug.current === '/bachelor/educational-and-professional-programs/programs-and-guarantor' &&
        <GuarantorsList personList={guarantorsList} />
      }
      {slug.current === '/bachelor/educational-and-professional-programs/reviews' &&
        <ReviewsList personList={guarantorsList} />
      }
    </>
  )
}


export default BachelorPPPage;

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

  const bachelorEPPPage = await client.fetch(
    `${chapterItemQuery('bachelor-epp', `/bachelor/educational-and-professional-programs/${slug}`)}`
  );

  const guarantorsList = await client.fetch(`*[_type == 'person' && edGuaranteeLevel == 'перший']`);
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      bachelorEPPPage,
      mainMenuQO,
      guarantorsList,
    }
  }
}