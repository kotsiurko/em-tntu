import { useState, useEffect } from "react";
import Head from 'next/head'


// Client connection
import { menuItems } from 'components/Header/menuItems';
import { client } from "lib/client";
import { mainMenuQueriesObjCreator, slugCurrent, heroItemQuery } from 'lib/queries';
import { menuCreator, menuItemsMerger } from 'lib/menuCreator';

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import HeroItem from "../../../components/HeroesList/HeroItem";



const PersonInfo = ({
  personItem,
  mainMenuQO,
}) => {

  // Об'єкт героя міститься в personItem.heroesList
  const { heroName,
    heroSecondAndFatherName,
    customURL } = personItem.heroesList;
  const name = `${heroName} ${heroSecondAndFatherName}`;
  const personMetaDescription = `${name} | Полеглі герої`;


  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {

    const menuObj = menuItemsMerger(
      menuItems,
      mainMenuQO,
    )

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(
          menuObj,
          prevState,
        )
      }
    });
  }, [personItem, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================


  return (
    <>
      <Head>
        <title>{`${name} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={personMetaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Війна"
        pageTitle="Герої не вмирають!"
        pageUrl="/other/heroes/"
        subPageTitle={name}
        subPageUrl={customURL.current}
      />

      <section className="features my-personal">
        <div className="container" data-aos="fade-up">
          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons">
            <HeroItem heroPerson={personItem.heroesList} />
          </div>
        </div>
      </section>

    </>
  )
}


export default PersonInfo;

export async function getStaticPaths() {

  const persons = await client.fetch(slugCurrent("other"));
  const paths = persons.map((person) => ({
    params: {
      slug: person.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {

  const personItem = await client.fetch(heroItemQuery(slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      personItem,
      mainMenuQO,
    }
  }
}