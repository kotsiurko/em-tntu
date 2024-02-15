/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

// Client connection
import { client } from "lib/client";
import { staffListQuery } from "lib/queries";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import StaffList from "components/StaffList/StaffList";

const Staff = ({ staffData }) => {
  // Фільтрую масив і залишаю лише ті новини, що містять false в полі formerEmployeeBool
  const filteredArray = staffData.filter(
    (item) => item.formerEmployeeBool !== true
  );

  // Сортую масив новин і виводжу їх в порядку свіжіші - вище.
  const sortedArray = filteredArray.sort((a, b) => b.weight - a.weight);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: Історія кафедри</title>
        <meta
          name="description"
          content="Колектив кафедри електричної інженерії"
        />
      </Head>

      <Header />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Колектив"
        pageUrl="/about/staff"
      />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>КОЛЕКТИВ КАФЕДРИ</p>
          </header>

          <StaffList staff={sortedArray} />
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default Staff;

export async function getStaticProps() {
  const staffData = await client.fetch(staffListQuery);

  return {
    props: {
      staffData,
    },
  };
}
