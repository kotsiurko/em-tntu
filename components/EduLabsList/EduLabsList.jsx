import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "../Modal/Modal";
import Image from "next/image";
import LightBoxCustom from "../LightboxCustom/LightBoxCustom";
import TeachingSubjectItems from "components/TeachingSubjectItems/TeachingSubjectItems";

import { urlFor } from "lib/client";

function EduLabsList({ labsList }) {
  // console.log("labsList :>> ", labsList);

  // const [show, setShow] = useState(false);
  // const showModal = () => {
  //   setShow(true);
  // };
  // const hideModal = () => {
  //   setShow(false);
  // };

  // const [modalRoom, setModalRoom] = useState("");
  // const [modalRoomObj, setModalRoomObj] = useState("");
  // const [open, setOpen] = useState(false);
  // const closeGallery = (state) => {
  //   setOpen(state);
  // };

  // useEffect(() => {
  //   const currEduLab = labsList.filter((el) => el.labNumber === modalRoom)[0];
  //   setModalRoomObj(currEduLab);
  // }, [modalRoom]);

  return (
    <section className="features my-personal">
      <div className="container">
        <div className="row feature-icons">
          <div className="row gx-0">
            <h3>Навчальні аудиторії</h3>

            <table className="table table-striped table-hover table-sm">
              <tbody>
                <tr>
                  <th>Номер</th>
                  <th>Назва лабораторії (аудиторії)</th>
                  <th>Площа, кв.м.</th>
                  <th>К-ть. місць</th>
                </tr>
                {labsList.map((el) => {
                  const {
                    _key,
                    labNumber,
                    labTitle,
                    labArea,
                    labSittingPlaces,
                  } = el;
                  return (
                    <tr key={_key}>
                      <td>
                        <Link
                          href={`/about/material-and-technical-base/educational-labs/${labNumber}`}
                        >
                          {labNumber}
                        </Link>
                        {/* <button
                          type="button"
                          // className="btn btn-outline-primary mt-3"
                          onClick={() => {
                            showModal();
                            setModalRoom(labNumber);
                          }}
                        >
                          {labNumber}
                        </button> */}
                      </td>
                      <td>
                        <Link
                          href={`/about/material-and-technical-base/educational-labs/${labNumber}`}
                        >
                          {labTitle}
                        </Link>
                      </td>
                      {/* <td>{labTitle}</td> */}
                      <td align="center">{labArea}</td>
                      <td align="center">{labSittingPlaces}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ---------------------------------------------- */}
      {/* {modalRoomObj && (
        <Modal
          show={show}
          hideModal={hideModal}
          title={`${modalRoomObj.labNumber} | ${modalRoomObj.labTitle}`}
        >
          <ModalContent modalRoomObj={modalRoomObj} setOpen={setOpen} />
        </Modal>
      )} */}
      {/* {modalRoomObj?.labGallery && (
        <LightBoxCustom
          imageGallery={modalRoomObj?.labGallery}
          isOpen={open}
          closeGallery={closeGallery}
        />
      )} */}
      {/* ---------------------------------------------- */}
    </section>
  );
}

export default EduLabsList;

function ModalContent({ modalRoomObj, setOpen }) {
  const {
    labArea,
    labSittingPlaces,
    labChief,
    labChiefUrl,
    labDisciplines,
    lab3DTour,
    labGallery,
  } = modalRoomObj;

  return (
    <div className="row gx-0">
      {labGallery && (
        <div
          className="col-xl-5 pt-2 px-2 d-flex aos-init aos-animate"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <div
            className="image-container"
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Image
              src={urlFor(labGallery[0]).url()}
              fill
              priority
              className="img-fluid image rounded"
              alt="Текст"
            />
          </div>
        </div>
      )}

      <div className="col-xl-7 pt-2 px-2 d-flex">
        <div className="row align-self-center content text-justify">
          <div className="icon-box aos-init aos-animate" data-aos="fade-up">
            <div>
              {labArea && <p>Площа приміщення: {labArea}</p>}
              {labSittingPlaces && (
                <p>Кількість посадкових місць: {labSittingPlaces}</p>
              )}
              {labChief && (
                <p>
                  Відповідальна особа:{" "}
                  <Link href={labChiefUrl}>{labChief}</Link>
                </p>
              )}
              {labDisciplines && (
                <>
                  <p className="mb-0">Закріплені навчальні дисципліни:</p>
                  <ul>
                    <TeachingSubjectItems list={labDisciplines} />
                  </ul>
                </>
              )}
              {lab3DTour && (
                <p>
                  <Link href={lab3DTour}>Посилання на 3D тур</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
