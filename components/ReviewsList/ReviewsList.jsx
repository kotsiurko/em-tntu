import { urlFor } from "lib/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./ReviewsList.module.css";
import { personCredentials } from "lib/helpers";
import { useState } from "react";
import DocsViewer from "../DocsViewer/DocsViewer";

function ReviewsList({ personList }) {
  const res = personList.map((person) => {
    return person.edGuarantee.map((op) => {
      return {
        programTitle: op.edProgTitle,
        reviewList: op.edProgReviewsList,
        guarantor: person,
        key: op._key,
      };
    });
  });
  const reviewArr = res.flat();

  const [isOPPOpen, setIsOPPOpen] = useState(false);
  const [opp_URL, setOpp_URL] = useState();

  const handleReviewClick = (edProgReviewURL) => {
    if (isOPPOpen === false && opp_URL !== edProgReviewURL) {
      setIsOPPOpen(true);
      setOpp_URL(edProgReviewURL);
    }
    if (isOPPOpen === true && opp_URL === edProgReviewURL) {
      setIsOPPOpen(false);
      setOpp_URL(null);
    }
    if (isOPPOpen === true && opp_URL !== edProgReviewURL) {
      setIsOPPOpen(true);
      setOpp_URL(edProgReviewURL);
    }
  };

  return (
    <section className="features guaranors">
      <div className="container aos-init aos-animate" data-aos="fade-up">
        {reviewArr.map((el) => {
          const { programTitle, reviewList, guarantor, key } = el;
          const {
            firstName,
            secondName,
            fatherName,
            slug,
            sciDegree,
            acadStatus,
            position,
            mainPhoto,
          } = guarantor;
          console.log("el review :>> ", el);

          return (
            <div
              className="row feture-tabs"
              data-aos="fade-up"
              key={programTitle}
            >
              <div className="col-lg-12">
                <h3>{programTitle}</h3>

                {/* <!-- Tabs --> */}
                <ul className="nav nav-pills mb-3">
                  <li>
                    <a
                      className="nav-link active"
                      data-bs-toggle="pill"
                      // href="#tab1"
                      href={`#tab1-${key}`}
                      // _key
                    >
                      Рецензії
                    </a>
                  </li>
                  <li>
                    <a
                      className="nav-link"
                      data-bs-toggle="pill"
                      href={`#tab2-${key}`}
                    >
                      Гарант
                    </a>
                  </li>
                </ul>
                {/* <!-- End Tabs --> */}

                {/* <!-- Tab Content --> */}
                <div className="tab-content">
                  <div className="tab-pane fade show active" id={`tab1-${key}`}>
                    {reviewList.map((el) => {
                      const { edProgReviewTitle, edProgReviewURL, _key } = el;
                      // console.log("el review :>> ", el);
                      return (
                        <div
                          className="d-flex align-items-center justify-content-between"
                          key={_key}
                        >
                          <div className="d-flex align-items-center mb-2">
                            <i className="bi bi-check2"></i>
                            <h4>{edProgReviewTitle}</h4>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <button
                              onClick={() => handleReviewClick(edProgReviewURL)}
                            >
                              {((isOPPOpen && opp_URL !== edProgReviewURL) ||
                                !isOPPOpen) && <>Переглянути</>}
                              {isOPPOpen && opp_URL === edProgReviewURL && (
                                <>Закрити </>
                              )}
                            </button>
                            <span>&nbsp;|&nbsp;</span>
                            <Link href={edProgReviewURL}>Завантажити</Link>
                          </div>
                        </div>
                      );
                    })}
                    <div className="mt-4">
                      {isOPPOpen && <DocsViewer docURL={opp_URL} />}
                    </div>
                  </div>
                  {/* <!-- End Tab 1 Content --> */}

                  <div className="tab-pane fade show" id={`tab2-${key}`}>
                    <div className="col-lg-4 d-flex">
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
                        />
                      </div>
                      <div className="row align-self-center m-2">
                        <div className={styles.personTitle}>
                          <Link href={`/about/staff/${slug.current}`}>
                            <h2 className={styles.name}>
                              {firstName} {secondName} {fatherName}
                            </h2>
                            <p>
                              {personCredentials(
                                sciDegree,
                                acadStatus,
                                position
                              )}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Tab 2 Content --> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ReviewsList;
