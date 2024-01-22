// import { urlFor } from "lib/client";
import { clientConfig } from "lib/client";
import BlockContent from "@sanity/block-content-to-react";

export default function CustomBlockContent({ title, BCObject }) {
  return (
    <>
      <h4>{title}</h4>
      <BlockContent
        blocks={BCObject}
        projectId={clientConfig.projectId}
        dataset={clientConfig.dataset}
      />
    </>
  );
}
