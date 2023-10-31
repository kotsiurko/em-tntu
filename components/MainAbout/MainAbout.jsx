import Image from "next/image";
import { urlFor } from "@/lib/client";

function MainAbout({ data }) {
  const { whoWeArePrimary, whoWeAreSecondary, whoWeArePhoto } = data;
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row gx-0">
          <div
            className="col-lg-6 d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="content">
              <h3>Хто ми є</h3>
              <h2>{whoWeArePrimary}</h2>
              <p>{whoWeAreSecondary}</p>
              <div className="text-center text-lg-start">
                <a
                  href="kolektyv.aspx"
                  className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
                >
                  <span>Колектив кафедри</span>
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <div
            className="col-lg-6 d-flex align-items-center"
            data-aos="zoom-out"
            data-aos-delay="200"
          >
            <Image
              src={urlFor(whoWeArePhoto).url()}
              className="img-fluid"
              priority
              width={1000}
              height={574}
              alt={whoWeArePhoto.caption}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainAbout;
