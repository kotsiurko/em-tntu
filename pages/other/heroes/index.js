import { useEffect, useState } from "react";
import Head from "next/head";

// Client connection
import { menuItems } from "components/Header/menuItems";
import { client } from "lib/client";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import HeroesList from "components/HeroesList/HeroesList";

const OtherPage = ({ chapterPage, mainMenuQO }) => {
  // console.log('chapterPage :>> ', chapterPage);
  const { title, slug, metaDescription, heroesList } = chapterPage;

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [chapterPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Війна"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>

      <PageContentSection data={chapterPage} />

      {/* ПОЛЕГЛІ ГЕРОЇ */}
      <HeroesList heroesList={heroesList} />
    </>
  );
};

export default OtherPage;

// export async function getStaticPaths() {
//   const query = slugCurrent("other");

//   const pages = await client.fetch(query);
//   const paths = pages.map((page) => ({
//     params: {
//       slug: page.slug.current,
//     },
//   }));
//   return {
//     paths,
//     fallback: "blocking",
//   };
// }

export async function getStaticProps() {
  // const chapterPage = await client.fetch(chapterPageQuery("other", slug));
  const chapterPage = await client.fetch(`*[_type == "other"][0]`);
  // `*[_type == "person"]
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      chapterPage,
      mainMenuQO,
    },
  };
}
