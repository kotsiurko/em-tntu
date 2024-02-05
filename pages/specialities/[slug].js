import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// Client connection
import { client, clientConfig } from "lib/client";
import { urlFor } from "lib/client";

import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
  newsPerPage,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { getPortion } from "lib/helpers";

import BlockContent from "@sanity/block-content-to-react";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";

const newsBool = "nonFormalEducationBool";

const SpecialitiesPage = ({
  specialitiesPage,
  totalNewsAmount,
  mainMenuQO,
}) => {
  const { title, slug, nonFormalEducation, alumni, metaDescription } =
    specialitiesPage;

  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();

  useEffect(() => {
    if (router.asPath.includes("?page=")) {
      // розрізаю стрічку адреси пополам і дістаю з неї праву частину
      const pageNum = parseInt(router.asPath.split("?page=")[1]);
      setCurrPage(pageNum);
      getData(pageNum);
    } else {
      setCurrPage(1);
      getData(1);
    }
  }, [router.asPath]);

  async function getData(page) {
    const res = await getPortion(page, newsBool);
    setResultQuery(res);
  }

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [mainMenuQO]);

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
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={specialitiesPage} />

      {nonFormalEducation && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Події розділу</p>
            </header>

            <div className="row gy-4">
              <NewsItems currentItems={resultQuery} />
            </div>

            {/* PAGINATION BLOCK STARTS */}
            {totalNewsAmount > newsPerPage && (
              <NewPagination
                totalNewsAmount={totalNewsAmount}
                currPage={currPage}
                setResultQuery={setResultQuery}
                setCurrPage={setCurrPage}
                newsBool={newsBool}
              />
            )}
            {/* PAGINATION BLOCK ENDS */}
          </div>
        </section>
      )}

      {alumni && (
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Наші випускники</p>
            </header>

            <div className="row gy-4">
              {alumni.map((el) => {
                const { name, photo, body, _key } = el;

                return (
                  <div
                    className="col-lg-6 d-flex align-items-stretch"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    key={_key}
                  >
                    <div className="member news">
                      <div className="position-relative">
                        <Image
                          src={urlFor(photo).url()}
                          className="img-fluid"
                          alt={photo.caption}
                          width={440}
                          height={280}
                        />
                      </div>
                      <div className="member-info news">
                        <h4>{name}</h4>
                        {/* <p className="publishDate">Опубліковано: {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}</p> */}
                        {/* <p>{newsItemBodyShort}</p> */}
                        <BlockContent
                          blocks={body}
                          projectId={clientConfig.projectId}
                          dataset={clientConfig.dataset}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SpecialitiesPage;

export async function getStaticPaths() {
  const query = slugCurrent("specialities");

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
  const specialitiesPage = await client.fetch(
    chapterPageQuery("specialities", slug)
  );
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  if (slug === "stakeholders") {
    return {
      redirect: {
        destination: "/specialities/stakeholders/principles",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  return {
    props: {
      specialitiesPage,
      totalNewsAmount,
      mainMenuQO,
    },
  };
}
