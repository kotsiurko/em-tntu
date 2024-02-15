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

const BachelorPPPage = ({ bachelorEPPPage, guarantorsList }) => {
  const { title, slug, metaDescription } = bachelorEPPPage;

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Бакалавру"
        pageTitle="Освітньо-професійні програми"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      <PageContentSection data={bachelorEPPPage} />

      {slug.current ===
        "/bachelor/educational-and-professional-programs/programs-and-guarantor" && (
        <GuarantorsList personList={guarantorsList} />
      )}
      {slug.current ===
        "/bachelor/educational-and-professional-programs/reviews" && (
        <ReviewsList personList={guarantorsList} />
      )}
    </>
  );
};

export default BachelorPPPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent("bachelor"));

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
  const bachelorEPPPage = await client.fetch(
    `${chapterItemQuery(
      "bachelor-epp",
      `/bachelor/educational-and-professional-programs/${slug}`
    )}`
  );

  const guarantorsList = await client.fetch(
    `*[_type == 'person' && edGuaranteeLevel == 'перший']`
  );

  return {
    props: {
      bachelorEPPPage,
      guarantorsList,
    },
  };
}
