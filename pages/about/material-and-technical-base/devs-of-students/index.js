import Head from "next/head";
import Image from "next/image";
import { urlFor } from "@/lib/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Client connection
import { menuItems } from "@/components/Header/menuItems";
import { client } from "@/lib/client";
import { itemsOrderAscTransform } from "@/lib/helpers";
import { chapterTitleQuery, newsQuery } from "@/lib/queries";
import { menuCreator } from "@/lib/menuCreator";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

// Other libs
import moment from "moment";

const Seminars = ({ newsArr, aboutItems, specialitiesItems, bachelorItems, masterItems }) => {
  console.log('newsArr :>> ', newsArr);
  // Фільтрую масив і залишаю лише ті новини, що містять поле studentsDevs
  const filteredArray = newsArr.filter(item => item.studentsDevs);
  // Сортую масив новин і виводжу їх в порядку свіжіші - вище.
  const sortedArray = filteredArray.sort(
    (a, b) => moment(b.publishedDate).format("YYYYMMDDHHmm") - moment(a.publishedDate).format("YYYYMMDDHHmm")
  );

  const router = useRouter();
  const { pathname } = router;

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const transformedAbout = itemsOrderAscTransform(aboutItems, menuItems[0].children);
    const transformedSpecialities = itemsOrderAscTransform(specialitiesItems, menuItems[1].children);
    const transformedBachelor = itemsOrderAscTransform(bachelorItems, menuItems[2].children);
    const transformedMaster = itemsOrderAscTransform(masterItems, menuItems[3].children);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(
          transformedAbout,
          transformedSpecialities,
          transformedBachelor,
          transformedMaster,
          prevState
        );
      }
    });
  }, [aboutItems, bachelorItems, masterItems, specialitiesItems]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: Розробки студентів</title>
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      {pathname !== "/" && <Header mainMenuArr={mainMenuArr} />}

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs chapterTitle="Про кафедру" pageTitle="Матеріально-технічна база" subPageUrl="devs-of-students" subPageTitle="Розробки студентів" />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>РОЗРОБКИ СТУДЕНТІВ</p>
          </header>

          <div className="row gy-4">
            {sortedArray.map(({ newsTitle, publishedDate, newsItemBodyShort, mainPhoto, slug }) => {
              const newsItemLink = `news/${slug.current}`;

              return (
                <div
                  className="col-lg-6 d-flex align-items-stretch"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  key={newsTitle}
                >
                  <div className="member news">
                    <div className="position-relative">
                      <Image
                        src={urlFor(mainPhoto).url()}
                        className="img-fluid"
                        alt={mainPhoto.caption}
                        width={440}
                        height={280}
                      />
                    </div>
                    <div className="member-info news">
                      <a href={newsItemLink}>
                        <h4>{newsTitle}</h4>
                      </a>
                      <p className="publishDate">Опубліковано: {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}</p>
                      <p>{newsItemBodyShort}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default Seminars;

export async function getStaticProps() {
  const newsArr = await client.fetch(newsQuery);

  const aboutItems = await client.fetch(chapterTitleQuery("about"));
  const specialitiesItems = await client.fetch(chapterTitleQuery("specialities"));
  const bachelorItems = await client.fetch(chapterTitleQuery("bachelor"));
  const masterItems = await client.fetch(chapterTitleQuery("master"));

  return {
    props: {
      newsArr,
      aboutItems,
      specialitiesItems,
      bachelorItems,
      masterItems,
    },
  };
}
