import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google';

import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';
// import styles from '@/styles/Home.module.css'



// Components
import Header from "/components/Header/Header";

// Images
import electricMan from '../public/assets/img/hero-img.png'
import Tarasenko from '../public/assets/img/team/tarasenko.jpg'
import Koval from '../public/assets/img/team/koval.jpg'
import Lupenko from '../public/assets/img/team/lupenko.jpg'
import Andriychuk from '../public/assets/img/team/andriychuk.jpg'
import MainFAQ from '@/components/MainFAQ/MainFAQ';
import MainAbout from '@/components/MainAbout/MainAbout';
import MainCounter from '@/components/MainCounter/MainCounter';
import MainValues from '@/components/MainValues/MainValues';
import MainBooklet from '@/components/MainBooklet/MainBooklet';



const inter = Inter({ subsets: ['latin'] })

export default function Home({ mainMenuQO, mainPage }) {

  // console.log('mainPage data:>> ', mainPage);
  const aboutData = mainPage.find(el => el.title === 'Хто ми є');
  const faqData = mainPage.find(el => el.title === 'Часті питання');
  const valuesData = mainPage.find(el => el.title === 'Наші цінності');
  const bookletsData = mainPage.find(el => el.title === 'Буклети');
  // bookletsList
  // console.log('valuesData :>> ', valuesData);

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
  }, [mainMenuQO]);




  return (
    <>
      <Head>
        <title>Головна | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description"
          content='Кафедра Електричної Інженерії Тернопільського національного технічного університету імені Івана Пулюя. Спеціальність 141 " Електроенергетика, електротехніка та електромеханіка"' />
      </Head>

      <>

        <Header mainMenuArr={mainMenuArr} />

        {/* ======= Hero Section ======= */}
        <section id="hero" className="hero d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">Кафедра <br /> Електричної Інженерії ТНТУ ім. І.Пулюя</h1>
                <h2 data-aos="fade-up" data-aos-delay="400">Спеціальність 141 <br /> &ldquo;Електроенергетика, електротехніка та електромеханіка&rdquo;</h2><br />
                <h3 data-aos="fade-up" data-aos-delay="400" className="h5">Шукаємо талановитих абітурієнтів, які хочуть пов`язати своє життя з електротехнікою та інженерією</h3>
                <div data-aos="fade-up" data-aos-delay="600">
                  <div className="text-center text-lg-start">
                    <a href="#faq" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                      <span>Навчатись в нас</span>
                      <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div >
              <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
                <Image
                  src={electricMan}
                  alt="Picture of the man near electric box"
                  className="img-fluid"
                  style={{ width: '100%', hight: '100%' }}
                  priority="true"
                />
              </div>
            </div >
          </div >
        </section >
        {/* End Hero */}




        {/* ------------------------------------------------------------------------------- */}

        {/* ======= Links Section ======= */}
        {/* <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Структура</h2>
              <p>Карта сайту</p>
            </header>

            <div className="row gy-4">

              <div className="col">

                <div className="row gy-4 my-font-size">


                  {mainMenuArr.map(({ id, title, url, icon, children }) => {
                    return (
                      <div className="col-lg-4 col-md-6 col-sm-12" key={id}>
                        <div className="info-box">
                          <i className={icon}></i>
                          <h3>{title}</h3>
                          {children.map(({ title, url, children }) => {
                            return (
                              <div key={title} className='row'>
                                <p><a href={url}><i className="bi bi-arrow-right"></i>{title}</a></p>
                                <div className='mх-3'>
                                  {
                                    children && children.map((el) => {
                                      return (
                                        <p key={el.title}><a href={el.url}><i className="bi bi-dot"></i>{el.title}</a></p>
                                      )
                                    })
                                  }
                                </div>

                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}

                </div>

              </div>

            </div>

          </div>

        </section> */}
        {/* End Links Section */}



        {/* ------------------------------------------------------------------------------- */}

        {/* ======= About Section ======= */}
        {/* <MainAbout data={aboutData} /> */}
        {/* End About Section */}



        {/* ------------------------------------------------------------------------------- */}

        {/* ======= Counts Section ======= */}
        {/* <MainCounter data={aboutData.whoWeAreCounter} /> */}
        {/* End Counts Section */}



        {/* ------------------------------------------------------------------------------- */}

        {/* ======= Values Section ======= */}
        {/* <MainValues data={valuesData} /> */}
        {/* End Values Section */}



        {/* ------------------------------------------------------------------------------- */}

        {/* ======= Services Section ======= */}
        {/* <MainBooklet data={bookletsData} /> */}
        {/* End Services Section */}



        {/* ------------------------------------------------------------------------------- */}

        {/* ======= Team Section ======= */}
        <section id="team" className="team">
          <div className="container" data-aos="fade-up">

            <header className="section-header">
              <h2>Викладачі</h2>
              <p>Керівний та професорський склад кафедри</p>
            </header>

            <div className="row gy-4">

              {/* ТАРАСЕНКО */}
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
                <div className="member">
                  <div className="member-img">
                    <Image
                      src={Tarasenko}
                      alt="Тарасенко Микола Григорович"
                      className="img-fluid"
                    />
                    <div className="social">
                      <a href="person.aspx?name=tarasenko"><i className="bi bi-person-circle"></i></a>
                      <a href="http://library.tntu.edu.ua/personaliji/a/t/tarasenko-mykola-hryhorovych/"><i className="bi bi-collection"></i></a>
                      <a href="http://scholar.google.com.ua/citations?user=ysrc8PUAAAAJ"><i className="bi bi-google"></i></a>
                      <a href="https://www.scopus.com/authid/detail.uri?authorId=7005037902"><i className="bi bi-bank"></i></a>
                    </div>
                  </div>
                  <a href="person.aspx?name=tarasenko">
                    <div className="member-info">
                      <h4>ТАРАСЕНКО
                        <br />
                        Микола Григорович</h4>
                      <span>доктор технічних наук, професор,</span>
                      <span>завідувач кафедри</span>
                      <p>
                        Qualitative education secures future!<br />
                        Якісна освіта –<br />
                        забезпечене майбутнє!
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* КОВАЛЬ */}
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="200">
                <div className="member">
                  <div className="member-img">
                    <Image
                      src={Koval}
                      alt="Коваль Вадим Петрович"
                      className="img-fluid"
                    />
                    <div className="social">
                      <a href="person.aspx?name=koval"><i className="bi bi-person-circle"></i></a>
                      <a href="http://library.tntu.edu.ua/personaliji/a/k/koval-vadym-petrovych/"><i className="bi bi-collection"></i></a>
                      <a href="http://scholar.google.com.ua/citations?user=ERKvEsgAAAAJ"><i className="bi bi-google"></i></a>
                      <a href="https://www.facebook.com/koval.vp"><i className="bi bi-facebook"></i></a>
                      <a href="https://www.linkedin.com/in/vadim-koval-a2a717a6/"><i className="bi bi-linkedin"></i></a>
                    </div>
                  </div>
                  <a href="person.aspx?name=koval">
                    <div className="member-info">
                      <h4>КОВАЛЬ
                        <br />
                        Вадим Петрович</h4>
                      <span>кандидат технічних наук, доцент,</span>
                      <span>заступник зав. кафедри</span>
                      <p>&ldquo;Почніть робити те, що потрібно. Потім робіть те, що можливо. І ви раптом виявите, що робите неможливе.&rdquo; – cв.Франциск Асізський</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* ЛУПЕНКО */}
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="300">
                <div className="member">
                  <div className="member-img">
                    <Image
                      src={Lupenko}
                      alt="Лупенко Анатолій Миколайович"
                      className="img-fluid"
                    />
                    <div className="social">
                      <a href="person.aspx?name=lupenko"><i className="bi bi-person-circle"></i></a>
                      <a href="http://library.tntu.edu.ua/personaliji/a/l/lupenko-anatolij-mykolajovych/"><i className="bi bi-collection"></i></a>
                      <a href="http://scholar.google.com.ua/citations?user=FTgpQYkAAAAJ"><i className="bi bi-google"></i></a>
                      <a href="https://www.scopus.com/authid/detail.uri?authorId=24721899200"><i className="bi bi-bank"></i></a>
                      <a href="https://www.facebook.com/lupenkoan"><i className="bi bi-facebook"></i></a>
                    </div>
                  </div>
                  <a href="person.aspx?name=lupenko">
                    <div className="member-info">
                      <h4>ЛУПЕНКО
                        <br />
                        Анатолій Миколайович</h4>
                      <span>доктор технічних наук,<br />
                        професор</span>
                      <p>Щоб досягти мети,<br /> насамперед - до неї вперто<br /> треба йти!</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* АНДРІЙЧУК */}
              <div className="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="400">
                <div className="member">
                  <div className="member-img">
                    <Image
                      src={Andriychuk}
                      alt="Андрійчук Володимир Андрійович"
                      className="img-fluid"
                    />
                    <div className="social">
                      <a href="person.aspx?name=andrijchuk"><i className="bi bi-person-circle"></i></a>
                      <a href="http://library.tntu.edu.ua/personaliji/a/a/andrijchuk-volodymyr-andrijovych"><i className="bi bi-collection"></i></a>
                      <a href="http://scholar.google.com.ua/citations?user=qMKPSIkAAAAJ"><i className="bi bi-google"></i></a>
                      <a href="https://www.scopus.com/authid/detail.uri?authorId=51563142500"><i className="bi bi-bank"></i></a>
                      <a href="https://www.facebook.com/profile.php?id=100012418380056"><i className="bi bi-facebook"></i></a>
                    </div>
                  </div>
                  <a href="person.aspx?name=andrijchuk">
                    <div className="member-info">
                      <h4>АНДРІЙЧУК
                        <br />
                        Володимир Андрійович</h4>
                      <span>доктор технічних наук,<br />
                        професор</span>
                      <p>
                        Учитись, навчати<br />
                        та впроваджувати набуте<br />
                        в життя!
                      </p>
                    </div>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>
        {/* End Team Section */}



        {/* ------------------------------------------------------------------------------- */}

        {/* ======= F.A.Q Section ======= */}
        {/* <MainFAQ data={faqData} /> */}
        {/* End F.A.Q Section */}

      </>

    </>
  )
}


export async function getStaticProps() {

  const mainPage = await client.fetch(`*[_type == 'mainPage']`);

  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      mainMenuQO,
      mainPage,
    },
  };
}