import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { newsPerPage } from "lib/queries";
import { getPortion } from "lib/helpers";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";

const newsBool = "conferenceLEandPEBool";

const ConferenceNews = ({ totalNewsAmount }) => {
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

  return (
    <>
      <Head>
        <title>Зустрічі | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content="Новини, присвячені конференції “Світлотехніка й електроенергетика”"
        />
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      <Header />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Наука"
        pageTitle="Конференція “Світлотехніка й електроенергетика”"
        pageUrl={null}
        subPageTitle="Новини"
        subPageUrl="/science/conference-lighting-and-power-engineering/news"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>НОВИНИ РОЗДІЛУ</p>
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
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default ConferenceNews;

export async function getStaticProps() {
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );

  return {
    props: {
      totalNewsAmount,
    },
  };
}
