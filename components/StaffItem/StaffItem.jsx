import { useState } from "react";
import { urlFor } from "@/lib/client";
import { clientConfig } from "@/lib/client";
import BlockContent from "@sanity/block-content-to-react";

// Components
import RepeatingLists from "@/components/RepeatingLists/RepeatingLists";

// Other Libs
import Image from "next/image";
import Link from "next/link";
import { getCourseId, getFullSciDegree, personPageTitle } from "@/lib/helpers";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Profile logos
import tntuNTBLogo from "../../public/images/profileLogos/tntulibrary.jpg";
import googleScholarLogo from "../../public/images/profileLogos/googlescholar.jpg";
import scopusLogo from "../../public/images/profileLogos/scopus.jpg";
import orcidLogo from "../../public/images/profileLogos/orcid.jpg";
import rgsnLogo from "../../public/images/profileLogos/researchgate.jpg";
import rIDtrLogo from "../../public/images/profileLogos/researcherid.jpg";
import fbLogo from "../../public/images/profileLogos/facebook.jpg";
import liLogo from "../../public/images/profileLogos/linkedin.jpg";
import iCiLogo from "../../public/images/profileLogos/indexcopernicus.jpg";

const StaffItem = ({ personInfo }) => {
  const [open, setOpen] = useState(false);

  const {
    mainPhoto,
    firstName,
    secondName,
    fatherName,
    sciDegree,
    acadStatus,
    position,
    edGuarantee,
    socials,
    education,
    achievements,
    experience,
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
  } = personInfo;

  // console.log("personInfo", personInfo);

  const name = (
    <>
      <span className="text-uppercase">{firstName}</span>
      <br /> {secondName} {fatherName}
    </>
  );

  const galleryArray = imageGallery?.map((el) => {
    return { src: urlFor(el).url() };
  });

  const sciDegreeFullName = getFullSciDegree(sciDegree);

  const { tntuNTB, googleScholar, scopus, orcid, rgsn, rIDtr, fb, li, iCi } =
    socials;

  function socialsPresent() {
    if (
      tntuNTB ||
      googleScholar ||
      scopus ||
      orcid ||
      rgsn ||
      rIDtr ||
      fb ||
      li ||
      iCi
    )
      return true;
    else return false;
  }

  const scheduleLink = `http://tntu.edu.ua/?p=uk/schedule&t=${firstName}+${secondName}+${fatherName}`;

  return (
    <section className="features my-personal">
      <div className="container" data-aos="fade-up">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          <div className="row gx-0 staffItem">
            <h3>{personPageTitle(position)}</h3>

            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <div className="col-xl-4 pt-2 px-2 d-flex">
                <div
                  className="image-container"
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <Image
                    src={urlFor(mainPhoto).url()}
                    fill
                    // priority
                    className="img-fluid rounded image"
                    alt={`Full name`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onClick={() => setOpen(true)}
                  />
                </div>
              </div>

              <div className="col-xl-4 pt-2 px-2 d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column text-center">
                  <h3>{name}</h3>
                  {sciDegree !== "Немає" && (
                    <h5>
                      Науковий ступінь:{" "}
                      <span className="h5">{sciDegreeFullName}</span>{" "}
                    </h5>
                  )}
                  {acadStatus !== "Немає" && (
                    <h5>
                      Вчене звання: <span className="h5">{acadStatus}</span>{" "}
                    </h5>
                  )}
                  {position && (
                    <h5>
                      Посада: <span className="h5">{position}</span>{" "}
                    </h5>
                  )}
                  <h5 className="pt-2">
                    <Link href={scheduleLink}>Розклад на сторінці ТНТУ</Link>
                  </h5>
                  {socialsPresent() && (
                    <div className="d-flex justify-content-center flex-wrap mt-2 mb-4">
                      {tntuNTB && (
                        <Link href={tntuNTB}>
                          <Image
                            src={tntuNTBLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {googleScholar && (
                        <Link href={googleScholar}>
                          <Image
                            src={googleScholarLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {scopus && (
                        <Link href={scopus}>
                          <Image
                            src={scopusLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {orcid && (
                        <Link href={orcid}>
                          <Image
                            src={orcidLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {rgsn && (
                        <Link href={rgsn}>
                          <Image
                            src={rgsnLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {rIDtr && (
                        <Link href={rIDtr}>
                          <Image
                            src={rIDtrLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {fb && (
                        <Link href={fb}>
                          <Image
                            src={fbLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {li && (
                        <Link href={li}>
                          <Image
                            src={liLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                      {iCi && (
                        <Link href={iCi}>
                          <Image
                            src={iCiLogo}
                            width={80}
                            // height={40}
                            alt="Науково-технічна бібліотека ТНТУ"
                          />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-xl-12 pt-2 px-2">
              <div className="row align-self-start content text-justify">
                <div className="icon-box my-dstyle">
                  <hr />
                  {edGuarantee && (
                    <>
                      <h4>Гарант освітньої програми:</h4>
                      <ul className="listGap">
                        {edGuarantee.map(({ edProgTitle, _key }) => {
                          return <li key={_key}>{edProgTitle}</li>;
                        })}
                      </ul>
                    </>
                  )}

                  <h4>Освіта</h4>
                  <RepeatingLists listTitle={education} />

                  {achievements && (
                    <>
                      <h4>Професійні здобутки</h4>
                      <hr />
                      <BlockContent
                        blocks={achievements}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>
                  )}

                  {experience && (
                    <>
                      <h4>Досвід роботи</h4>
                      <RepeatingLists listTitle={experience} />
                    </>
                  )}

                  <br />
                  <h4>НАУКОВА РОБОТА</h4>
                  <hr />
                  {sciInterests && (
                    <>
                      <h4>Наукові інтереси</h4>
                      <ul className="listGap">
                        {sciInterests.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {publications && (
                    <>
                      <h4>Публікації</h4>
                      <BlockContent
                        blocks={publications}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>
                  )}
                  {inventions && (
                    <>
                      <h4>Винахідництво та раціоналізаторство</h4>
                      <BlockContent
                        blocks={inventions}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>
                  )}

                  {sciProjects && (
                    <>
                      <h4>Наукові теми та проєкти</h4>
                      <ul className="listGap">
                        {sciProjects.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {reviewing && (
                    <>
                      <h4>Рецензування</h4>
                      <BlockContent
                        blocks={reviewing}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>
                  )}

                  {reviewedDissertations && (
                    <>
                      <h4>Рецензовані дисертаційні роботи</h4>
                      <BlockContent
                        blocks={reviewedDissertations}
                        projectId={clientConfig.projectId}
                        dataset={clientConfig.dataset}
                      />
                    </>
                  )}

                  <br />
                  <h4>УМІННЯ ТА НАВИЧКИ</h4>
                  <hr />

                  {languages && (
                    <>
                      <h4>Мови:</h4>
                      <ul>
                        {languages.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {internship && (
                    <>
                      <h4>Стажування</h4>
                      <ul className="listGap">
                        {internship.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {certificates && (
                    <>
                      <h4>Сертифікати</h4>
                      <ul className="listGap">
                        {certificates.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {awards && (
                    <>
                      <h4>Нагороди та відзнаки</h4>
                      <ul className="listGap">
                        {awards.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {teachingSubjectList && (
                    <>
                      <br />
                      <h4>НАВЧАЛЬНІ ДИСЦИПЛІНИ</h4>
                      <hr />
                      <ul className="listGap">
                        {teachingSubjectList.map((el) => (
                          <li key={el._key}>
                            <Link href={el.teachingSubjectURL}>
                              {el.teachingSubjectName} - ID:{" "}
                              {getCourseId(el.teachingSubjectURL)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* <div> */}
            {galleryArray && (
              <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={galleryArray}
              />
            )}
            {/* </div> */}
          </div>
        </div>
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
};

export default StaffItem;
