import { useState, useEffect } from "react";
import Head from "next/head";

// Client connection
import { menuItems } from "components/Header/menuItems";
import { client } from "lib/client";
import {
  mainMenuQueriesObjCreator,
  chapterItemQuery,
  slugCurrent,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import StaffItem from "components/StaffItem/StaffItem";

const PersonInfo = ({ personItem, mainMenuQO }) => {
  const { firstName, secondName, fatherName, slug } = personItem;
  const name = `${firstName} ${secondName} ${fatherName}`;
  const personMetaDescription = `${name} | Біографія та професійний шлях`;

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [personItem, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>{name} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content={personMetaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

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
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      personItem,
      mainMenuQO,
    },
  };
}
