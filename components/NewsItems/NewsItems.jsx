import Image from "next/image";
import { urlFor } from "@/lib/client";

// Other libs
import moment from "moment";

function NewsItems({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => {
          const {
            newsTitle,
            publishedDate,
            newsItemBodyShort,
            mainPhoto,
            slug,
          } = item;
          const newsItemLink = `${slug.current}`;
          return (
            <div
              className="col-lg-6 d-flex align-items-stretch"
              key={newsItemLink}
            >
              <div className="member news">
                <div className="position-relative">
                  <Image
                    src={urlFor(mainPhoto).url()}
                    className="img-fluid"
                    alt={mainPhoto.caption}
                    width={440}
                    height={280}
                  />
                </div>
                <div className="member-info news">
                  <a href={newsItemLink}>
                    <h4>{newsTitle}</h4>
                  </a>
                  <p className="publishDate">
                    Опубліковано:{" "}
                    {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}
                  </p>
                  <p>{newsItemBodyShort}</p>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default NewsItems;
