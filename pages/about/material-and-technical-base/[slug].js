import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Client connection
import { client } from "lib/client";

// Helpers
import { menuItems } from "components/Header/menuItems";
import {
  mainMenuQueriesObjCreator,
  chapterItemQuery,
  slugCurrent,
  newsPerPage,
} from "lib/queries";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { getPortion } from "lib/helpers";

// Components
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import PageContentSection from "components/PageContentSection/PageContentSection";
import NewsItems from "components/NewsItems/NewsItems";
import NewPagination from "components/Pagination/NewPagination";
import EduLabsList from "components/EduLabsList/EduLabsList";

const newsBool = "eduLabsBool";

// -----------------------------------------------------------------
// ------ Page STARTS here -----------------------------------------

const AboutMTBPage = ({ aboutMTBPage, totalNewsAmount, mainMenuQO }) => {

  const { title, slug, metaDescription, labsList } = aboutMTBPage;

  const router = useRouter();

  const [resultQuery, setResultQuery] = useState();
  const [currPage, setCurrPage] = useState();

  useEffect(() => {
    if (router.asPath.includes("?page=")) {
      // розрізаю стрічку адреси пополам і дістаю з неї праву частину
      const pageNum = parseInt(router.asPath.split("?page=")[1]);
      setCurrPage(pageNum);
      getData(pageNum);
    } else {
      setCurrPage(1);
      getData(1);
    }
  }, [router.asPath]);

  async function getData(page) {
    const res = await getPortion(page, newsBool);
    setResultQuery(res);
  }

  // MENU FORMATION PART ==============================================

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [aboutMTBPage, mainMenuQO]);

  // MENU FORMATION PART ENDS =========================================

  return (
    <>
      <Head>
        <title>{`${title} | Кафедра електричної інженерії ТНТУ`}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Матеріально-технічна база"
        pageUrl={null}
        subPageTitle={title}
        subPageUrl={slug.current}
      />

      {/* < !-- ======= Features Section ======= --> */}
      {slug.current !==
        "/about/material-and-technical-base/educational-labs" && (
          <PageContentSection data={aboutMTBPage} />
        )}

      {/* ======= Inner Page Team-Staff Section ======= */}
      {slug.current ===
        "/about/material-and-technical-base/educational-labs" && (
          <>
            {/* <section className="features my-personal">
              <div className="container">
                <div className="row feature-icons">
                  <div className="row gx-0">
                    <h3>Навчальні лабораторії</h3>

                    <table className="table table-striped table-hover table-sm">
                      <tbody>
                        <tr>
                          <th>Номер</th>
                          <th>Назва лабораторії (аудиторії)</th>
                          <th>Площа, кв.м.</th>
                          <th>К-ть. місць</th>
                        </tr>
                        <tr>
                          <td>К7-106</td>
                          <td>
                            Лабораторія електроніки та мікропроцесорної техніки
                          </td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-107</td>
                          <td>Викладацька аудиторія</td>
                          <td align="center">72</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-109</td>
                          <td>Лабораторія електротехніки (частина 1)</td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-110</td>
                          <td>Лабораторія електротехніки (частина 2)</td>
                          <td align="center">54</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-111</td>
                          <td>Лабораторія фотометрії</td>
                          <td align="center">72</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-307</td>
                          <td>Лабораторія електричних вимірювань</td>
                          <td align="center">36</td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-308</td>
                          <td>Комп’ютерний клас</td>
                          <td align="center">72</td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-309 (а)</td>
                          <td>Викладацька аудиторія</td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-309 (б)</td>
                          <td>
                            Лабораторія телеметрії та дистанційного керування
                            енергооб’єктами
                          </td>
                          <td align="center">36</td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-310</td>
                          <td>Лекційна аудиторія</td>
                          <td align="center">36</td>
                          <td align="center">30</td>
                        </tr>
                        <tr>
                          <td>К7-311</td>
                          <td>
                            Лабораторія релейного захисту і автоматизації, станцій
                            і підстанцій
                          </td>
                          <td align="center">36</td>
                          <td align="center">20</td>
                        </tr>
                        <tr>
                          <td>К7-312</td>
                          <td>Лабораторія діагностування та надійності систем</td>
                          <td align="center">36</td>
                          <td align="center">14</td>
                        </tr>
                        <tr>
                          <td>К7-401</td>
                          <td>
                            Лабораторія нетрадиційних та поновлювальних джерел
                            енергії і термодинаміки
                          </td>
                          <td align="center">36</td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-402</td>
                          <td>
                            Науково-дослідна лабораторія енергоощадності та
                            проблем енергетики
                          </td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-403</td>
                          <td>Викладацька аудиторія</td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-404</td>
                          <td>Лекційна аудиторія</td>
                          <td align="center">72</td>
                          <td align="center">64</td>
                        </tr>
                        <tr>
                          <td>К7-405</td>
                          <td>
                            Робочий кабінет д.т.н., професора Тарасенка М.Г.
                            (завідувач кафедри)
                          </td>
                          <td align="center">18</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-406</td>
                          <td>
                            Лабораторія споживачів електричної енергії та
                            енергетичного менеджменту
                          </td>
                          <td align="center">54</td>
                          <td align="center">20</td>
                        </tr>
                        <tr>
                          <td>К7-407</td>
                          <td>Лекційна аудиторія</td>
                          <td align="center">72</td>
                          <td align="center">52</td>
                        </tr>
                        <tr>
                          <td>К7-408</td>
                          <td>Експертно-аналітична лабораторія</td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-409</td>
                          <td>Комп’ютерний клас</td>
                          <td align="center">36</td>
                          <td align="center">16</td>
                        </tr>
                        <tr>
                          <td>К7-411</td>
                          <td>Навчально-методичний відділ</td>
                          <td align="center">18</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-413</td>
                          <td>Лабораторія теоретичних основ електротехніки</td>
                          <td align="center">90</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-413 (а)</td>
                          <td>
                            Робочий кабінет д.т.н., професора Андрійчука В.А.
                          </td>
                          <td align="center">18</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-414</td>
                          <td>
                            Лабораторія інформаційних та керуючих комплексів
                            енерговикористання і енергопостачання
                          </td>
                          <td align="center">72</td>
                          <td align="center">18</td>
                        </tr>
                        <tr>
                          <td>К7-501</td>
                          <td>
                            Науково-дослідна лабораторія фізичних основ джерел
                            світла
                          </td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-502</td>
                          <td>Лабораторія світлових приладів</td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-503</td>
                          <td>Викладацька аудиторія</td>
                          <td align="center">18</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-504</td>
                          <td>Лекційна аудиторія</td>
                          <td align="center">90</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-505</td>
                          <td>Лабораторія джерел світла та ПРА</td>
                          <td align="center">72</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-506</td>
                          <td>Робочий кабінет д.т.н., професора Лупенка А.М.</td>
                          <td align="center">18</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-507</td>
                          <td>Лабораторія метрологічних вимірювань</td>
                          <td align="center">54</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-508</td>
                          <td>Лабораторія електричних машин</td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-509</td>
                          <td>
                            Лабораторія теплоелектроцентралей, котельнь,
                            теплосистем і теплопостачання
                          </td>
                          <td align="center">36</td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-511</td>
                          <td>Лабораторія світлотехнічних установок</td>
                          <td align="center">36</td>
                          <td align="center"></td>
                        </tr>
                        <tr>
                          <td>К7-600</td>
                          <td>Лабораторія електричних систем та мереж</td>
                          <td align="center"></td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-602</td>
                          <td>
                            Лабораторія автоматизованого електроприводу та
                            електричних машин
                          </td>
                          <td align="center"></td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-603</td>
                          <td>
                            Лабораторія дослідження характеристик ізоляційних
                            матеріалів у системах електроспоживання
                          </td>
                          <td align="center"></td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-604</td>
                          <td>Високовольтна лабораторія</td>
                          <td align="center"></td>
                          <td align="center">8</td>
                        </tr>
                        <tr>
                          <td>К7-703</td>
                          <td>
                            Лабораторія курсового та дипломного проектування
                          </td>
                          <td align="center"></td>
                          <td align="center">12</td>
                        </tr>
                        <tr>
                          <td>К7-704</td>
                          <td>
                            Лабораторія електропостачання промислових та
                            муніципальних об’єктів
                          </td>
                          <td align="center"></td>
                          <td align="center">24</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section> */}

            <EduLabsList labsList={labsList} />

            <section className="team">
              <div className="container" data-aos="fade-up">
                <header className="section-header">
                  <p>Події розділу</p>
                </header>

                <div className="row gy-4">
                  <NewsItems currentItems={resultQuery} />
                </div>

                {/* PAGINATION BLOCK STARTS */}
                {totalNewsAmount > newsPerPage && (
                  <NewPagination
                    totalNewsAmount={totalNewsAmount}
                    currPage={currPage}
                    setResultQuery={setResultQuery}
                    setCurrPage={setCurrPage}
                    newsBool={newsBool}
                  />
                )}
                {/* PAGINATION BLOCK ENDS */}
              </div>
            </section>
          </>
        )}

      {/* ======= End Team-Staff Page Section ======= */}
    </>
  );
};

export default AboutMTBPage;

export async function getStaticPaths() {
  const pages = await client.fetch(slugCurrent("about-mtb"));
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
  const aboutMTBPage = await client.fetch(
    chapterItemQuery("about-mtb", `/about/material-and-technical-base/${slug}`)
  );
  const totalNewsAmount = await client.fetch(
    `count(*[_type == "news" && ${newsBool}])`
  );
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      aboutMTBPage,
      totalNewsAmount,
      mainMenuQO,
    },
  };
}
