import Image from "next/image";

// Images
import logo from "../../public/assets/img/logo.png";
import moment from "moment";
import "moment/locale/uk";

const Footer = () => {
  return (
    // ======= Footer =======
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-12 footer-info  text-center text-md-start">
              <a href="default.aspx">
                <Image
                  src={logo}
                  alt="Логотип кафедри Електричної інженерії"
                  className="ei-logo"
                  style={{
                    width: "auto",
                  }}
                />
              </a>
            </div>

            <div className="col-lg-3 col-md-12 footer-info  text-center text-md-start">
              <h4>
                Кафедра
                <br />
                електричної інженерії
                <hr />
                Тернопільський національний
                <br />
                технічний університет
                <br />
                імені Івана Пулюя
              </h4>
            </div>

            <div className="col-lg-1 col-md-12 footer-info  text-center text-md-start"></div>

            <div className="col-lg-2 col-md-12 footer-contact text-center text-md-start">
              <h4>Ми в соцмережах</h4>

              <div className="social-links mt-3">
                <a
                  href="https://www.facebook.com/kaf.ei.tntu/"
                  className="facebook"
                >
                  {" "}
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://scholar.google.com.ua/citations?user=IKmXP1oAAAAJ"
                  className="google-schoolar"
                >
                  <i className="bi bi-google"></i>
                </a>
                {/* <a href="https://www.instagram.com/" className="instagram">
                  {" "}
                  <i className="bi bi-instagram"></i>
                </a> */}
                <a
                  href="https://www.youtube.com/channel/UCkRiBJEjnihxVqZvl5lAv_A"
                  className="youtube"
                >
                  {" "}
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
              <h4>Наші Контакти</h4>

              <p>
                м. Тернопіль, вул. Микулинецька 46,
                <br />
                корпус ТНТУ № 7, кімн. 403, 408
                <br />
                {/* <strong>Телефон:</strong> (0352) 43-51-14
                <br /> */}
                <strong>Email:</strong> kaf_ei@tu.edu.te.ua
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="credits">
          © 1999-2025. Тернопільський національний технічний університет імені
          Івана Пулюя
          <br />
          © 1999-2025. Факультет прикладних інформаційних технологій та
          електроінженерії
          <br />
          © 2018-2025. Кафедра електричної інженерії
          <br />
        </div>
        <div className="credits">
          Розробка:{" "}
          <a href="http://tntu.org.ua/person.aspx?name=kocjurko">
            Коцюрко Роман Володимирович
          </a>
          <br />
          Інформацію поновлено: {moment().format("MMMM YYYY")} р.
        </div>
        <div className="credits">
          {/* All the links in the footer should remain intact. */}
          {/* You can delete the links only if you purchased the pro version. */}
          {/* Licensing information: https://bootstrapmade.com/license/ */}
          {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/flexstart-bootstrap-startup-template/ */}
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
    // End Footer
  );
};

export default Footer;
