import { useState } from "react";
import { urlFor } from "@/lib/client";
import { clientConfig } from "@/lib/client";
import BlockContent from "@sanity/block-content-to-react";

// Components
import RepeatingLists from "@/components/RepeatingLists/RepeatingLists";

// Other Libs
import Image from "next/image";
import Link from "next/link";
import { getFullSciDegree } from "@/lib/helpers";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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

  // console.log("personItem", personItem);

  const name = `${firstName} ${secondName} ${fatherName}`;
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

  return (
    <section className="features my-personal">
      <div className="container" data-aos="fade-up">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          <div className="row gx-0">
            <h3>{name}</h3>

            <div
              className="col-xl-4 pt-2 px-2 d-flex"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="row align-self-start">
                {!galleryArray && (
                  <div
                    className="image-container"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={urlFor(mainPhoto).url()}
                      fill
                      priority
                      className="img-fluid rounded image"
                      alt={`${firstName} ${secondName}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                {galleryArray && (
                  <Link
                    href="#"
                    className="image-container"
                    style={{ position: "relative" }}
                    onClick={() => setOpen(true)}
                  >
                    <Image
                      src={urlFor(mainPhoto).url()}
                      fill
                      priority
                      className="img-fluid rounded image"
                      alt={`${firstName} ${secondName}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                )}
              </div>
            </div>

            <div className="col-xl-8 pt-2 px-2">
              <div className="row align-self-start content text-justify">
                <div className="icon-box my-dstyle">
                  {/* <div className="icon-box my-dstyle" data-aos="fade-up"> */}
                  {sciDegree !== "Немає" && (
                    <h4>
                      Науковий ступінь:{" "}
                      <span className="h5">{sciDegreeFullName}</span>{" "}
                    </h4>
                  )}
                  {acadStatus !== "Немає" && (
                    <h4>
                      Вчене звання: <span className="h5">{acadStatus}</span>{" "}
                    </h4>
                  )}
                  {position && (
                    <h4>
                      Посада: <span className="h5">{position}</span>{" "}
                    </h4>
                  )}

                  <hr />

                  {edGuarantee && (
                    <>
                      <h4>Гарант освітньої програми:</h4>
                      <ul>
                        {edGuarantee.map(({ edProgTitle, _key }) => {
                          return <li key={_key}>{edProgTitle}</li>;
                        })}
                      </ul>
                    </>
                  )}

                  {socialsPresent() && (
                    <h4>
                      Профілі на порталах науковометричних баз та соцмереж
                    </h4>
                  )}
                  {socialsPresent() && (
                    <ul>
                      {tntuNTB && (
                        <li>
                          <Link href={tntuNTB}>
                            Науково-технічна бібліотека ТНТУ
                          </Link>
                        </li>
                      )}
                      {googleScholar && (
                        <li>
                          <Link href={googleScholar}>Google Scholar</Link>
                        </li>
                      )}
                      {scopus && (
                        <li>
                          <Link href={scopus}>Scopus</Link>
                        </li>
                      )}
                      {orcid && (
                        <li>
                          <Link href={orcid}>ORCID</Link>
                        </li>
                      )}
                      {rgsn && (
                        <li>
                          <Link href={rgsn}>ResearchGate SN</Link>
                        </li>
                      )}
                      {rIDtr && (
                        <li>
                          <Link href={rIDtr}>ResearcherID TR</Link>
                        </li>
                      )}
                      {fb && (
                        <li>
                          <Link href={fb}>Facebook</Link>
                        </li>
                      )}
                      {li && (
                        <li>
                          <Link href={li}>LinkedIn</Link>
                        </li>
                      )}
                      {iCi && (
                        <li>
                          <Link href={iCi}>Index Copernicus International</Link>
                        </li>
                      )}
                    </ul>
                  )}

                  <h4>Освіта</h4>
                  <RepeatingLists listTitle={education} />
                </div>
              </div>
            </div>

            <div className="col-xl-12 pt-2 px-2">
              <div className="row align-self-start content text-justify">
                <div className="icon-box my-dstyle">
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
                      <ul>
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
                      <ul>
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
                    <h4>
                      Мови:{" "}
                      <span className="h5">
                        {languages.map((el) => el).join(", ") + "."}
                      </span>
                    </h4>
                  )}

                  {internship && (
                    <>
                      <h4>Стажування</h4>
                      <ul>
                        {internship.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {certificates && (
                    <>
                      <h4>Сертифікати</h4>
                      <ul>
                        {certificates.map((el) => (
                          <li key={el}>{el}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {awards && (
                    <>
                      <h4>Нагороди та відзнаки</h4>
                      <ul>
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
                      <ul>
                        {teachingSubjectList.map((el) => (
                          <li key={el.teachingSubjectId}>
                            {el.teachingSubjectName} - ID:{" "}
                            {el.teachingSubjectId}
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
