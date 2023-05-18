import BlockContent from "@sanity/block-content-to-react";
import { clientConfig } from "@/lib/client";

function PageContentSection({ data }) {
  const { title, body } = data;

  return (
    <section className="features my-personal">
      <div className="container" data-aos="fade-up">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons" data-aos="fade-up">
          <div className="row gx-0">
            <h3>{title}</h3>

            <div className="col-xl-12 pt-2 px-2">
              <div className="row align-self-start content text-justify">
                <div className="icon-box my-dstyle" data-aos="fade-up">
                  <BlockContent
                    blocks={body}
                    projectId={clientConfig.projectId}
                    dataset={clientConfig.dataset}
                  />
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
