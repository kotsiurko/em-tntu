import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";
import { chapterPageQuery, slugCurrent } from "lib/queries";

import { urlFor } from "lib/client";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";

// Other libs
import moment from "moment";

const Intresting = ({ intrestingData }) => {
  const { title, slug, pressPublications, metaDescription } = intrestingData;

  const router = useRouter();

  const { asPath } = router;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Це цікаво"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {/* Публікації в пресі */}
      {asPath === "/intresting/press-publications" && (
        <section id="values" className="values">
          <div className="container" data-aos="fade-up">
            <header className="section-header header-publication">
              <p>{title}</p>
            </header>

            {pressPublications.map((el) => {
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

  return {
    props: {
      intrestingData,
    },
    // revalidate: 300
  };
}
