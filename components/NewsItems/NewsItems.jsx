import Image from "next/image";
import { urlFor } from "lib/client";

// Other libs
import moment from "moment";
import Link from "next/link";

function NewsItems({ currentItems }) {
  return (
    <>
      {currentItems?.length > 0 &&
        currentItems.map((item) => {
          const {
            newsTitle,
            publishedDate,
            newsItemBodyShort,
            mainPhoto,
            slug,
          } = item;
          const newsItemLink = `/about/news/${slug.current}`;
          return (
            <div
              className="col-lg-6 d-flex align-items-stretch"
              key={newsItemLink}
            >
              <div className="member news">
                <div className="position-relative">
                  <Image
                    src={urlFor(mainPhoto).url()}
                    className="img-fluid image-fit"
                    alt={mainPhoto.caption}
                    sizes="(max-width: 768px) 100vw"
                    fill={true}
                  />
                </div>
                <div className="member-info news">
                  <Link href={newsItemLink}>
                    <h4>{newsTitle}</h4>
                  </Link>

                  <p>{newsItemBodyShort}</p>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Link href={newsItemLink}>
                      <span style={{ color: "blue" }}>Читати далі...</span>
                    </Link>
                    <span className="publishDate">
                      Опубліковано: {moment(publishedDate).format("YYYY-MM-DD")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {currentItems?.length === 0 && (
        <header className="section-header">
          <p className="fs-4">Новини скоро з&apos;являться в цьому розділі</p>
        </header>
      )}
    </>
  );
}

export default NewsItems;
