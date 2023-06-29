import { useState, useEffect } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import { urlFor } from "../../../lib/client";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client, clientConfig } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterItemQuery, slugCurrent } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

// Other libs
import moment from "moment";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";



const NewsItemArticle = ({
  newsItem,
  mainMenuQO,
}) => {

  const [open, setOpen] = useState(false);

  const { newsTitle,
    slug,
    publishedDate,
    metaDescription,
    newsItemBody,
    mainPhoto,
  } = newsItem;

  const galleryImgArr = [{ src: urlFor(mainPhoto).url() }];

  const router = useRouter();
  const { pathname } = router;

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {

    const menuObj = menuItemsMerger(
      menuItems,
      mainMenuQO,
    )

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(
          menuObj,
          prevState,
        )
      }
    });
  }, [newsItem, mainMenuQO]);



  // MENU FORMATION PART ENDS =========================================


  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {newsTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      {/* В хедер треба передавати вже сформований масив */}
      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Про кафедру"
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

              <a href="#"
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

                    <BlockContent
                      blocks={newsItemBody}
                      imageOptions={{ w: 320, h: 480, fit: 'max' }}
                      projectId={clientConfig.projectId}
                      dataset={clientConfig.dataset}
                    />

                    <hr />

                    <p>
                      Опубліковано:{" "}
                      {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}
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

        </div >
      </section >
      {/* <!--End Features Section-- > */}
    </>
  )
}


export default NewsItemArticle;

export async function getStaticPaths() {
  const newsArr = await client.fetch(slugCurrent("news"));

  const paths = newsArr.map((newsItem) => ({
    params: {
      slug: newsItem.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {

  const newsItem = await client.fetch(chapterItemQuery("news", `${slug}`));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      newsItem,
      mainMenuQO,
    }
  }
}