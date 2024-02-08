import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import { menuItems } from "components/Header/menuItems";
import { client } from "lib/client";
import { mainMenuQueriesObjCreator, mainStaffListQuery } from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
// import styles from '@/styles/Home.module.css'

// Components
import Header from "/components/Header/Header";

// Images
import electricMan from "../public/assets/img/hero-img.png";
import MainFAQ from "components/MainFAQ/MainFAQ";
import MainAbout from "components/MainAbout/MainAbout";
import MainCounter from "components/MainCounter/MainCounter";
import MainValues from "components/MainValues/MainValues";
import MainBooklet from "components/MainBooklet/MainBooklet";
import MainTeam from "components/MainTeam/MainTeam";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ mainMenuQO, mainPage, mainStaffData }) {
  const aboutData = mainPage.find((el) => el.title === "Хто ми є");
  const faqData = mainPage.find((el) => el.title === "Часті питання");
  const valuesData = mainPage.find((el) => el.title === "Наші цінності");
  const bookletsData = mainPage.find((el) => el.title === "Буклети");

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [mainMenuQO]);

  return (
    <>
      <Head>
        <title>Головна | Кафедра електричної інженерії ТНТУ</title>
        <meta
          name="description"
          content='Кафедра Електричної Інженерії Тернопільського національного технічного університету імені Івана Пулюя. Спеціальність 141 " Електроенергетика, електротехніка та електромеханіка"'
        />
      </Head>

      <div className="mainPage">
        <Header mainMenuArr={mainMenuArr} />

        {/* ======= Hero Section ======= */}
        <section id="hero" className="hero d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">
                  Кафедра <br /> Електричної Інженерії ТНТУ ім. І.Пулюя
                </h1>
                <h2 data-aos="fade-up" data-aos-delay="400">
                  Спеціальність 141 <br /> &ldquo;Електроенергетика,
                  електротехніка та електромеханіка&rdquo;
                </h2>
                <br />
                <h3 data-aos="fade-up" data-aos-delay="400" className="h5">
                  Шукаємо талановитих абітурієнтів, які хочуть пов`язати своє
                  життя з електротехнікою та інженерією
                </h3>
                <div data-aos="fade-up" data-aos-delay="600">
                  <div className="text-center text-lg-start">
                    <a
                      href="#faq"
                      className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
                    >
                      <span>Навчатись в нас</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-6 hero-img"
                data-aos="zoom-out"
                data-aos-delay="200"
              >
                <Image
                  src={electricMan}
                  alt="Picture of the man near electric box"
                  className="img-fluid"
                  style={{ width: "100%", hight: "100%" }}
                  priority="true"
                />
              </div>
            </div>
          </div>
        </section>
        {/* End Hero */}

        {/* ======= Links Section ======= */}
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Структура</h2>
              <p>Карта сайту</p>
            </header>

            <div className="row gy-4">
              <div className="col">
                <div className="row gy-4 my-font-size">
                  {mainMenuArr
                    // вирізаю розділ АСПІРАНТУРА
                    .filter((item) => item.id !== 7)
                    .map(({ id, title, url, icon, children }) => {
                      return (
                        <div className="col-lg-4 col-md-6 col-sm-12" key={id}>
                          <div className="info-box">
                            <i className={icon}></i>
                            <h3>{title}</h3>
                            {children.map(({ title, url, children }) => {
                              return (
                                <div key={title} className="row">
                                  <p>
                                    <a href={url}>
                                      <i className="bi bi-arrow-right"></i>
                                      {title}
                                    </a>
                                  </p>
                                  <div className="mх-3">
                                    {children &&
                                      children.map((el) => {
                                        return (
                                          <p key={el.title}>
                                            <a href={el.url}>
                                              <i className="bi bi-dot"></i>
                                              {el.title}
                                            </a>
                                          </p>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Links Section */}

        {/* ======= About Section ======= */}
        <MainAbout data={aboutData} />
        {/* End About Section */}

        {/* ======= Counts Section ======= */}
        <MainCounter data={aboutData.whoWeAreCounter} />
        {/* End Counts Section */}

        {/* ======= Values Section ======= */}
        <MainValues data={valuesData} />
        {/* End Values Section */}

        {/* ======= Services Section ======= */}
        <MainBooklet data={bookletsData} />
        {/* End Services Section */}

        {/* ======= Team Section ======= */}
        <MainTeam teamArr={mainStaffData} />
        {/* End Team Section */}

        {/* ======= F.A.Q Section ======= */}
        <MainFAQ data={faqData} />
        {/* End F.A.Q Section */}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const mainPage = await client.fetch(`*[_type == 'mainPage']`);
  const mainStaffData = await client.fetch(mainStaffListQuery);

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      mainMenuQO,
      mainPage,
      mainStaffData,
    },
  };
}
