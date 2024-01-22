import Image from "next/image";
import { urlFor } from "lib/client";

function MainBooklet({ data }) {
  const { bookletsList } = data;

  return (
    <section id="services" className="services">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>Буклети</h2>
          <p>Ознайомтесь із нашими буклетами</p>
        </header>

        <div className="row gy-4">
          {bookletsList.map((el) => {
            const { bookletsInnerList, title, _key } = el;

            return (
              <div
                className="col-lg-6 col-md-12"
                data-aos="fade-up"
                data-aos-delay="200"
                key={_key}
              >
                <div className="service-box blue">
                  <h3>{title}</h3>
                  <div
                    className="row portfolio-container"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <div className="portfolio-item filter-app">
                      <div className="portfolio-wrap">
                        <p>
                          {bookletsInnerList.map(({ bookletPreview, _key }) => {
                            return (
                              <Image
                                src={urlFor(bookletPreview).url()}
                                className="img-fluid rounded mt-3 mx-2"
                                priority
                                width={120}
                                height={85}
                                alt={bookletPreview.caption}
                                key={_key}
                              />
                            );
                          })}
                        </p>
                        <div className="portfolio-info">
                          <div className="portfolio-links">
                            {bookletsInnerList.map(
                              ({ bookletURL, bookletInnerTitle, _key }) => {
                                return (
                                  <a
                                    href={bookletURL}
                                    data-gallery="portfolioGallery"
                                    className="read-more"
                                    title="App 1"
                                    key={_key}
                                  >
                                    <span>{bookletInnerTitle}</span>{" "}
                                    <i className="bi bi-download"></i>
                                  </a>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MainBooklet;
