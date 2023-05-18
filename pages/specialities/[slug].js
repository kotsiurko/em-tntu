import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/image";

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client, clientConfig } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent, newsQuery } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

import { urlFor } from "../../lib/client";

import BlockContent from "@sanity/block-content-to-react";

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import moment from "moment";
import PageContentSection from '@/components/PageContentSection/PageContentSection';


const SpecialitiesPage = ({ specialitiesPage, mainMenuQO, newsArr }) => {

  const [open, setOpen] = useState(false);

  // console.log(person);

  const { title, body, positionNumber, slug, nonFormalEducation, alumni, } = specialitiesPage;
  // const name = `${firstName} ${secondName} ${fatherName}`
  // const galleryArray = imageGallery.map(el => { return { src: urlFor(el).url() } })


  // Фільтрую масив і залишаю лише ті новини, що містять поле seninars
  const filteredArray = newsArr.filter((item) => item.nonFormalEducationBool);
  // Сортую масив новин і виводжу їх в порядку свіжіші - вище.
  const sortedArray = filteredArray.sort(
    (a, b) => moment(b.publishedDate).format("YYYYMMDDHHmm") - moment(a.publishedDate).format("YYYYMMDDHHmm")
  );

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
  }, [specialitiesPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Спеціальності"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* < !-- ======= Features Section ======= --> */}
      <PageContentSection data={specialitiesPage} />
      {/* <!--End Features Section-- > */}

      {(nonFormalEducation === "true" && sortedArray) && <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
          </header>

          <div className="row gy-4">
            {sortedArray.map(({ newsTitle, publishedDate, newsItemBodyShort, mainPhoto, slug }) => {
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
                      <p className="publishDate">Опубліковано: {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}</p>
                      <p>{newsItemBodyShort}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>}

      {alumni && <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Наші випускники</p>
          </header>

          <div className="row gy-4">
            {alumni.map((el) => {

              const { name, photo, body, _key } = el;

              return (
                <div
                  className="col-lg-6 d-flex align-items-stretch"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  key={_key}
                >
                  <div className="member news">
                    <div className="position-relative">
                      <Image
                        src={urlFor(photo).url()}
                        className="img-fluid"
                        alt={photo.caption}
                        width={440}
                        height={280}
                      />
                    </div>
                    <div className="member-info news">
                      <h4>{name}</h4>
                      {/* <p className="publishDate">Опубліковано: {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}</p> */}
                      {/* <p>{newsItemBodyShort}</p> */}
                      <BlockContent
                        blocks={body}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>}
    </>
  )
}


export default SpecialitiesPage;

export async function getStaticPaths() {
  const query = slugCurrent('specialities');

  const pages = await client.fetch(query);
  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {
  const specialitiesPage = await client.fetch(chapterPageQuery('specialities', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const newsArr = await client.fetch(newsQuery);

  return {
    props: {
      specialitiesPage,
      mainMenuQO,
      newsArr,
    }
  }
}