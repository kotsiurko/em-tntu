import Head from "next/head";

// Client connection
import { client } from "lib/client";

// Helpers
import { slugCurrent, chapterItemQuery } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import {} from "lib/queries";

const LEConference = ({ chapterConferencePage }) => {
  const { title, slug, metaDescription } = chapterConferencePage;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      {/* <!-- ======= Breadcrumbs ======= --> */}
      <Breadcrumbs
        chapterTitle="Наука"
        pageTitle="Конференція “Світлотехніка й електроенергетика”"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <PageContentSection data={chapterConferencePage} />
    </>
  );
};

export default LEConference;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent("scienceLEConference"));
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
  const chapterConferencePage = await client.fetch(
    chapterItemQuery(
      "scienceLEConference",
      `/science/conference-lighting-and-power-engineering/${slug}`
    )
  );

  return {
    props: {
      chapterConferencePage,
    },
  };
}
