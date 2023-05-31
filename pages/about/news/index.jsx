import Head from "next/head";
import Image from "next/image";
import { urlFor } from "@/lib/client";
import { useEffect, useState } from "react";

// Client connection
import { menuItems } from "@/components/Header/menuItems";
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, paginationQuery } from "@/lib/queries";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import Pagination from "@/components/Pagination/Pagination";

// Other libs
import moment from "moment";

const PaginatedItems = ({ totalNewsAmount, initArr, mainMenuQO }) => {
  // Тут треба буде написати функцію, яка витягує сформований масив із
  // компонента пагінації і записує його в сетстейт
  // const [newsArr, setNewsArr] = useState(initArr);

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
        <title>Новини | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content="Новини та події кафедри електричної інженерії ТНТУ"
        />
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      <Header mainMenuArr={mainMenuArr} />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Про кафедру"
        pageTitle="Новини"
        pageUrl="/about/news"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>НОВИНИ КАФЕДРИ</p>
          </header>

          <div className="row gy-4">
            <Items currentItems={newsArr} />
          </div>

          {/* PAGINATION BLOCK STARTS */}
          <Pagination totalNewsAmount={totalNewsAmount} />
          {/* PAGINATION BLOCK ENDS */}
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default PaginatedItems;

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          const {
            newsTitle,
            publishedDate,
            newsItemBodyShort,
            mainPhoto,
            slug,
          } = item;
          const newsItemLink = `${slug.current}`;
          return (
            <div
              className="col-lg-6 d-flex align-items-stretch"
              key={newsItemLink}
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
        })}
    </>
  );
}

export async function getStaticProps() {
  const totalNewsAmount = await client.fetch(`count(*[_type == "news"])`);
  const initArr = await client.fetch(
    `*[_type == "news"] | order(publishedDate) [0...${itemsPerPage}]`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      totalNewsAmount,
      initArr,
      mainMenuQO,
    },
  };
}
