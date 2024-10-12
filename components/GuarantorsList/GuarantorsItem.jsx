import { useRouter } from "next/router";

import { urlFor } from "lib/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./GuarantatorList.module.css";
import { personCredentials } from "lib/helpers";
import DocsViewer from "../DocsViewer/DocsViewer";
import { useEffect, useState } from "react";

function GuarantorsItem({ person }) {
  const router = useRouter();
  const [chapter, setChapter] = useState();

  useEffect(() => {
    if (router.route.startsWith("/master")) {
      setChapter("/master");
    } else {
      setChapter("/bachelor");
    }
  }, [router.route]);

  const {
    firstName,
    secondName,
    fatherName,
    sciDegreeShort,
    acadStatus,
    edGuarantee,
    position,
    mainPhoto,
    imageGallery,
    slug,
  } = person;

  const guranteePhoto = imageGallery?.find(
    (item) => item.edGuaranteeBool === true
  );

  const [openedDocIndex, setOpenedDocIndex] = useState(null);

  const handleProgramClick = (index) => {
    setOpenedDocIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row align-self-center gy-4">
          <div className={styles.personTitle}>
            <h2 className={styles.name}>
              Гарант освітньо-професійної програми
            </h2>
            {/* Фото */}
            <div
              className="image-container my-4"
              style={{ position: "relative" }}
            >
              {guranteePhoto && (
                <Image
                  src={urlFor(guranteePhoto).url()}
                  fill
                  priority
                  className="img-fluid image"
                  alt={`${firstName} ${secondName}`}
                  style={{ maxHeight: 680 }}
                />
              )}
              {!guranteePhoto && (
                <Image
                  src={urlFor(mainPhoto).url()}
                  fill
                  priority
                  className="img-fluid image"
                  alt={`${firstName} ${secondName}`}
                  style={{ maxHeight: 680 }}
                />
              )}
            </div>

            {/* Облікові дані */}
            <Link href={`/about/staff/${slug.current}`}>
              <h2 className={styles.name}>
                {firstName} {secondName} {fatherName}
              </h2>
              <p>
                {personCredentials(
                  sciDegreeShort,
                  acadStatus,
                  position
                  // additional_requisites
                )}
              </p>
            </Link>

            {/* Список ОПП */}
            {edGuarantee?.map((el, index) => {
              const { edProgTitle, edProgURL, _key } = el;
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
                      <Link href={edProgURL}>
                        <i className="bi bi-cloud-download"></i>
                      </Link>
                      <h3>{edProgTitle}</h3>
                    </div>

                    <div style={{ width: 120 }}>
                      {/* <button onClick={() => handleProgramClick(edProgURL)}>
                        {((isOPPOpen && opp_URL !== edProgURL) ||
                          !isOPPOpen) && <>Переглянути</>}
                        {isOPPOpen && opp_URL === edProgURL && <>Закрити</>}
                      </button> */}
                      <button onClick={() => handleProgramClick(index)}>
                        {isOpen ? "Закрити" : "Переглянути"}
                      </button>
                      {/* <hr />

                      <Link
                        href={`${chapter}/educational-and-professional-programs/reviews`}
                      >
                        Рецензії
                      </Link> */}
                    </div>
                  </div>
                  {isOpen && (
                    <div className="mt-4">
                      <DocsViewer docURL={edProgURL} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default GuarantorsItem;
