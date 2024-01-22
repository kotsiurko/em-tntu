/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";

// Client connection
// Client connection
import { menuItems } from "components/Header/menuItems";
import { client } from "lib/client";
import { staffListQuery, mainMenuQueriesObjCreator } from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import StaffList from "components/StaffList/StaffList";

const FormerStaff = ({ staffData, mainMenuQO }) => {
  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  // Фільтрую масив і залишаю лише ті новини, що містять поле formerEmployeeBool
  const filteredArray = staffData.filter(
    (item) => item.formerEmployeeBool === true
  );

  // Сортую масив новин і виводжу їх в порядку свіжіші - вище.
  const sortedArray = filteredArray.sort((a, b) => b.weight - a.weight);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [staffData, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Колишні працівники | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content="Колишні працівники кафедри електричної інженерії"
        />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Це цікаво"
        pageTitle="Працювали на кафедрі"
        pageUrl="/intresting/former-staff"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>ПРАЦЮВАЛИ НА КАФЕДРІ</p>
          </header>

          <StaffList staff={sortedArray} />
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default FormerStaff;

export async function getStaticProps() {
  const staffData = await client.fetch(staffListQuery);
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      staffData,
      mainMenuQO,
    },
  };
}
