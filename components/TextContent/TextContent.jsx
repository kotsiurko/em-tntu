import BlockContent from "@sanity/block-content-to-react";
import { clientConfig } from "@/lib/client";

import getYouTubeId from "get-youtube-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Image from "next/image";
import ComingSoon from "../../public/assets/img/coming-soon.png";

const serializers = {
  types: {
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      return (
        <>
          <LiteYouTubeEmbed id={id} />
          <br />
        </>
      );
    },
  },
};

function TextContent({ data }) {
  return (
    <>
      {data && (
        <BlockContent
          blocks={data}
          imageOptions={{ w: 640, h: 960, fit: "max" }}
          projectId={clientConfig.projectId}
          dataset={clientConfig.dataset}
          serializers={serializers}
        />
      )}
      {!data && (
        <Image
          src={ComingSoon}
          alt="Контент скоро появиться"
          className="img-fluid"
        />
      )}
    </>
  );
}

export default TextContent;
