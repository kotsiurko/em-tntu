import Link from "next/link";
import { useState } from "react";
import DocsViewer from "../DocsViewer/DocsViewer";

function ReviewsList({ personList }) {
  const allReviews = personList
    .flatMap((person) => person.edGuarantee) // Витягуємо масив edGuarantee
    .flatMap((op) => op.edProgReviewsList || []); // Витягуємо масив рецензій, якщо він є

  // console.log("allReviews", allReviews);

  const [openedDocIndex, setOpenedDocIndex] = useState(null);

  const handleProgramClick = (index) => {
    setOpenedDocIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="features guaranors pt-2">
      <div className="container aos-init aos-animate py-4" data-aos="fade-up">
        {allReviews?.map((el, index) => {
          const { edProgReviewTitle, edProgReviewURL, _key } = el;
          const isOpen = openedDocIndex === index;

          return (
            <div
              className="col-md-12 m-2"
              data-aos="zoom-out"
              data-aos-delay="100"
              key={_key}
            >
              <div className="feature-box d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Link href={edProgReviewURL}>
                    <i className="bi bi-cloud-download"></i>
                  </Link>
                  <h3>{edProgReviewTitle}</h3>
                </div>

                <button
                  onClick={() => handleProgramClick(index)}
                  style={{ width: 120 }}
                >
                  {isOpen ? "Закрити" : "Переглянути"}
                </button>
              </div>
              {isOpen && (
                <div className="mt-4">
                  <DocsViewer docURL={edProgReviewURL} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ReviewsList;
