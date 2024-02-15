import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

// Client connection
import { client, urlFor } from "lib/client";
import { chapterPageQuery, slugCurrent } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import SciPublTypes from "components/SciPublTypes/SciPublTypes";

const SciencePage = ({ chapterPage }) => {
  const { title, slug, metaDescription, sciPublTypes, sciStudActiv } =
    chapterPage;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Наука"
        pageTitle={title}
        pageUrl={slug.current}
      />

      {!sciPublTypes && <PageContentSection data={chapterPage} />}

      {/* {sciPublTypes && Компонент, що відображає сторінку із вкладками} */}
      {sciPublTypes && <SciPublTypes data={chapterPage} />}

      {slug.current === "/science/students-scientific-activity" && (
        <div>
          <section className="section">
            <div className="container">
              <header className="section-header">
                <p>Конференції</p>
              </header>
              {sciStudActiv.map((el) => {
                const { _key, sciStudActivItemTitle, itemPhoto, itemUrl } = el;
                return (
                  <div key={_key}>
                    {/* картинка */}
                    <hr />
                    <div
                      className="image-container"
                      style={{ position: "relative" }}
                    >
                      <Image
                        src={urlFor(itemPhoto).url()}
                        fill
                        // priority
                        className="img-fluid rounded image"
                        alt={`Full name`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ maxHeight: 450 }}
                      />
                    </div>
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                      <p>
                        <strong>{sciStudActivItemTitle}</strong>
                      </p>
                      <Link href={itemUrl}>
                        <p>Збірник в Elartu</p>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default SciencePage;

export async function getStaticPaths() {
  const query = slugCurrent("science");

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
  const chapterPage = await client.fetch(chapterPageQuery("science", slug));

  if (slug === "conference-lighting-and-power-engineering") {
    return {
      redirect: {
        destination: "/science/conference-lighting-and-power-engineering/news",
        permanent: false,
        // statusCode: 301
      },
    };
  }

  return {
    props: {
      chapterPage,
    },
  };
}
