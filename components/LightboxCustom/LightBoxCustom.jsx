import { urlFor } from "lib/client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import { useRef, useState } from "react";

function LightBoxCustom({ imageGallery, isOpen, closeGallery, index }) {
  const captionsRef = useRef(null);

  const galleryArray = imageGallery?.map((el) => {
    return {
      src: urlFor(el).url(),
      alt: el.caption,
      description: el.caption,
    };
  });

  const closeGlr = () => {
    closeGallery(false);
  };

  return (
    <Lightbox
      open={isOpen}
      close={closeGlr}
      plugins={[Counter, Captions]}
      captions={{ ref: captionsRef }}
      on={{
        click: () => {
          (captionsRef.current?.visible
            ? captionsRef.current?.hide
            : captionsRef.current?.show)?.();
        },
      }}
      counter={{ container: { style: { top: "unset", bottom: 0 } } }}
      slides={galleryArray}
      index={index}
    />
  );
}

export default LightBoxCustom;
