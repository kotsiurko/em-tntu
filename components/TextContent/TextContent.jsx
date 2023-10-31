import BlockContent from "@sanity/block-content-to-react";
import { clientConfig } from "@/lib/client";

import getYouTubeId from "get-youtube-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

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
    <BlockContent
      blocks={data}
      projectId={clientConfig.projectId}
      dataset={clientConfig.dataset}
      serializers={serializers}
    />
  );
}

export default TextContent;
