import { useState, useEffect } from "react";
import Head from "next/head";
import { urlFor } from "lib/client";
import Image from "next/image";

// Client connection
import { client } from "lib/client";
import { chapterItemQuery, slugCurrent } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";

// Other libs
import moment from "moment";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import TextContent from "components/TextContent/TextContent";

const NewsItemArticle = ({ newsItem }) => {
  const [open, setOpen] = useState(false);

  const {
    newsTitle,
    slug,
    publishedDate,
    metaDescription,
    newsItemBodyShort,
    newsItemBody,
    mainPhoto,
  } = newsItem;

  const galleryImgArr = [{ src: urlFor(mainPhoto).url() }];

  return (
    <>
      <Head>
        <title>{`${newsTitle} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={newsTitle} />
        <meta property="og:description" content={newsItemBodyShort} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Новини"
        pageUrl="/about/news"
        subPageTitle={newsTitle}
        subPageUrl={slug.current}
      />

      {/* < !-- ======= Features Section ======= --> */}
      <section className="features my-personal">
        <div className="container" data-aos="fade-up">
          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons" data-aos="fade-up">
            <div className="row gx-0">
              <h3>{newsTitle}</h3>

              <a
                href="#"
                className="image-container text-center"
                style={{ position: "relative" }}
                onClick={() => setOpen(true)}
              >
                <Image
                  src={urlFor(mainPhoto).url()}
                  fill
                  className="img-thumbnail rounded news-image"
                  alt={mainPhoto.caption}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </a>

              <div className="col-xl-12 pt-2 px-2">
                <div className="row align-self-start content text-justify">
                  <div className="icon-box my-dstyle" data-aos="fade-up">
                    <hr />

                    <TextContent data={newsItemBody} />

                    <hr />

                    <p>
                      Опубліковано: {moment(publishedDate).format("YYYY-MM-DD")}
                    </p>
                  </div>
                </div>
              </div>

              <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={galleryImgArr}
              />
            </div>
          </div>
          {/* <!-- End Feature Icons --> */}
        </div>
      </section>
      {/* <!--End Features Section-- > */}
    </>
  );
};

export default NewsItemArticle;

export async function getStaticPaths() {
  const newsArr = await client.fetch(slugCurrent("news"));

  const paths = newsArr.map((newsItem) => ({
    params: {
      slug: newsItem.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const newsItem = await client.fetch(chapterItemQuery("news", `${slug}`));

  return {
    props: {
      newsItem,
    },
  };
}
