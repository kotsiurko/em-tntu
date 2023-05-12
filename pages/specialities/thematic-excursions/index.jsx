import Head from "next/head";
import Image from "next/image";
import { urlFor } from "@/lib/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Client connection
import { menuItems } from "@/components/Header/menuItems";
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, newsQuery } from "@/lib/queries";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

// Other libs
import moment from "moment";

const ThematicExcursionNews = ({ newsArr, mainMenuQO }) => {
  // Фільтрую масив і залишаю лише ті новини, що містять поле thematicExcursionsBool
  const filteredArray = newsArr.filter((item) => item.thematicExcursionsBool);
  // Сортую масив новин і виводжу їх в порядку свіжіші - вище.
  const sortedArray = filteredArray.sort(
    (a, b) =>
      moment(b.publishedDate).format("YYYYMMDDHHmm") -
      moment(a.publishedDate).format("YYYYMMDDHHmm")
  );

  const router = useRouter();
  const { pathname } = router;

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [newsArr, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>
          Кафедра електричної інженерії ТНТУ :: Тематичні екскурсії{" "}
        </title>
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      {pathname !== "/" && <Header mainMenuArr={mainMenuArr} />}

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Спеціальності"
        pageTitle="Тематичні екскурсії"
        pageUrl="thematic-excursions"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>ТЕМАТИЧНІ ЕКСКУРСІЇ</p>
          </header>

          <div className="row gy-4">
            {sortedArray.map(
              ({
                newsTitle,
                publishedDate,
                newsItemBodyShort,
                mainPhoto,
                slug,
              }) => {
                const newsItemLink = `${slug.current}`;

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
                        <p className="publishDate">
                          Опубліковано:{" "}
                          {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}
                        </p>
                        <p>{newsItemBodyShort}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default ThematicExcursionNews;

export async function getStaticProps() {
  const newsArr = await client.fetch(newsQuery);
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      newsArr,
      mainMenuQO,
    },
  };
}
