import Image from "next/image";
import { urlFor } from "@/lib/client";

// Other libs
import moment from "moment";
import Link from "next/link";

import departmentStaff from "../../public/assets/img/departmentStaff.jpg";

function MainAbout({ data }) {
  console.log("data inside MainAbout Component :>> ", data);
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
              <h2>
                КАФЕДРА ЕЛЕКТРИЧНОЇ ІНЖЕНЕРІЇ - це колектив професіоналів із
                досвідом роботи не лише в сфері освіти, а й в різних галузях
                промисловості
              </h2>
              <p>
                Ми чудово знаємо потреби та виклики сучасного суспільства, йдемо
                в ногу з часом та готові ділитись знаннями, власним досвідом та
                корисними порадами щодо вирішення тієї чи іншої задачі адже
                перед інженером усі горизонти відкриті!
              </p>
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
              src={departmentStaff}
              alt="Staff of EE department"
              className="img-fluid"
              priority="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainAbout;
