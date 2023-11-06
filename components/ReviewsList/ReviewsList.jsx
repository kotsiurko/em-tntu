import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./ReviewsList.module.css";
import { personCredentials } from "@/lib/helpers";

function ReviewsList({ personList }) {
  // console.log("personList in ReviewsList :>> ", personList);
  const res = personList.map((person) => {
    return person.edGuarantee.map((op) => {
      return {
        program: op.edProgTitle,
        // або ж витягнути необхідні поля
        guarantor: person,
      };
    });
  });
  console.log("flat res :>> ", res.flat());

  return (
    <section className="features guaranors">
      <div className="container aos-init aos-animate" data-aos="fade-up">
        {personList.map((el) => {
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
          } = el;

          // console.log("edGuarantee :>> ", edGuarantee);

          return (
            <div className="row mb-4" key={`${firstName} ${secondName}`}>
              <div className="col-lg-3">
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
              </div>

              <div className="col-lg-9 mt-5 mt-lg-0 d-flex">
                <div className="row align-self-center gy-4">
                  <div className={styles.personTitle}>
                    <Link href={`/about/staff/${slug.current}`}>
                      <h2 className={styles.name}>
                        {firstName} {secondName} {fatherName}
                      </h2>
                      <p>
                        {personCredentials(sciDegree, acadStatus, position)}
                      </p>
                    </Link>
                  </div>

                  {edGuarantee?.map((el) => {
                    const { edProgTitle, edProgURL, edProgReviewsList, _key } =
                      el;
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
                            <Link href={edProgURL}>Програма</Link> |
                            <Link
                              href={`/bachelor/educational-and-professional-programs/reviews`}
                            >
                              {" "}
                              {edProgReviewsList.length === 1 && <>Рецензія</>}
                              {edProgReviewsList.length > 1 && <>Рецензії</>}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
