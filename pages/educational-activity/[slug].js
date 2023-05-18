import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/image";
import { useRouter } from "next/router";

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
import { Lightbox } from 'yet-another-react-lightbox';
// import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import moment from "moment";
import PageContentSection from '@/components/PageContentSection/PageContentSection';


const EducationalActivityPage = ({
  educationalActivityData,
  mainMenuQO,
  newsArr,
}) => {

  // console.log('postgraduateStudyData :>> ', postgraduateStudyData);

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [imgArr, setImgArr] = useState();
  const [newsArrForMap, setNewsArrForMap] = useState([]);

  const {
    title,
    body,
    slug,
    eaSportLife,
    eaExcursions,
    eaFacultyDays,
  } = educationalActivityData;


  const router = useRouter();

  const { asPath } = router;

  // Фільтрую і сортую масив (по eaSportLifeBool)
  const filteredArraySportLife = newsArr.filter((item) => item.eaSportLifeBool);
  const sortedArraySportLife = filteredArraySportLife.sort(
    (a, b) => moment(b.publishedDate).format("YYYYMMDDHHmm") - moment(a.publishedDate).format("YYYYMMDDHHmm")
  );

  // Фільтрую і сортую масив (по intPractOfStudentsBool)
  const filteredArrayExcursions = newsArr.filter((item) => item.eaExcursionsBool);
  const sortedArrayExcursions = filteredArrayExcursions.sort(
    (a, b) => moment(b.publishedDate).format("YYYYMMDDHHmm") - moment(a.publishedDate).format("YYYYMMDDHHmm")
  );

  // Фільтрую і сортую масив (по eaFacultyDaysBool)
  const filteredArrayFacultyDays = newsArr.filter((item) => item.eaFacultyDaysBool);
  const sortedArrayFacultyDays = filteredArrayFacultyDays.sort(
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

    // ---------------------------------

    if (asPath === "/educational-activity/sport-life") {
      setNewsArrForMap(sortedArraySportLife);
    }
    if (asPath === "/educational-activity/excursions") {
      setNewsArrForMap(sortedArrayExcursions);
    }
    if (asPath === "/educational-activity/faculty-days") {
      setNewsArrForMap(sortedArrayFacultyDays);
    }

    // --------------------------------------

  }, [educationalActivityData, mainMenuQO]);

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
        chapterTitle="Виховна діяльність"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={educationalActivityData} />

      {/* Тут через АБО додати решту умов. щоб не дублювати код */}
      {/* Тут уважно подумати над логікою поведінки сторінок щодо виведення новин*/}
      {(
        (eaSportLife === 'true' && newsArrForMap.length > 0) ||
        (eaExcursions === 'true' && newsArrForMap.length > 0) ||
        (eaFacultyDays === 'true' && newsArrForMap.length > 0)
      ) && <section id="team" className="team">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <p>Події розділу</p>
            </header>

            <div className="row gy-4">
              {newsArrForMap.map(({ newsTitle, publishedDate, newsItemBodyShort, mainPhoto, slug }) => {
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


      {/* <Lightbox
        index={selectedIndex}
        open={open}
        close={() => setOpen(false)}
        slides={imgArr}
      /> */}
    </>
  )
}


export default EducationalActivityPage;

export async function getStaticPaths() {
  const query = slugCurrent('educational-activity');

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
  const educationalActivityData = await client.fetch(chapterPageQuery('educational-activity', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const newsArr = await client.fetch(newsQuery);

  return {
    props: {
      educationalActivityData,
      mainMenuQO,
      newsArr,
    }
  }
}