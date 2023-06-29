import Image from "next/image";
import { urlFor } from "@/lib/client";

// Other libs
import moment from "moment";
import Link from "next/link";

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
          const newsItemLink = `/about/news/${slug.current}`;
          // const newsItemLink = `${slug.current}`;
          console.log("newsItemLink :>> ", newsItemLink);
          console.log("item :>> ", item);
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
                  <Link href={newsItemLink}>
                    <h4>{newsTitle}</h4>
                  </Link>
                  <p className="publishDate">
                    Опубліковано:{" "}
                    {moment(publishedDate).format("YYYY-MM-DD о HH:mm")}
                  </p>
                  <p>{newsItemBodyShort}</p>
                  <hr />
                  <Link href={newsItemLink}>
                    <p style={{ color: "blue" }}>Читати далі...</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default NewsItems;
