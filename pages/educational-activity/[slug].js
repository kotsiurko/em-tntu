import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/image";
import { useRouter } from "next/router";

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent, newsQuery } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

import { urlFor } from "../../lib/client";

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';

// Other libs
import moment from "moment";



const EducationalActivityPage = ({
  educationalActivityData,
  mainMenuQO,
  newsArr,
}) => {

  const [newsArrForMap, setNewsArrForMap] = useState([]);

  const {
    title,
    slug,
    eaSportLife,
    eaExcursions,
    eaFacultyDays,
    metaDescription,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [educationalActivityData, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content={metaDescription} />
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