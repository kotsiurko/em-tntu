import Link from "next/link";
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
          const { programTitle, reviewList } = el;

          return (
            <div
              className="row feture-tabs"
              data-aos="fade-up"
              key={programTitle}
            >
              <div className="col-lg-12">
                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    {reviewList?.map((el) => {
                      const { edProgReviewTitle, edProgReviewURL, _key } = el;
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
