import BlockContent from "@sanity/block-content-to-react";
import { clientConfig } from "lib/client";
import Image from "next/image";
import ComingSoon from "public/assets/img/coming-soon.png";
import { customSerializers } from "lib/helpers";

const serializers = customSerializers;

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
