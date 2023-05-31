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

// Other libs
import moment from "moment";


const MasterPage = ({ masterPage, mainMenuQO, newsArr }) => {

  const { title, body, slug, academicHonesty, metaDescription } = masterPage;

  // Фільтрую масив і залишаю лише ті новини, що містять поле academicHonestyBool
  const filteredArray = newsArr.filter((item) => item.masterAcademicHonestyBool);
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
  }, [masterPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{title} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Магістру"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* < !-- ======= Features Section ======= --> */}
      <section className="features my-personal">
        <div className="container" data-aos="fade-up">

          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons" data-aos="fade-up">

            <div className="row gx-0">

              <h3>{title}</h3>

              <div className="col-xl-12 pt-2 px-2">
                <div className="row align-self-start content text-justify">
                  <div className="icon-box my-dstyle" data-aos="fade-up">

                    <BlockContent
                      blocks={body}
                      projectId={clientConfig.projectId}
                      dataset={clientConfig.dataset}
                    />

                  </div>
                </div>
              </div>

              {/* <div> */}
              {/* <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={galleryArray}
              /> */}
              {/* </div> */}

            </div>

          </div>
          {/* <!-- End Feature Icons --> */}

        </div >
      </section >
      {/* <!--End Features Section-- > */}


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


export default MasterPage;

export async function getStaticPaths() {
  const query = slugCurrent('master');

  //   `*[type=='master']{
  // slug{
  //   current
  // }
  //   }`;

  const pages = await client.fetch(query);
  const paths = pages.map((master) => ({
    params: {
      slug: master.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {

  const masterPage = await client.fetch(chapterPageQuery('master', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const newsArr = await client.fetch(newsQuery);

  return {
    props: {
      masterPage,
      mainMenuQO,
      newsArr,
    }
  }
}