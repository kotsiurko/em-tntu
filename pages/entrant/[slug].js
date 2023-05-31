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
import { Lightbox } from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";
import moment from "moment";



const EntrantsPage = ({ entrantsPage, mainMenuQO, newsArr }) => {

  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [imgArr, setImgArr] = useState();

  const { title, slug, studentsHonors, schoolsCooperation, studentOlympiads, metaDescription } = entrantsPage;

  // Фільтрую масив і залишаю лише ті новини, що містять поле schoolsCooperationBool
  const filteredArrayCooperation = newsArr.filter((item) => item.schoolsCooperationBool);
  const sortedArrayCooperation = filteredArrayCooperation.sort(
    (a, b) => moment(b.publishedDate).format("YYYYMMDDHHmm") - moment(a.publishedDate).format("YYYYMMDDHHmm")
  );

  // Фільтрую масив і залишаю лише ті новини, що містять поле studentOlympiads
  const filteredArrayStudOlymp = newsArr.filter((item) => item.studentOlympiadsBool);
  const sortedArrayStudOlymp = filteredArrayStudOlymp.sort(
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

  }, [entrantsPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Абітурієнту"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={entrantsPage} />

      {(schoolsCooperation === 'true' && sortedArrayCooperation) && <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
          </header>

          <div className="row gy-4">
            {sortedArrayCooperation.map(({ newsTitle, publishedDate, newsItemBodyShort, mainPhoto, slug }) => {
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

      {(studentOlympiads === 'true' && sortedArrayStudOlymp) && <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>Події розділу</p>
          </header>

          <div className="row gy-4">
            {sortedArrayStudOlymp.map(({ newsTitle, publishedDate, newsItemBodyShort, mainPhoto, slug }) => {
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

      {studentsHonors && <section className="features">
        <div className="container text-justify">
          {studentsHonors.map(el => {

            const { honorsPerYear, year, _key } = el;

            // При такому коді реакт лімітує кількість ререндерів
            const galleryArray = honorsPerYear.map(el => { return { src: urlFor(el).url() } })

            return (
              <div key={_key}>
                <header className="section-header">
                  <p>{year}</p>
                </header>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center">
                    {honorsPerYear.map((photo, idx) => {

                      const imgLink = urlFor(photo).url();

                      return (
                        <div className='p-1' key={photo._key}>

                          <a href="#"
                            className="image-container"
                            style={{ position: "relative" }}

                            onClick={() => {
                              setSelectedIndex(idx);
                              setImgArr(galleryArray);
                              setOpen(true);
                            }}
                          >

                            <Image
                              src={imgLink}
                              className="img-thumbnail"
                              alt={photo.caption}
                              width={440}
                              height={280}
                              priority
                            />

                          </a>
                        </div>
                      )
                    })}

                  </div>
                </div>

              </div>

            )
          })}
        </div>
      </section>}

      <Lightbox
        index={selectedIndex}
        open={open}
        close={() => setOpen(false)}
        slides={imgArr}
      />

    </>
  )
}


export default EntrantsPage;

export async function getStaticPaths() {
  const query = slugCurrent('entrant');

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
  const entrantsPage = await client.fetch(chapterPageQuery('entrant', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const newsArr = await client.fetch(newsQuery);

  return {
    props: {
      entrantsPage,
      mainMenuQO,
      newsArr,
    }
  }
}