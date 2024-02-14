import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// Client connection
import { client, urlFor } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  chapterItemQuery,
  slugCurrent,
  newsPerPage,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { getPortion } from "lib/helpers";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";
import TeachingSubjectItems from "components/TeachingSubjectItems/TeachingSubjectItems";

const newsBool = "eduLabsBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const EduLabPage = ({
  eduLabPage,
  mainMenuQO,
  currSlug,
}) => {
  const { title, slug, metaDescription, labsList } = eduLabPage;
  console.log('eduLabPage :>> ', eduLabPage);
  console.log('currSlug :>> ', currSlug);

  // Відфільтрувати аудиторію за номером зі списку labsList
  // і витягую з нього об'єкт за допомогою [0]
  const currEduLab = labsList.filter(el => el.labNumber === currSlug)[0]
  const { labNumber, labTitle, labArea, labSittingPlaces, labChief, labChiefUrl, labDisciplines, labPhoto } = currEduLab;

  // // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [eduLabPage, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>{`${labNumber} – ${labTitle} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Матеріально-технічна база"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      {/* <EduLabsList labsList={labsList} /> */}
      <section className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>{labNumber} – {labTitle}</p>
          </header>

          {/* <div className="row gy-4">
            <p>Some info</p>
          </div> */}

          <div className="row gx-0">

            {labPhoto && <div className="col-xl-3 pt-2 px-2 d-flex aos-init aos-animate" data-aos="fade-right" data-aos-delay="100">
              <div
                className="image-container"
                style={{ position: "relative" }}
              >
                <Image
                  src={urlFor(labPhoto).url()}
                  fill
                  priority
                  className="img-fluid image rounded"
                  alt="Текст"
                />
              </div>

            </div>}

            <div className="col-xl-9 pt-2 px-2 d-flex">
              <div className="row align-self-start content text-justify">
                <div className="icon-box aos-init aos-animate" data-aos="fade-up">
                  <div>
                    {labArea && <p>Площа приміщення: {labArea}</p>}
                    {labSittingPlaces && <p>Кількість посадкових місць: {labSittingPlaces}</p>}
                    {labChief && <p>Відповідальна особа: <Link href={labChiefUrl}>{labChief}</Link></p>}
                    {labDisciplines && <>
                      <p className="mb-0">Закріплені навчальні дисципліни:</p>
                      <ul><TeachingSubjectItems list={labDisciplines} /></ul>
                    </>
                    }
                    <div>
                      <span></span>
                    </div>
                    <br />
                    <div>
                      <span></span><br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default EduLabPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent("about-mtb"));
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
  const eduLabPage = await client.fetch(
    chapterItemQuery(
      "about-mtb",
      `/about/material-and-technical-base/educational-labs`
    )
  );

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      eduLabPage,
      mainMenuQO,
      currSlug: slug,
    },
  };
}
