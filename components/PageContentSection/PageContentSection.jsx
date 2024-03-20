import BlockContent from "@sanity/block-content-to-react";
import { clientConfig } from "lib/client";
import ComingSoon from "public/assets/img/coming-soon.png";
import Image from "next/image";
import { customSerializers } from "lib/helpers";

const serializers = customSerializers;

function PageContentSection({ data }) {
  const { title, body } = data;

  return (
    <section className="features my-personal">
      <div className="container">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          <div className="col-xl-12 px-2">
            <div className="row align-self-start content text-justify">
              <div className="icon-box">
                {body && (
                  <BlockContent
                    blocks={body}
                    imageOptions={{ w: 640, h: 960, fit: "max" }}
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
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
}

export default PageContentSection;
