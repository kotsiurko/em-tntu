import Head from "next/head";

// Client connection
import { client } from "lib/client";
import { chapterItemQuery, slugCurrent } from "lib/queries";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import GuarantorsList from "components/GuarantorsList/GuarantorsList";
import ReviewsList from "components/ReviewsList/ReviewsList";

const MasterPPPage = ({ masterEPPPage, guarantorsList }) => {
  const { title, slug, metaDescription } = masterEPPPage;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Магістру"
        pageTitle="Освітньо-професійні програми"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      {/* Page Content */}
      <PageContentSection data={masterEPPPage} />

      {slug.current ===
        "/master/educational-and-professional-programs/programs-and-guarantor" && (
        <GuarantorsList personList={guarantorsList} />
      )}
      {slug.current ===
        "/master/educational-and-professional-programs/reviews" && (
        <ReviewsList personList={guarantorsList} />
      )}
    </>
  );
};

export default MasterPPPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent("master"));

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
  const masterEPPPage = await client.fetch(
    `${chapterItemQuery(
      "master-epp",
      `/master/educational-and-professional-programs/${slug}`
    )}`
  );
  const guarantorsList = await client.fetch(
    `*[_type == 'person' && edGuaranteeLevel == 'другий']`
  );

  return {
    props: {
      masterEPPPage,
      guarantorsList,
    },
  };
}
