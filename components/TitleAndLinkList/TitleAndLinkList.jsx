import React from "react";
import Link from "next/link";

import { useState } from "react";

import DocsViewer from "components/DocsViewer/DocsViewer";

function TitleAndLinkList({ list }) {
  const [openedDocIndex, setOpenedDocIndex] = useState(null);

  const handleProgramClick = (index) => {
    setOpenedDocIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="features guaranors">
      <div className="container aos-init aos-animate" data-aos="fade-up">
        {list?.map((el, index) => {
          const { title, link, _key } = el;
          const isOpen = openedDocIndex === index;

          return (
            <div
              className="col-md-12 mt-2 mb-2"
              data-aos="zoom-out"
              data-aos-delay="100"
              key={_key}
            >
              <div className="feature-box d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <Link href={link}>
                    <i className="bi bi-cloud-download"></i>
                  </Link>
                  <h3>{title}</h3>
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
                  <DocsViewer docURL={link} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TitleAndLinkList;
