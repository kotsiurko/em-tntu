import { useEffect, useState } from 'react'
import Head from 'next/head'

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent, newsPerPage } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';
import NewsItems from '@/components/NewsItems/NewsItems';
import Pagination from '@/components/Pagination/Pagination';

const newsBool = "bachelorAcademicHonestyBool";

const BachelorPage = ({ bachelorPage, totalNewsAmount, initArr, mainMenuQO }) => {

  const { title, slug, academicHonesty, metaDescription } = bachelorPage;

  const [dataFromChild, setDataFromChild] = useState(initArr);

  const updateDataFromChild = (data) => {
    setDataFromChild(data);
  };

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
  }, [initArr, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content={metaDescription}
        />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Бакалавру"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={bachelorPage} />

      {academicHonesty && <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
          </header>

          <div className="row gy-4">
            <NewsItems currentItems={dataFromChild} />
          </div>

          {/* PAGINATION BLOCK STARTS */}
          {totalNewsAmount > newsPerPage && (
            <Pagination
              bool={newsBool}
              totalNewsAmount={totalNewsAmount}
              sendDataToParent={updateDataFromChild}
            />
          )}
          {/* PAGINATION BLOCK ENDS */}
        </div>
      </section>}
    </>
  )
}


export default BachelorPage;

export async function getStaticPaths() {
  const query = slugCurrent('bachelor');

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

  const bachelorPage = await client.fetch(chapterPageQuery('bachelor', slug));
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );
  const initArr = await client.fetch(
    `*[_type == "news" && ${newsBool}] | order(publishedDate desc) [0...${newsPerPage}]`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      bachelorPage,
      totalNewsAmount,
      initArr,
      mainMenuQO,
    }
  }
}