import * as React from "react";
import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox/core";

export default function NextJsImage({ slide, rect }) {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height)
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        placeholder="blur"
        draggable={false}
        style={{ objectFit: cover ? "cover" : "contain" }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
      />
    </div>
  );
}
