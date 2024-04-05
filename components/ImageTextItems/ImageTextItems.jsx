import Image from "next/image";
import { urlFor } from "lib/client";
import { useState } from "react";

// Other libs
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function ImageTextItems({ currentItems }) {
  const [open, setOpen] = useState(false);
  const [clickedPic, setClickedPic] = useState("");

  return (
    <>
      {currentItems?.length > 0 &&
        currentItems.map((item) => {
          const { title, body, afterTitle, picture, slug, _key } = item;
          return (
            <div className="col-lg-6 d-flex align-items-stretch" key={_key}>
              <div className="member news">
                <div
                  className="position-relative d-flex align-items-center"
                  onClick={() => {
                    setClickedPic(urlFor(picture).url());
                    setOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={urlFor(picture).url()}
                    className="img-fluid"
                    //
                    alt={title}
                    width={255}
                    height={360}
                  />
                </div>
                <div className="member-info news d-flex justify-content-center">
                  <h4>{title}</h4>
                  <p>{body}</p>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>{afterTitle}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: clickedPic }]}
        />
      }
      {currentItems?.length === 0 && (
        <header className="section-header">
          <p className="fs-4">Новини скоро з&apos;являться в цьому розділі</p>
        </header>
      )}
    </>
  );
}

export default ImageTextItems;
