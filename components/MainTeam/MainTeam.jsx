import Image from "next/image";
import { clientConfig, urlFor } from "@/lib/client";
import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";
import { personCredentials } from "@/lib/helpers";
import { serializers } from "@sanity/block-content-to-react/lib/targets/dom";

function MainTeam({ teamArr }) {
  return (
    <section id="team" className="team">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h2>Викладачі</h2>
          <p>Керівний та професорський склад кафедри</p>
        </header>

        <div className="row gy-4 justify-content-md-center ">
          {teamArr.map((person) => {
            const {
              firstName,
              secondName,
              fatherName,
              sciDegree,
              acadStatus,
              position,
              mainPhoto,
              socials,
              personSlogan,
              _id,
              slug,
            } = person;
            // console.log("person :>> ", person);
            return (
              <div
                className="col-lg-2 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay="100"
                key={_id}
              >
                <div className="member">
                  <div className="member-img pb-2">
                    <Image
                      src={urlFor(mainPhoto).url()}
                      className="img-fluid"
                      alt={`${firstName} ${secondName}`}
                      width={520}
                      height={10}
                    />
                    <div className="social">
                      <Link href={`staff/${slug.current}`}>
                        <i className="bi bi-person-circle"></i>
                      </Link>
                      {socials.tntuNTB && (
                        <Link href={socials.tntuNTB}>
                          <i className="bi bi-collection"></i>
                        </Link>
                      )}
                      {socials.googleScholar && (
                        <Link href={socials.googleScholar}>
                          <i className="bi bi-google"></i>
                        </Link>
                      )}
                      {socials.scopus && (
                        <Link href={socials.scopus}>
                          <i className="bi bi-bank"></i>
                        </Link>
                      )}
                      {socials.orcid && (
                        <Link href={socials.orcid}>
                          <i className="bi bi-book-half"></i>
                        </Link>
                      )}
                      {socials.rgsn && (
                        <Link href={socials.rgsn}>
                          <i className="bi bi-search"></i>
                        </Link>
                      )}
                      {socials.rIDtr && (
                        <Link href={socials.rIDtr}>
                          <i className="bi bi-binoculars"></i>
                        </Link>
                      )}
                      {socials.fb && (
                        <Link href={socials.fb}>
                          <i className="bi bi-facebook"></i>
                        </Link>
                      )}
                      {socials.li && (
                        <Link href={socials.li}>
                          <i className="bi bi-linkedin"></i>
                        </Link>
                      )}
                      {socials.iCi && (
                        <Link href={socials.iCi}>
                          <i className="bi bi-journal-check"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="member-info">
                    <Link href={`staff/${slug.current}`}>
                      <h4>
                        <firstname style={{ textTransform: "uppercase" }}>
                          {firstName}
                        </firstname>
                        <br />
                        {secondName} {fatherName}
                      </h4>
                    </Link>
                    {personCredentials(sciDegree, acadStatus, position)}
                    <BlockContent
                      blocks={personSlogan}
                      projectId={clientConfig.projectId}
                      dataset={clientConfig.dataset}
                      serializers={serializers}
                      className="smallPortableText"
                      // style={{ lineHeight: "1.3" }}
                    />
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

export default MainTeam;
