import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// Client connection
import { menuItems } from "components/Header/menuItems";
import { client, urlFor } from "lib/client";
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
import SciPublTypes from "components/SciPublTypes/SciPublTypes";

const SciencePage = ({ chapterPage, mainMenuQO }) => {
  const { title, slug, metaDescription, sciPublTypes, sciStudActiv } =
    chapterPage;

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
        chapterTitle="Наука"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {!sciPublTypes && <PageContentSection data={chapterPage} />}

      {/* {sciPublTypes && Компонент, що відображає сторінку із вкладками} */}
      {sciPublTypes && <SciPublTypes data={chapterPage} />}

      {slug.current === "/science/students-scientific-activity" && (
        <div>
          <section className="section">
            <div className="container">
              <header className="section-header">
                <p>Конференції</p>
              </header>
              {sciStudActiv.map((el) => {
                const { _key, sciStudActivItemTitle, itemPhoto, itemUrl } = el;
                return (
                  <div key={_key}>
                    <hr />
                    <Link href={itemUrl}>
                      <div
                        className="image-container"
                        style={{ position: "relative" }}
                      >
                        <Image
                          src={urlFor(itemPhoto).url()}
                          fill
                          className="img-fluid rounded image"
                          alt={sciStudActivItemTitle}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ maxHeight: 450 }}
                        />
                      </div>
                      <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <p>
                          <strong>{sciStudActivItemTitle}</strong>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SciencePage;

export async function getStaticPaths() {
  const query = slugCurrent("science");

  const pages = await client.fetch(query);
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
  const chapterPage = await client.fetch(chapterPageQuery("science", slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  if (slug === "conference-lighting-and-power-engineering") {
    return {
      redirect: {
        destination: "/science/conference-lighting-and-power-engineering/news",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  return {
    props: {
      chapterPage,
      mainMenuQO,
    },
  };
}
