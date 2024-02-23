import React from "react";
import Link from "next/link";

import { useState } from "react";

import DocsViewer from "components/DocsViewer/DocsViewer";

function EduPlanList({ list }) {
  const [openedDocIndex, setOpenedDocIndex] = useState(null);

  const handleProgramClick = (index) => {
    setOpenedDocIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <section className="features my-personal">
        <div className="container">
          {/* <!-- Feature Icons --> */}
          <div className="row feature-icons">
            <div className="row gx-0 mb-3">
              <h3>Навчальні плани</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="features guaranors">
        <div className="container aos-init aos-animate" data-aos="fade-up">
          {list?.map((el, index) => {
            const { eduPlanTitle, eduPlanURL, _key } = el;
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
                    <Link href={eduPlanURL}>
                      <i className="bi bi-cloud-download"></i>
                    </Link>
                    <h3>{eduPlanTitle}</h3>
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
                    <DocsViewer docURL={eduPlanURL} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default EduPlanList;
