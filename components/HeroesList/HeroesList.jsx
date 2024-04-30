// Client connection
import { urlFor } from "lib/client";

// Components
import Image from "next/image";
import Link from "next/link";

function HeroesList({ heroesList }) {
  return (
    <section className="features my-personal">
      <div className="container" data-aos="fade-up">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          {heroesList.map((heroPerson) => {
            const {
              heroName,
              heroSecondAndFatherName,
              heroImage,
              lifeYears,
              secondaryText,
              customURL,
              _key,
            } = heroPerson;

            // КАРТКИ ГЕРОЇВ
            return (
              <div key={_key} className="my-2">
                <hr className="my-5" />
                {/* БЛОК З ФОТО ТА ПРЕДСТАВЛЕННЯМ */}
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                  <div className="col-xl-4 pt-2 px-2 d-flex">
                    <Link href={`heroes/${customURL.current}`}>
                      <div
                        className="image-container"
                        style={{ position: "relative" }}
                      >
                        <Image
                          src={urlFor(heroImage).url()}
                          fill
                          className="img-fluid rounded image"
                          alt={`Full name`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="col-xl-4 pt-2 px-2 d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column text-center">
                      <Link href={`heroes/${customURL.current}`}>
                        <h3>
                          {heroName} <br /> {heroSecondAndFatherName}
                        </h3>
                      </Link>
                      <p>{lifeYears}</p>
                      <p>{secondaryText}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
}

export default HeroesList;
