import Head from "next/head";

// Client connection
import { client } from "lib/client";
import { chapterItemQuery, slugCurrent } from "lib/queries";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import StaffItem from "components/StaffItem/StaffItem";

const PersonInfo = ({ personItem }) => {
  const { firstName, secondName, fatherName, slug } = personItem;
  const name = `${firstName} ${secondName} ${fatherName}`;
  const personMetaDescription = `${name} | Біографія та професійний шлях`;

  return (
    <>
      <Head>
        <title>{name} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content={personMetaDescription} />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Це цікаво"
        pageTitle="Працювали на кафедрі"
        pageUrl="/intresting/former-staff"
        subPageTitle={name}
        subPageUrl={slug.current}
      />

      <StaffItem personInfo={personItem} />
    </>
  );
};

export default PersonInfo;

export async function getStaticPaths() {
  const persons = await client.fetch(slugCurrent("person"));
  const paths = persons.map((person) => ({
    params: {
      slug: person.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { slug } }) {
  const personItem = await client.fetch(chapterItemQuery("person", slug));

  return {
    props: {
      personItem,
    },
  };
}
