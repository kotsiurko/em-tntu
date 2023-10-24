// import { urlFor } from "../../../lib/client";
import { urlFor } from "@/lib/client";
import ComingSoon from "../../public/assets/img/coming-soon.png";
import Image from "next/image";
import Link from "next/link";

function GuarantorsList({ personList }) {
  console.log("personList :>> ", personList);

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
          return (
            <div className="row mb-4" key={`${firstName} ${secondName}`}>
              <div className="col-lg-4">
                <div
                  className="image-container"
                  style={{ position: "relative" }}
                >
                  <Image
                    src={urlFor(mainPhoto).url()}
                    fill
                    priority
                    className="img-fluid rounded image"
                    alt={mainPhoto.caption}
                    // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="col-lg-8 mt-5 mt-lg-0 d-flex">
                <div className="row align-self-center gy-4">
                  <Link href={`/about/staff/${slug.current}`}>
                    <h4 style={{ textTransform: "uppercase" }}>
                      {firstName} {secondName} {fatherName}
                    </h4>
                  </Link>

                  <h6>
                    {sciDegree} {acadStatus} {position.long}
                  </h6>

                  {/* Список ОПП */}
                  {edGuarantee?.map((el) => (
                    <div
                      className="col-md-12 aos-init aos-animate"
                      data-aos="zoom-out"
                      data-aos-delay="400"
                      key={el}
                    >
                      <div className="feature-box d-flex align-items-center">
                        <i className="bi bi-check"></i>
                        <h3>{el}</h3>
                      </div>
                    </div>
                  ))}
                  {/* Кінець списку */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default GuarantorsList;
