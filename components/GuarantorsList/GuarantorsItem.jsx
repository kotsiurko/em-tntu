import { urlFor } from "lib/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./GuarantatorList.module.css";
import { personCredentials } from "lib/helpers";
import DocsViewer from "../DocsViewer/DocsViewer";
import { useState } from "react";

function GuarantorsItem({ person }) {
  const {
    firstName,
    secondName,
    fatherName,
    sciDegree,
    acadStatus,
    edGuarantee,
    position,
    mainPhoto,
    slug,
  } = person;

  const [isOPPOpen, setIsOPPOpen] = useState(false);
  const [opp_URL, setOpp_URL] = useState();

  const handleProgramClick = (edProgURL) => {
    if (isOPPOpen === false && opp_URL !== edProgURL) {
      setIsOPPOpen(true);
      setOpp_URL(edProgURL);
    }
    if (isOPPOpen === true && opp_URL === edProgURL) {
      setIsOPPOpen(false);
      setOpp_URL(null);
    }
    if (isOPPOpen === true && opp_URL !== edProgURL) {
      setIsOPPOpen(true);
      setOpp_URL(edProgURL);
    }
  };

  return (
    <>
      <div className="row mb-4" key={`${firstName} ${secondName}`}>
        <div className="col-lg-3">
          <div className="image-container" style={{ position: "relative" }}>
            <Image
              src={urlFor(mainPhoto).url()}
              fill
              priority
              className="img-fluid rounded image"
              alt={`${firstName} ${secondName}`}
            />
          </div>
        </div>

        <div className="col-lg-9 mt-5 mt-lg-0 d-flex">
          <div className="row align-self-center gy-4">
            <div className={styles.personTitle}>
              <Link href={`/about/staff/${slug.current}`}>
                <h2 className={styles.name}>
                  {firstName} {secondName} {fatherName}
                </h2>
                <p>{personCredentials(sciDegree, acadStatus, position)}</p>
              </Link>
            </div>

            {/* Список ОПП */}
            {edGuarantee?.map((el) => {
              const { edProgTitle, edProgURL, _key } = el;
              return (
                <div
                  className="col-md-12 aos-init aos-animate"
                  data-aos="zoom-out"
                  data-aos-delay="400"
                  key={_key}
                >
                  <div className="feature-box d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>{edProgTitle}</h3>
                    </div>

                    <div>
                      <button onClick={() => handleProgramClick(edProgURL)}>
                        {((isOPPOpen && opp_URL !== edProgURL) ||
                          !isOPPOpen) && <>Переглянути</>}
                        {isOPPOpen && opp_URL === edProgURL && <>Закрити</>}
                      </button>
                      <span>&nbsp;|&nbsp;</span>
                      <Link href={edProgURL}>Завантажити</Link>
                      <span>&nbsp;|&nbsp;</span>
                      <Link
                        href={`/bachelor/educational-and-professional-programs/reviews`}
                      >
                        До рецензій
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Кінець списку */}
          </div>
        </div>
      </div>
      {isOPPOpen && <DocsViewer docURL={opp_URL} />}
    </>
  );
}

export default GuarantorsItem;
