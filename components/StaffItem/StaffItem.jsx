import { useState } from "react";
import { urlFor } from "lib/client";
import { clientConfig } from "lib/client";
import BlockContent from "@sanity/block-content-to-react";

// Components
import RepeatingLists from "components/RepeatingLists/RepeatingLists";

// Other Libs
import Image from "next/image";
import Link from "next/link";
import { getCourseId, getFullSciDegree, personPageTitle } from "lib/helpers";

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
import LightBoxCustom from "../LightboxCustom/LightBoxCustom";
import CustomBlockContent from "../CustomBlockContent/CustomBlockContent";

const StaffItem = ({ personInfo }) => {
  const [open, setOpen] = useState(false);

  const closeGallery = (state) => {
    setOpen(state);
  };

  const {
    mainPhoto,
    firstName,
    secondName,
    fatherName,
    sciDegree,
    acadStatus,
    position,
    position_continue,
    additional_requisites,
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
    otherInfo,
    imageGallery,
  } = personInfo;

  // console.log("imageGallery", imageGallery);

  const name = (
    <>
      <span className="text-uppercase">{firstName}</span>
      <br /> {secondName} {fatherName}
    </>
  );

  const sciDegreeFullName = getFullSciDegree(sciDegree);

  const fullPosition = () => {
    if (position === "доцент" || position === "професор") {
      return `${position} ${position_continue}`;
    } else {
      return position;
    }
  };

  let tntuNTB, googleScholar, scopus, orcid, rgsn, rIDtr, fb, li, iCi;

  if (typeof socials !== "undefined" && socials !== null) {
    ({ tntuNTB, googleScholar, scopus, orcid, rgsn, rIDtr, fb, li, iCi } =
      socials);
  }

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
                      <span className="h5">{sciDegreeFullName}</span>
                    </h5>
                  )}
                  {acadStatus !== "Немає" && (
                    <h5>
                      Вчене звання: <span className="h5">{acadStatus}</span>
                    </h5>
                  )}
                  {position && (
                    <h5>
                      Посада: <span className="h5">{fullPosition()}</span>
                    </h5>
                  )}
                  {additional_requisites && (
                    <h5>
                      Додатково:{" "}
                      <span className="h5">{additional_requisites}</span>
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
                  {edGuarantee && edGuarantee.length > 0 && (
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

                  <hr />
                  {achievements && (
                    <CustomBlockContent
                      title="Професійні здобутки"
                      BCObject={achievements}
                    />
                  )}

                  {experience && (
                    <>
                      <h4>Досвід роботи</h4>
                      <RepeatingLists listTitle={experience} />
                    </>
                  )}

                  {(sciInterests ||
                    publications ||
                    inventions ||
                    sciProjects ||
                    reviewing ||
                    reviewedDissertations) && (
                    <>
                      <br />
                      <h4>НАУКОВА РОБОТА</h4>
                      <hr />
                    </>
                  )}

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
                    <CustomBlockContent
                      title="Публікації"
                      BCObject={publications}
                    />
                  )}

                  {inventions && (
                    <CustomBlockContent
                      title="Винахідництво та раціоналізаторство"
                      BCObject={inventions}
                    />
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
                    <CustomBlockContent
                      title="Рецензування"
                      BCObject={reviewing}
                    />
                  )}

                  {reviewedDissertations && (
                    <CustomBlockContent
                      title="Рецензовані дисертаційні роботи"
                      BCObject={reviewedDissertations}
                    />
                  )}

                  <br />
                  <h4>УМІННЯ ТА НАВИЧКИ</h4>
                  <hr />

                  {languages && (
                    <>
                      <h4>Мови:</h4>
                      <ul className="listGap">
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
                            {el.teachingSubjectURL && (
                              <Link href={el.teachingSubjectURL}>
                                {el.teachingSubjectName} - ID:{" "}
                                {getCourseId(el.teachingSubjectURL)}
                              </Link>
                            )}
                            {!el.teachingSubjectURL && (
                              <>{el.teachingSubjectName}</>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {otherInfo && (
                    <CustomBlockContent title="Інше" BCObject={otherInfo} />
                  )}
                </div>
              </div>
            </div>

            {imageGallery && (
              <LightBoxCustom
                imageGallery={imageGallery}
                isOpen={open}
                closeGallery={closeGallery}
              />
            )}
          </div>
        </div>
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
};

export default StaffItem;
