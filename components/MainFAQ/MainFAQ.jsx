import Image from "next/image";
import { urlFor } from "@/lib/client";

// Other libs
import moment from "moment";
import Link from "next/link";
import TextContent from "../TextContent/TextContent";

// Тут випадаючі списки можна було б зробити за допомогою самого React,
// але я залишив це на bootstrap
function MainFAQ({ data }) {
  // console.log("data from component :>> ", data);
  const { faqList } = data;

  return (
    <section id="faq" className="faq">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>ЧаПи</h2>
          <p>Часті питання</p>
        </header>

        <div className="row">
          <div className="col-lg-12">
            <div className="accordion accordion-flush" id="faqlist">
              {faqList.map((el) => {
                const { faQuestion, faAnswer, _key } = el;
                return (
                  <div className="accordion-item" key={_key}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq-content-${_key}`}
                      >
                        {faQuestion}
                      </button>
                    </h2>
                    <div
                      id={`faq-content-${_key}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqlist"
                    >
                      <div className="accordion-body">
                        <TextContent data={faAnswer} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainFAQ;
