import { useState, useEffect } from "react";
import Head from 'next/head'
import { urlFor } from "../../../lib/client";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";

// Client connection
import { menuItems } from '@/components/Header/menuItems';
import { client, clientConfig } from "@/lib/client";
import { mainMenuQueriesObjCreator, chapterItemQuery, slugCurrent } from '@/lib/queries';
import { menuCreator, menuItemsMerger } from '@/lib/menuCreator';

// Components
import Header from "/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";

// Other libs
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";


const PersonInfo = ({
  personItem,
  mainMenuQO,
}) => {

  const [open, setOpen] = useState(false);

  const { mainPhoto,
    firstName,
    secondName,
    fatherName,
    sciDegree,
    acadStatus,
    position,
    edGuarantee,
    education,
    achievements,
    experience,
    sciWork,
    sciInterests,
    publications,
    inventions,
    sciProjects,
    reviewing,
    reviewedDissertations,
    languages,
    internship,
    certificates,
    awards,
    teachingSubjectList,
    imageGallery,
    bio,
    slug,
  } = personItem;
  const name = `${firstName} ${secondName} ${fatherName}`
  const personMetaDescription = `${name} | Біографія та професійний шлях`
  const galleryArray = imageGallery?.map(el => { return { src: urlFor(el).url() } })

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
        <title>{name} | Кафедра електричної інженерії ТНТУ</title>
        <meta name="description" content={personMetaDescription} />
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Про кафедру"
        pageTitle="Колектив"
        pageUrl="/about/staff"
        subPageTitle={name}
        subPageUrl={slug.current}
      />

      {/* < !-- ======= Features Section ======= --> */}
      <section className="features my-personal">
        <div className="container" data-aos="fade-up">

          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons" data-aos="fade-up">

            <div className="row gx-0">
              <h3>{name}</h3>

              <div className="col-xl-4 pt-2 px-2 d-flex" data-aos="fade-right" data-aos-delay="100">
                <div className="row align-self-start">
                  {!galleryArray && <div
                    className="image-container"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={urlFor(mainPhoto).url()}
                      fill
                      priority
                      className="img-fluid rounded image"
                      alt={mainPhoto.caption}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>}
                  {galleryArray && <Link href="#"
                    className="image-container"
                    style={{ position: "relative" }}
                    onClick={() => setOpen(true)}
                  >
                    <Image
                      src={urlFor(mainPhoto).url()}
                      fill
                      priority
                      className="img-fluid rounded image"
                      alt={mainPhoto.caption}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>}
                </div>
              </div>

              <div className="col-xl-8 pt-2 px-2">
                <div className="row align-self-start content text-justify">
                  <div className="icon-box my-dstyle" data-aos="fade-up">
                    {sciDegree && <h4>Науковий ступінь: <span className="h5">{sciDegree}(напис має бути повністю))</span> </h4>}
                    {acadStatus && <h4>Вчене звання: <span className="h5">{acadStatus}</span> </h4>}
                    {position && <h4>Посада: <span className="h5">{position.long}</span> </h4>}
                    {edGuarantee && <>
                      <h4>Гарант освітньої програми:</h4>
                      <ul>{edGuarantee.map(el => (<li key={el}>{el}</li>))}</ul>
                    </>}

                    <hr />

                    <p>Посилання (може зробити картинками як було?) </p>

                    <hr />

                    <h4>Освіта:</h4>
                    <ul>{education?.map(el => (
                      <li key={el._key}>
                        <p><strong>{el.university}</strong></p>
                        <BlockContent
                          blocks={el.description}
                          projectId={clientConfig.projectId}
                          dataset={clientConfig.dataset}
                        />
                      </li>
                    ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-12 pt-2 px-2">
                <div className="row align-self-start content text-justify">
                  <div className="icon-box my-dstyle" data-aos="fade-up">
                    <h4>Присудження наукового ступеня:</h4>
                    <p>Кандидат технічних наук, спеціальність 01.02.04 «Механіка деформівного твердого тіла», 2000 р. Диплом ДК 008799. Дисертаційне дослідження на тему: «Прогнозування динамічної повзучості алюмінієвого сплаву».</p>
                    <h4>Присудження наукового звання:</h4>
                    <p>Доцент кафедри менеджменту у виробничій сфері, 2008, атестат доцента ДЦ № 019187.</p>

                    <hr />

                    {achievements && <>
                      <h4>ПРОФЕСІЙНІ ЗДОБУТКИ:</h4>
                      <BlockContent
                        blocks={achievements}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>}
                    {experience && <>
                      <h4>ДОСВІД РОБОТИ:</h4>
                      <ul>
                        {experience.map(el =>
                          <li key={el._key}>
                            <p><strong>{el.jobPlace}</strong></p>
                            <p>{el.jobPosition}</p>
                          </li>
                        )}
                      </ul>

                      <hr />
                    </>}

                    {sciWork && <>
                      <h4>НАУКОВА РОБОТА</h4>
                      <BlockContent
                        blocks={sciWork}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>}
                    <p>[значення, але чи потрібне?] </p>
                    {sciInterests && <>
                      <h4>Наукові інтереси</h4>
                      <ul>
                        {sciInterests.map(el => <li key={el}>{el}</li>)}
                      </ul>
                    </>}
                    {publications && <><h4>Публікації</h4>
                      <BlockContent
                        blocks={publications}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>}
                    {inventions && <><h4>Винахідництво та раціоналізаторство</h4>
                      <BlockContent
                        blocks={inventions}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>}

                    {sciProjects && <><h4>Наукові теми та проєкти</h4>
                      <ul>
                        {sciProjects.map(el => <li key={el}>{el}</li>)}
                      </ul>
                    </>}

                    {reviewing && <><h4>Рецензування</h4>
                      <BlockContent
                        blocks={reviewing}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>}

                    {reviewedDissertations && <><h4>Рецензовані дисертаційні роботи</h4>
                      <BlockContent
                        blocks={reviewedDissertations}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>}

                    <hr />

                    <h4>УМІННЯ ТА НАВИЧКИ</h4>

                    {languages && <h4>Мови: <span className="h5">
                      {languages.map(el => el).join(", ") + "."}
                    </span>
                    </h4>}



                    {internship && <>
                      <h4>Стажування</h4>
                      <ul>
                        {internship.map(el => <li key={el}>{el}</li>)}
                      </ul>
                    </>}
                    {certificates && <><h4>Сертифікати</h4>
                      <ul>
                        {certificates.map(el => <li key={el}>{el}</li>)}
                      </ul>
                    </>}
                    {awards && <><h4>Нагороди та відзнаки</h4>
                      <ul>
                        {awards.map(el => <li key={el}>{el}</li>)}
                      </ul>
                    </>}

                    {teachingSubjectList && <>
                      <hr />
                      <h4>НАВЧАЛЬНІ ДИСЦИПЛІНИ</h4>
                      <ul>
                        {teachingSubjectList.map(el =>
                          <li key={el.teachingSubjectId}>
                            {el.teachingSubjectName} - ID: {el.teachingSubjectId}
                          </li>)}
                      </ul>
                    </>}

                    {bio && <>
                      <hr />
                      <h4>БІОГРАФІЯ</h4>
                      <BlockContent
                        blocks={bio}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>}
                  </div>
                </div>
              </div>

              {/* <div> */}
              {galleryArray && <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={galleryArray}
              />}
              {/* </div> */}

            </div>

          </div>
          {/* <!-- End Feature Icons --> */}

        </div >
      </section >
      {/* <!--End Features Section-- > */}
    </>
  )
}


export default PersonInfo;

export async function getStaticPaths() {

  const persons = await client.fetch(slugCurrent("person"));
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

  const personItem = await client.fetch(chapterItemQuery("person", slug));
  const mainMenuQO = await mainMenuQueriesObjCreator();

  return {
    props: {
      personItem,
      mainMenuQO,
    }
  }
}