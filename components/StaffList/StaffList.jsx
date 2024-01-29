import { urlFor } from "lib/client";
import { personCredentials } from "lib/helpers";
import Image from "next/image";
import Link from "next/link";

const StaffList = ({ staff }) => {
  // console.log("staff :>> ", staff);
  return (
    <div className="row gy-4">
      {staff.map(
        ({
          firstName,
          secondName,
          fatherName,
          sciDegree,
          sciDegreeShort,
          acadStatus,
          position,
          additional_requisites,
          mainPhoto,
          formerEmployeeBool,
          slug,
        }) => {
          const personLink = formerEmployeeBool
            ? `former-staff/${slug.current}`
            : `staff/${slug.current}`;
          const scheduleLink = `http://tntu.edu.ua/?p=uk/schedule&t=${firstName}+${secondName}+${fatherName}`;

          return (
            <div
              className="col-lg-3 col-md-4 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay="100"
              key={firstName}
            >
              <div className="member">
                <Image
                  src={urlFor(mainPhoto).url()}
                  className="img-fluid"
                  alt={`${firstName} ${secondName}`}
                  width={520}
                  height={10}
                />
                <div className="member-info">
                  <Link href={personLink}>
                    <h4>
                      <firstname style={{ textTransform: "uppercase" }}>
                        {firstName}
                      </firstname>
                      <br />
                      {secondName} {fatherName}
                    </h4>
                  </Link>
                  <span>
                    {personCredentials(
                      sciDegreeShort,
                      acadStatus,
                      position,
                      additional_requisites
                    )}
                  </span>
                  <a href={scheduleLink}>розклад</a>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default StaffList;
