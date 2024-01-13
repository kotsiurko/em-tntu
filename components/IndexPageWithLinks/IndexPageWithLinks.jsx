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

function IndexPageWithLinks(props) {
  const { title, list } = props;
  console.log("title :>> ", title);
  console.log("list :>> ", list);

  return (
    <section className="features my-personal">
      <div className="container">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          <div className="row gx-0">
            <h3>{title}</h3>

            <div className="row">
              <div className="mt-5 mt-lg-0 d-flex">
                <div className="row align-self-center gy-4">
                  {list.map((el) => {
                    return (
                      <div
                        className="col-md-6 aos-init aos-animate"
                        data-aos="zoom-out"
                        data-aos-delay="200"
                      >
                        <div className="feature-box d-flex align-items-center">
                          <i className="bi bi-check"></i>
                          <h3
                            className="mb-0 h4"
                            style={{ fontSize: "1.5rem" }}
                          >
                            {el.title}
                          </h3>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="mt-5 mt-lg-0 d-flex">
                <div className="row align-self-center gy-4">
                  <div
                    className="col-md-6 aos-init aos-animate"
                    data-aos="zoom-out"
                    data-aos-delay="200"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3 className="mb-0">Eos aspernatur rem</h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6 aos-init aos-animate"
                    data-aos="zoom-out"
                    data-aos-delay="300"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Facilis neque ipsa</h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6 aos-init aos-animate"
                    data-aos="zoom-out"
                    data-aos-delay="400"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Volup amet voluptas</h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6 aos-init aos-animate"
                    data-aos="zoom-out"
                    data-aos-delay="500"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Rerum omnis sint</h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6 aos-init aos-animate"
                    data-aos="zoom-out"
                    data-aos-delay="600"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Alias possimus</h3>
                    </div>
                  </div>

                  <div
                    className="col-md-6 aos-init aos-animate"
                    data-aos="zoom-out"
                    data-aos-delay="700"
                  >
                    <div className="feature-box d-flex align-items-center">
                      <i className="bi bi-check"></i>
                      <h3>Repellendus mollitia</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* sdfgsdfgsdfg */}
          </div>
        </div>
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
}

export default IndexPageWithLinks;
