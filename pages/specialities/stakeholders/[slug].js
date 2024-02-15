import Head from "next/head";

// Client connection
import { client } from "lib/client";
import { chapterItemQuery, slugCurrent } from "lib/queries";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import DocsViewer from "../../../components/DocsViewer/DocsViewer";

const StakeholdersItemArticle = ({ stakeholdersPage }) => {
  const { title, slug, metaDescription, docURL } = stakeholdersPage;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Спеціальності"
        pageTitle="Наші стейкхолдери"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <PageContentSection data={stakeholdersPage} />

      {docURL && <DocsViewer docURL={docURL} />}
    </>
  );
};

export default StakeholdersItemArticle;

export async function getStaticPaths() {
  const newsArr = await client.fetch(slugCurrent("stakeholders"));

  const paths = newsArr.map((newsItem) => ({
    params: {
      slug: newsItem.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const stakeholdersPage = await client.fetch(
    chapterItemQuery("specialities-sh", `/specialities/stakeholders/${slug}`)
  );

  return {
    props: {
      stakeholdersPage,
    },
  };
}
