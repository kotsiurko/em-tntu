import { useEffect, useState } from "react";
import Head from "next/head";

// Client connection
import { client } from "lib/client";
import { chapterPageQuery, slugCurrent } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";

const InternationalActivityPage = ({ referencesData }) => {
  const { title, metaDescription, slug } = referencesData;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Посилання"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <PageContentSection data={referencesData} />
    </>
  );
};

export default InternationalActivityPage;

export async function getStaticPaths() {
  const query = slugCurrent("references");

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
  const referencesData = await client.fetch(
    chapterPageQuery("references", slug)
  );

  return {
    props: {
      referencesData,
    },
  };
}
