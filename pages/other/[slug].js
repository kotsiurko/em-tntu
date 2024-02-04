import { useEffect, useState } from "react";
import Head from "next/head";

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
import Image from "next/image";
import Link from "next/link";
import TextContent from "components/TextContent/TextContent";

const OtherPage = ({ chapterPage, mainMenuQO }) => {
  const { title, slug, metaDescription, heroesList } = chapterPage;

  // console.log('Other Page  :>> ', chapterPage);

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

      <PageContentSection data={chapterPage} />

      {/* ВАРІАНТ КОМПОНОВКИ №2 */}
      <section className="features my-personal">
        <div className="container" data-aos="fade-up">
          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons">
            {heroesList.map((heroPerson) => {
              const {
                heroName,
                heroSecondAndFatherName,
                heroImage,
                lifeYears,
                secondaryText,
                body,
                heroPublications,
                _key,
              } = heroPerson;
              return (
                <div key={_key} className="my-2">
                  <hr className="my-5" />
                  {/* <hr /> */}
                  {/* БЛОК З ФОТО ТА ПРЕДСТАВЛЕННЯМ */}
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <div className="col-xl-4 pt-2 px-2 d-flex">
                      <div
                        className="image-container"
                        style={{ position: "relative" }}
                      >
                        <Image
                          src={urlFor(heroImage).url()}
                          fill
                          // priority
                          className="img-fluid rounded image"
                          alt={`Full name`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>

                    <div className="col-xl-4 pt-2 px-2 d-flex justify-content-center align-items-center">
                      <div className="d-flex flex-column text-center">
                        <h3>
                          {heroName} <br /> {heroSecondAndFatherName}
                        </h3>
                        <p>{lifeYears}</p>
                        <p>{secondaryText}</p>
                      </div>
                    </div>
                  </div>

                  {/* ТЕКСТОВИЙ БЛОК */}
                  <div className="my-4 text-justify">
                    <TextContent data={body} />
                  </div>

                  {/* БЛОК НОВИН */}
                  <h4>Пов'язані новини у масмедіа</h4>
                  <hr className="my-2" />
                  <div className="row gx-0">
                    {heroPublications.map((heroPubl) => {
                      const {
                        heroPublTitle,
                        heroPublShortText,
                        heroPublSRC,
                        heroPublURL,
                        heroPublScreenshot,
                        _key,
                      } = heroPubl;
                      return (
                        <div
                          className="col-lg-6 d-flex align-items-stretch p-3"
                          key={_key}
                        >
                          <div className="member news gap-2">
                            <div className="position-relative">
                              <Image
                                src={urlFor(heroPublScreenshot).url()}
                                // src={`https://cdn.sanity.io/images/asnyakur/production/0884ab8625644d1a4f01a1b1249536a90536ff88-640x480.png`}
                                className="img-fluid image-fit"
                                // alt={mainPhoto.caption}
                                alt="some title"
                                sizes="(max-width: 768px) 100vw"
                                fill={true}
                              />
                            </div>
                            <div className="member-info news">
                              <Link href={heroPublURL}>
                                <h5>{heroPublTitle}</h5>
                              </Link>

                              <p className="mb-0">{heroPublShortText}</p>
                              <hr />
                              <div className="d-flex justify-content-between">
                                <Link href={heroPublURL}>
                                  <span className="publishDate">
                                    Джерело: {heroPublSRC}
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <!-- End Feature Icons --> */}
        </div>
      </section>
    </>
  );
};

export default OtherPage;

export async function getStaticPaths() {
  const query = slugCurrent("other");

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
  const chapterPage = await client.fetch(chapterPageQuery("other", slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      chapterPage,
      mainMenuQO,
    },
  };
}
