import BlockContent from "@sanity/block-content-to-react";
import { clientConfig } from "@/lib/client";
import ComingSoon from "../../public/assets/img/coming-soon.png";
import Image from "next/image";

import getYouTubeId from "get-youtube-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const serializers = {
  types: {
    youtube: ({ node }) => {
      // console.log("node :>> ", node);
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

function PageContentSection({ data }) {
  const { title, body } = data;

  return (
    <section className="features my-personal">
      <div className="container">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          <div className="row gx-0">
            <h3>{title}</h3>

            <div className="col-xl-12 pt-2 px-2">
              <div className="row align-self-start content text-justify">
                <div className="icon-box my-dstyle">
                  {body && (
                    <BlockContent
                      blocks={body}
                      projectId={clientConfig.projectId}
                      dataset={clientConfig.dataset}
                      serializers={serializers}
                    />
                  )}
                  {!body && (
                    <Image
                      src={ComingSoon}
                      alt="Контент скоро появиться"
                      className="img-fluid"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
}

export default PageContentSection;
