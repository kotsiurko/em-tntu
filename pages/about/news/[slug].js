// Client connection
import { client, clientConfig } from "../../../lib/client";

import Image from "next/image";
import { urlFor } from "../../../lib/client";
import BlockContent from "@sanity/block-content-to-react";

import { useState } from "react";
import moment from "moment";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";



const NewsItemArticle = ({ newsItem }) => {

  const [open, setOpen] = useState(false);

  // console.log("newsItem", newsItem);

  const { newsTitle,
    slug,
    publishedDate,
    newsItemBody,
    mainPhoto,
  } = newsItem;

  // const name = `${firstName} ${secondName} ${fatherName}`
  const galleryImgArr = [{ src: urlFor(mainPhoto).url() }];


  return (
    <>
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

              <a href="#" className="image-container text-center"
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
  const query = `*[type=='news']{
    slug{
      current
    }
  }`;
  const news = await client.fetch(query);
  const paths = news.map((newsItem) => ({
    params: {
      slug: newsItem.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type=='news' && slug.current == '${slug}'][0]`;

  const newsItem = await client.fetch(query);

  return {
    props: {
      newsItem
    }
  }
}