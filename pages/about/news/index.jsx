/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { urlFor } from "@/lib/client";
import moment from "moment";

// Client connection
import { client } from "@/lib/client";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

const News = ({ fetchedData }) => {
  // console.log("Staff page data:", fetchedData);

  // Сортую масив новин і виводжу їх в порядку свіжіші - вище.
  const sortedArray = fetchedData.sort(
    (a, b) => moment(b.publishedDate).format("YYYYMMDDHHmm") - moment(a.publishedDate).format("YYYYMMDDHHmm")
  );

  console.log("sortedArray :>> ", sortedArray);

  // console.log("client :>> ", client);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: Новини</title>
      </Head>

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs chapterTitle="Про кафедру" pageTitle="Новини" pageUrl="/about/news" />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>НОВИНИ КАФЕДРИ</p>
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
                      <a href={newsItemLink} className="stretched-link"></a>
                      <img src={urlFor(mainPhoto).url()} className="img-fluid" alt="" />
                    </div>
                    <div className="member-info news">
                      <h4>{newsTitle}</h4>
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

export default News;

export async function getStaticProps() {
  const fetchedData = await client.fetch(
    `*[_type == "news"] {
        newsTitle,
        slug,
        publishedDate,
        newsItemBodyShort,
        mainPhoto,
      }`
  );

  return {
    props: {
      fetchedData,
    },
  };
}
