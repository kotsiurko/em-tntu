// import { urlFor } from "../../../lib/client";
import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import styles from "./GuarantatorList.module.css";
import { personCredentials } from "@/lib/helpers";
import DocsViewer from "../DocsViewer/DocsViewer";
import { useState } from "react";
import GuarantorsItem from "./GuarantorsItem";

function GuarantorsList({ personList }) {
  console.log("personList in GuarantorsList:>> ", personList);

  const [isOPPOpen, setIsOPPOpen] = useState(false);
  const [openedOPP, setOpenedOPP] = useState();

  const handleProgramClick = (edProgURL) => {
    setOpenedOPP(edProgURL);
    console.log("openedOPP :>> ", openedOPP);
    if (isOPPOpen) {
      setIsOPPOpen(false);
    } else {
      setIsOPPOpen(true);
    }
    console.log("isOPPOpen :>> ", isOPPOpen);
  };

  return (
    <section className="features guaranors">
      <div className="container aos-init aos-animate" data-aos="fade-up">
        {personList.map((el) => {
          const {
            firstName,
            secondName,
            fatherName,
            sciDegree,
            acadStatus,
            edGuarantee,
            position,
            mainPhoto,
            slug,
          } = el;

          return (
            <GuarantorsItem person={el} key={`${firstName} ${secondName}`} />
          );
        })}
      </div>
    </section>
  );
}

export default GuarantorsList;
