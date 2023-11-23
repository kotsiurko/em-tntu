import { useEffect, useState } from 'react'
import Head from 'next/head'

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterPageQuery, slugCurrent } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

// Components
import Header from '@/components/Header/Header';
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import PageContentSection from '@/components/PageContentSection/PageContentSection';
import Image from 'next/image';
import Link from 'next/link';


const OtherPage = ({ chapterPage, mainMenuQO }) => {

  const { title, slug, metaDescription } = chapterPage;

  // console.log('Other Page  :>> ', chapterPage);

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

  }, [chapterPage, mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: {title}</title>
        <meta name="description" content={metaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Наука"
        pageTitle={title}
        pageUrl={slug.current}
      />

      <PageContentSection data={chapterPage} />

      {/* ТУТ МАЄ БУТИ СПИСОК ІЗ ГЕРОЯМИ */}
      <section className="features my-personal">
        <div className="container" data-aos="fade-up">
          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons">
            <div className="row gx-0">
              <h3>Тарас Щирба</h3>

              <div
                className="col-xl-4 pt-2 px-2 d-flex"
              >
                <div
                  className="image-container"
                  style={{ position: "relative" }}
                >
                  <Image
                    // src={urlFor(mainPhoto).url()}
                    // src={`https://cdn.sanity.io/images/asnyakur/production/0884ab8625644d1a4f01a1b1249536a90536ff88-640x480.png`}
                    // src={`https://cdn.sanity.io/images/asnyakur/production/95dcb207bcdb34bf004a5fa962f997a1268faddc-960x1280.jpg`}
                    src={`https://cdn.sanity.io/images/asnyakur/production/51473fe4f578d954f380aad6f9fb2c5cbab66ae4-907x1109.webp`}
                    fill
                    priority
                    className="img-fluid rounded image"
                    // alt={`${firstName} ${secondName}`}
                    alt={`Full name`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div
                className="col-xl-8 pt-2 px-2 d-flex"
              >
                <div className="row align-self-start">
                  <p>Тут буде коротка інформація про загиблого героя</p>
                  <p>Тарас Щирба був працівником КП «Тернопільміськсвітло». У нього залишилась дружина та троє неповнолітніх дітей.
                    Боєць віддав своє життя заради свободи й мирного неба над Україною.
                    Він назавжди залишиться у пам`яті тих, хто його знав, мужнім сином українського народу, відважним воїном та справжнім захисником.
                    Шана та вічна пам’ять Герою!
                    Хай Господь дарує Царство Небесне та вічний спокій його душі!
                    Не забудемо його подвиг та героїзм!
                  </p>
                  <p>У коментарях у соцмережі — сотні дописів зі словами співчуття.
                    Юрій Констанкевич пише: Господи, я не можу повірити... Михайло Михайлович, щирі співчуття Вам і рідним, Вічна пам`ять Героєві Тарасу і Царство Небесне.
                    Marynovska Halyna висловлює співчуття: Вічна пам‘ять та Слава відважному воїну . Розділяємо біль з рідними та близькими Героя  схиляємо голову в глибокій скорботі та молитві  Сили Вам пережити цю непоправну втрату. Нехай Господь прийме Героя у свої обійми , втамує біль і заповнить пустку в серцях батьків і рідних . Світла пам‘ять і вічна шана Герою
                    Катерина Гордзій пише: Схиляю голову в скорботі...Цвіт Ясний гине...Царство Небеснеє і Вічная пам`ять...Щирі співчуття рідним...
                    Ольга Зарічна Михалик співчуває: Співчуття батаькам та рідним , Божої підтримки пережити вам це горе а Тарасу вічна память нехай з Богом спочиває!</p>
                </div>
              </div>

            </div>
            <div className="row gx-0 mt-4">



              {/* НОВИНА №1 */}
              <div
                className="col-lg-6 p-3 d-flex align-items-stretch"
              // key={newsItemLink}
              >
                <div className="member news">
                  <div className="position-relative">
                    <Image
                      // src={urlFor(mainPhoto).url()}
                      src={`https://cdn.sanity.io/images/asnyakur/production/0884ab8625644d1a4f01a1b1249536a90536ff88-640x480.png`}
                      className="img-fluid image-fit"
                      // alt={mainPhoto.caption}
                      alt='some title'
                      sizes="(max-width: 768px) 100vw"
                      fill={true}
                    />
                  </div>
                  <div className="member-info news">
                    <Link href='/'>
                      <h5>У боях на Донеччині загинув тернополянин Тарас Щирба</h5>
                    </Link>

                    <p>Співчуття з приводу загибелі тернополянина, солдата Тараса Щирби висловив міський голова Сергій Надал.
                      — Тернопіль знову у скорботі. Захищаючи Україну від московської орди, в боях на Донеччині...</p>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Link href='/'>
                        <span style={{ color: "blue" }}>Читати далі...</span>
                      </Link>
                      <span className="publishDate">
                        {/* Опубліковано: {moment(publishedDate).format("YYYY-MM-DD")} */}
                        Джерело: 20minut.ua
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* НОВИНА №2 */}
              <div
                className="col-lg-6 p-3 d-flex align-items-stretch"
              // key={newsItemLink}
              >
                <div className="member news">
                  <div className="position-relative">
                    <Image
                      // src={urlFor(mainPhoto).url()}
                      src={`https://cdn.sanity.io/images/asnyakur/production/0884ab8625644d1a4f01a1b1249536a90536ff88-640x480.png`}
                      className="img-fluid image-fit"
                      // alt={mainPhoto.caption}
                      alt='some title'
                      sizes="(max-width: 768px) 100vw"
                      fill={true}
                    />
                  </div>
                  <div className="member-info news">
                    <Link href='/'>
                      <h5>Президент вручив паспорт 14-річному тернополянину, сину загиблого Героя Тараса Щирби</h5>
                    </Link>

                    <p>З нагоди Дня Української Державності Президент України Володимир Зеленський вручив паспорти громадянина України 16 юним українцям, які досягли 14-річного віку. Серед них  і тернополянин Арсен Щирба.</p>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <Link href='/'>
                        <span style={{ color: "blue" }}>Читати далі...</span>
                      </Link>
                      <span className="publishDate">
                        {/* Опубліковано: {moment(publishedDate).format("YYYY-MM-DD")} */}
                        Джерело: 20minut.ua
                      </span>
                    </div>
                  </div>
                </div>
              </div>





            </div>
          </div>
          {/* <!-- End Feature Icons --> */}
        </div>
      </section>

    </>
  )
}



export default OtherPage;

export async function getStaticPaths() {
  const query = slugCurrent('other');

  const pages = await client.fetch(query);
  const paths = pages.map((page) => ({
    params: {
      slug: page.slug.current
    }
  }));
  return {
    paths, fallback: 'blocking'
  }
}

export async function getStaticProps({ params: { slug } }) {
  const chapterPage = await client.fetch(chapterPageQuery('other', slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      chapterPage,
      mainMenuQO,
    }
  }
}
