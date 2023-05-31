import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from "next/image";

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



const BachelorPage = ({ bachelorPage, mainMenuQO, newsArr }) => {

  const { title, slug, academicHonesty, metaDescription } = bachelorPage;
  // Фільтрую масив і залишаю лише ті новини, що містять поле bachelorAcademicHonestyBool
  const filteredArray = newsArr.filter((item) => item.bachelorAcademicHonestyBool);
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
  }, [bachelorPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content={metaDescription}
        />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Бакалавру"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={bachelorPage} />

      {(academicHonesty && sortedArray) && <section id="team" className="team">
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
    </>
  )
}


export default BachelorPage;

export async function getStaticPaths() {
  const query = slugCurrent('bachelor');

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

  const bachelorPage = await client.fetch(chapterPageQuery('bachelor', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const newsArr = await client.fetch(newsQuery);

  return {
    props: {
      bachelorPage,
      mainMenuQO,
      newsArr,
    }
  }
}