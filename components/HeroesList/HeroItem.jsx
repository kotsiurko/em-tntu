// Client connection
import { urlFor } from "lib/client";

// Components
import Image from "next/image";
import Link from "next/link";
import TextContent from "components/TextContent/TextContent";

function HeroItem({ heroPerson }) {
  const {
    heroName,
    heroSecondAndFatherName,
    heroImage,
    lifeYears,
    secondaryText,
    body,
    heroPublications,
  } = heroPerson;

  return (
    <div className="my-2">
      {/* БЛОК З ФОТО ТА ПРЕДСТАВЛЕННЯМ */}
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        <div className="col-xl-4 pt-2 px-2 d-flex">
          <div className="image-container" style={{ position: "relative" }}>
            <Image
              src={urlFor(heroImage).url()}
              fill
              // priority
              className="img-fluid rounded image"
              alt={`Full name`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="col-xl-4 pt-2 px-2 d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column text-center">
            <h3>
              {heroName} <br /> {heroSecondAndFatherName}
            </h3>
            <p>{lifeYears}</p>
            <p>{secondaryText}</p>
          </div>
        </div>
      </div>

      {/* ТЕКСТОВИЙ БЛОК */}
      <div className="my-4 text-justify">
        <TextContent data={body} />
      </div>

      {/* БЛОК НОВИН */}
      <h4>Пов&apos;язані новини у масмедіа</h4>
      <hr className="my-2" />
      <div className="row gx-0">
        {heroPublications.map((heroPubl) => {
          const {
            heroPublTitle,
            heroPublShortText,
            heroPublSRC,
            heroPublURL,
            heroPublScreenshot,
            _key,
          } = heroPubl;
          return (
            <div className="col-lg-6 d-flex align-items-stretch p-3" key={_key}>
              <div className="member news gap-2">
                <div className="position-relative">
                  <Image
                    src={urlFor(heroPublScreenshot).url()}
                    // src={`https://cdn.sanity.io/images/asnyakur/production/0884ab8625644d1a4f01a1b1249536a90536ff88-640x480.png`}
                    className="img-fluid image-fit"
                    // alt={mainPhoto.caption}
                    alt="some title"
                    sizes="(max-width: 768px) 100vw"
                    fill={true}
                  />
                </div>
                <div className="member-info news">
                  <Link href={heroPublURL}>
                    <h5>{heroPublTitle}</h5>
                  </Link>

                  <p className="mb-0">{heroPublShortText}</p>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Link href={heroPublURL}>
                      <span className="publishDate">
                        Джерело: {heroPublSRC}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HeroItem;
