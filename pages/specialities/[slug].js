import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

// Client connection
import { menuItems } from "@/components/Header/menuItems";
import { client, clientConfig } from "@/lib/client";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
  newsPerPage,
} from "@/lib/queries";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";

import { urlFor } from "../../lib/client";

import BlockContent from "@sanity/block-content-to-react";

// Components
import Header from "@/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "@/components/PageContentSection/PageContentSection";
import NewsItems from "@/components/NewsItems/NewsItems";
import Pagination from "@/components/Pagination/Pagination";

const newsBool = "nonFormalEducationBool";

const SpecialitiesPage = ({
  specialitiesPage,
  totalNewsAmount,
  initArr,
  mainMenuQO,
}) => {
  const { title, slug, nonFormalEducation, alumni, metaDescription } =
    specialitiesPage;

  const [dataFromChild, setDataFromChild] = useState(initArr);

  const updateDataFromChild = (data) => {
    setDataFromChild(data);
  };

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [initArr, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
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
  const initArr = await client.fetch(
    `*[_type == "news" && ${newsBool}] | order(publishedDate desc) [0...${newsPerPage}]`
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
      initArr,
      mainMenuQO,
    },
  };
}
