import Image from "next/image";
import { urlFor } from "@/lib/client";

function MainValues({ data }) {
  const { valuesMainTitle, valuesList } = data;
  return (
    <section id="values" className="values">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>Наші цінності</h2>
          <p>{valuesMainTitle}</p>
        </header>

        <div className="row justify-content-center">
          {valuesList.map((el) => {
            const { valueTitle, valueDescription, valueImage, _key } = el;
            return (
              <div
                className="col-lg-4 col-md-6 p-3 mt-lg-0"
                data-aos="fade-up"
                data-aos-delay="200"
                key={_key}
              >
                <div className="box">
                  <Image
                    src={urlFor(valueImage).url()}
                    className="img-fluid"
                    priority
                    width={640}
                    height={480}
                    alt={valueImage.caption}
                  />
                  <h3>{valueTitle}</h3>
                  <p>{valueDescription}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MainValues;
