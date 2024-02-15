import Head from "next/head";
import { useEffect, useState } from "react";

// Client connection
import { client } from "lib/client";
import { newsPerPage } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import Pagination from "components/Pagination/Pagination";
import NewsItems from "components/NewsItems/NewsItems";

const newsBool = "allNewsBool";

const NewsList = ({ totalNewsAmount, initArr, mainMenuQO }) => {
  const [dataFromChild, setDataFromChild] = useState(initArr);

  const updateDataFromChild = (data) => {
    setDataFromChild(data);
  };

  return (
    <>
      <Head>
        <title>Новини | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content="Новини та події кафедри електричної інженерії ТНТУ"
        />
      </Head>

      <Header />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Новини"
        pageUrl="/about/news"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container">
          <header className="section-header">
            <p>НОВИНИ КАФЕДРИ</p>
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
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default NewsList;

export async function getStaticProps() {
  const totalNewsAmount = await client.fetch(`count(*[_type == "news"])`);
  const initArr = await client.fetch(
    `*[_type == "news"] | order(publishedDate desc) [0...${newsPerPage}]`
  );

  return {
    props: {
      totalNewsAmount,
      initArr,
    },
  };
}
