/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { urlFor } from "../../../lib/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Client connection
// Client connection
import { menuItems } from "@/components/Header/menuItems";
import { client } from "@/lib/client";
import { staffListQuery, mainMenuQueriesObjCreator } from "@/lib/queries";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

const Staff = ({ staffData, mainMenuQO }) => {
  // console.log("Staff page data:", fetchedData);

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  const sortedArray = staffData.sort((a, b) => b.weight - a.weight);

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
        <title>Кафедра електричної інженерії ТНТУ :: Історія кафедри</title>
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs chapterTitle="Про кафедру" pageTitle="Колектив" pageUrl="/about/staff" />

      {/* ======= Inner Page Team-Staff Section ======= */}
      <section id="team" className="team">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <p>КОЛЕКТИВ КАФЕДРИ</p>
          </header>

          <div className="row gy-4">
            {sortedArray.map(
              ({ firstName, secondName, fatherName, sciDegree, acadStatus, position, mainPhoto, slug }) => {
                const personLink = `staff/${slug.current}`;
                const scheduleLink = `http://tntu.edu.ua/?p=uk/schedule&t=${firstName}+${secondName}+${fatherName}`;
                const positionMarkup =
                  acadStatus.toLowerCase() === position.short.toLowerCase() ? (
                    <span>
                      {sciDegree}, {position.short}
                    </span>
                  ) : (
                    <>
                      <span>
                        {sciDegree}, {acadStatus},
                      </span>
                      <span>{position.short}</span>
                    </>
                  );

                return (
                  <div
                    className="col-lg-2 col-md-4 d-flex align-items-stretch"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    key={firstName}
                  >
                    <div className="member">
                      <div className="position-relative">
                        <a href={personLink} className="stretched-link"></a>
                        <img src={urlFor(mainPhoto).url()} className="img-fluid" alt="" />
                      </div>
                      <div className="member-info">
                        <h4>
                          <firstname style={{ textTransform: "uppercase" }}>{firstName}</firstname>
                          <br />
                          {secondName}
                          <br />
                          {fatherName}
                        </h4>
                        {positionMarkup}
                        <a href={scheduleLink}>розклад</a>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

            {/* HARDCODED ELEMENTS */}
            {/* <div
              className="col-lg-2 col-md-4 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="member">
                <div className="position-relative">
                  <a
                    href="person/tarasenko/tarasenko.aspx"
                    className="stretched-link"
                  ></a>
                  <img
                    src="../person/tarasenko/01.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="member-info">
                  <h4>
                    ТАРАСЕНКО
                    <br />
                    Микола Григорович
                  </h4>
                  <span>д.т.н., професор,</span>
                  <span>завідувач кафедри</span>
                  <a href="#">розклад</a>
                </div>
              </div>
            </div>

            <div
              className="col-lg-2 col-md-4 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="member">
                <div className="position-relative">
                  <a
                    href="person.aspx?name=levytskyj"
                    className="stretched-link"
                  ></a>
                  <img
                    src="../person/levytskyj/01.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="member-info">
                  <h4>
                    ЛЕВИЦЬКИЙ
                    <br />
                    Андрій Михайлович
                  </h4>
                  <span>інженер 2 категорії</span>
                  <a href="#">розклад</a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default Staff;

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
