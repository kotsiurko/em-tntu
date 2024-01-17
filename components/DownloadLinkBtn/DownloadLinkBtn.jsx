import Link from "next/link";

const DownloadLinkBtn = ({ href }) => {
  return (
    <section id="counts" className="counts">
      <div className="container" data-aos="flip-down" data-aos-duration="300">
        <div className="row gy-4 justify-content-center">
          <div className="col-lg-5 col-md-8">
            <Link href={href}>
              <div className="count-box">
                <i
                  className="bi bi-journal-richtext"
                  style={{ color: "#ee6c20" }}
                ></i>
                <div>
                  <span className="myPurecounter">Завантажити</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadLinkBtn;
