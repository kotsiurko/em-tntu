import Link from "next/link";

const ATutorBigBtn = () => (
  <section className="services pt-3">
    <div className="container pt-3">
      <div
        className="col-lg-12 col-md-6 aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div class="service-box blue" style={{ padding: 15 }}>
          <h3>ATutor</h3>
          <Link
            href="https://dl.tntu.edu.ua"
            className="read-more"
            target="_blank"
          >
            <span>Сервер дистанційного навчання ТНТУ імені Івана Пулюя</span>
            <i class="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default ATutorBigBtn;
