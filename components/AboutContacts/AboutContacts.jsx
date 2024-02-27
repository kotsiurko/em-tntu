import React from "react";
import TextContent from "../TextContent/TextContent";

export default function AboutContacts({ data }) {
  // console.log("data :>> ", data);
  return (
    <section id="contact" className="contact">
      <div className="container aos-init aos-animate" data-aos="fade-up">
        {data.map((el) => {
          const { location, address, callUs, mailUs, openHours, src, _key } =
            el;
          return (
            <div className="row gy-4 mb-4" key={_key}>
              <header className="section-header">
                <p>{location}</p>
              </header>
              <div className="col-lg-6">
                <div className="row gy-4">
                  {address && (
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-geo-alt"></i>
                        <h3>Адреса</h3>
                        <TextContent data={address} />
                      </div>
                    </div>
                  )}

                  {callUs && (
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-telephone"></i>
                        <h3>Телефонуйте</h3>
                        <p>{callUs}</p>
                      </div>
                    </div>
                  )}

                  {mailUs && (
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-envelope"></i>
                        <h3>Пишіть</h3>
                        <TextContent data={mailUs} />
                      </div>
                    </div>
                  )}

                  {openHours && (
                    <div className="col-md-6">
                      <div className="info-box">
                        <i className="bi bi-clock"></i>
                        <h3>Ми відкриті</h3>
                        <p>{openHours}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <iframe
                  src={src}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
