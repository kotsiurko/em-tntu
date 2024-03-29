import { useEffect, useState } from "react";
import Head from "next/head";
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
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import TeachingSubjectItems from "components/TeachingSubjectItems/TeachingSubjectItems";
import LightBoxCustom from "components/LightboxCustom/LightBoxCustom";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const EduLabPage = ({ eduLabPage, mainMenuQO, currSlug }) => {
  const { title, slug, metaDescription, labsList } = eduLabPage;

  // Відфільтрувати аудиторію за номером зі списку labsList
  // і витягую з нього об'єкт за допомогою [0]
  const currEduLab = labsList.filter((el) => el.labNumber === currSlug)[0];
  const {
    labNumber,
    labTitle,
    labArea,
    labSittingPlaces,
    labChief,
    labChiefUrl,
    labDisciplines,
    lab3DTour,
    labGallery,
  } = currEduLab;
  // // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);
  const [open, setOpen] = useState(false);
  const closeGallery = (state) => {
    setOpen(state);
  };

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

      <section className="features my-personal container">
        <div className="row feature-icons">
          <h3>{labNumber} – {labTitle}</h3>
        </div>
      </section>

      {/* ======= Inner Page Team-Staff Section ======= */}
      {/* <EduLabsList labsList={labsList} /> */}
      <section className="team">
        <div className="container" data-aos="fade-up">
          {/* <header className="section-header">
            <p>
              {labNumber} – {labTitle}
            </p>
          </header> */}

          {/* <div className="row gy-4">
            <p>Some info</p>
          </div> */}

          <div className="row gx-0">
            {labGallery && (
              <div
                className="col-xl-5 pt-2 px-2 d-flex aos-init aos-animate"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <div
                  className="image-container"
                  style={{ position: "relative", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Image
                    src={urlFor(labGallery[0]).url()}
                    fill
                    priority
                    className="img-fluid image rounded"
                    alt="Текст"
                  />
                </div>
              </div>
            )}

            <div className="col-xl-7 pt-2 px-2 d-flex">
              <div className="row align-self-start content text-justify">
                <div
                  className="icon-box aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <div>
                    {labArea && <p>Площа приміщення: {labArea}</p>}
                    {labSittingPlaces && (
                      <p>Кількість посадкових місць: {labSittingPlaces}</p>
                    )}
                    {labChief && (
                      <p>
                        Відповідальна особа:{" "}
                        <Link href={labChiefUrl}>{labChief}</Link>
                      </p>
                    )}
                    {labDisciplines && (
                      <>
                        <p className="mb-0">Закріплені навчальні дисципліни:</p>
                        <ul>
                          <TeachingSubjectItems list={labDisciplines} />
                        </ul>
                      </>
                    )}
                    {lab3DTour && (
                      <p>
                        <Link href={lab3DTour}>Посилання на 3D тур</Link>
                      </p>
                    )}
                    {/* <div>
                      <span></span>
                    </div>
                    <br />
                    <div>
                      <span></span><br />
                      <br />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {labGallery && (
          <LightBoxCustom
            imageGallery={labGallery}
            isOpen={open}
            closeGallery={closeGallery}
          />
        )}
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
      `/about/material-and-technical-base/educational-classrooms`
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
