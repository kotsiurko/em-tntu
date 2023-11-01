import { useState } from "react";
import TextContent from "../TextContent/TextContent";

function SciPublTypes({ data }) {
  const { title, sciPublTypes } = data;

  const [activeTab, setActiveTab] = useState(sciPublTypes[0].sciPublType);

  return (
    <section className="features my-personal">
      <div className="container">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          <div className="row gx-0">
            <h3>{title}</h3>

            <div className="col-xl-12 pt-2 px-2">
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  {sciPublTypes.map((el) => {
                    const { sciPublType, _key } = el;
                    return (
                      <a
                        className={
                          activeTab === sciPublType
                            ? `nav-item nav-link active`
                            : `nav-item nav-link`
                        }
                        href="#nav-home"
                        onClick={() => setActiveTab(sciPublType)}
                        key={_key}
                      >
                        <b style={{ textTransform: "uppercase" }}>
                          {sciPublType}
                        </b>
                      </a>
                    );
                  })}
                </div>
              </nav>

              <div className="row align-self-start content text-justify">
                <div className="icon-box my-dstyle mt-4 tab-content">
                  {sciPublTypes.map((el) => {
                    const { sciPublType, publBody, _key } = el;
                    return (
                      <div
                        className={
                          activeTab === sciPublType
                            ? `tab-pane fade show active`
                            : `tab-pane fade`
                        }
                        key={_key}
                      >
                        <TextContent data={publBody} />
                      </div>
                    );
                  })}
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

export default SciPublTypes;
