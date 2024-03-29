import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Client connection
import { menuItems } from "components/Header/menuItems";
import { client } from "lib/client";
import {
  mainMenuQueriesObjCreator,
  chapterPageQuery,
  slugCurrent,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

import { urlFor } from "lib/client";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import LightBoxCustom from "components/LightboxCustom/LightBoxCustom";

// Other libs
import moment from "moment";

const Intresting = ({ intrestingData, mainMenuQO }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [imgArr, setImgArr] = useState();

  const { title, slug, photoarchive, pressPublications, metaDescription } =
    intrestingData;

  const router = useRouter();

  const { asPath } = router;

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [intrestingData, mainMenuQO]);

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Це цікаво"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <section className="features my-personal">
        <div className="row feature-icons">
          <h3>{title}</h3>
        </div>
      </section>


      {/* Публікації в пресі */}
      {asPath === "/intresting/press-publications" && (
        <section id="values" className="values">
          <div className="container" data-aos="fade-up">

            {pressPublications.map((el) => {
              // console.log('el :>> ', el);
              const {
                _key,
                publScreen,
                publTitle,
                publUrl,
                publAuthors,
                publDate,
              } = el;

              return (
                <div key={_key} className="publication-section">
                  <Link href={publUrl}>
                    <header className="section-header publication-title">
                      <h3>{publTitle}</h3>
                      <h6>Автори: {publAuthors}</h6>
                      <h6>
                        Дата публікації: {moment(publDate).format("YYYY-MM-DD")}
                      </h6>
                    </header>
                  </Link>
                  <div className="flex-elements hr-line">
                    <div
                      className="new-image-container"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={urlFor(publScreen).url()}
                        fill
                        className="img-thumbnail rounded photo-archive-images"
                        alt={publScreen.caption}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default Intresting;

export async function getStaticPaths() {
  const query = slugCurrent("intresting");

  const pages = await client.fetch(query);
  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const intrestingData = await client.fetch(
    chapterPageQuery("intresting", slug)
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      intrestingData,
      mainMenuQO,
    },
    // revalidate: 300
  };
}
