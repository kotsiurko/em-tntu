import React, { useState } from "react";
import Link from "next/link";
import Modal from "../Modal/Modal";
import ModalLauncher from "../Modal/ModalLauncher";

function EduLabsList({ labsList }) {
  // console.log("labsList :>> ", labsList);

  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };

  return (
    <section className="features my-personal">
      <div className="container">
        <div className="row feature-icons">
          <div className="row gx-0">
            <h3>Навчальні лабораторії</h3>

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
                    labChief,
                    labChiefUrl,
                    labDisciplines,
                    labPhoto,
                  } = el;
                  return (
                    <tr key={_key}>
                      <td>
                        <Link
                          href={`/about/material-and-technical-base/educational-labs/${labNumber}`}
                        >
                          {labNumber}
                        </Link>
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
      {/* <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        // showModal={showModal}
      >
        Launch demo modal
      </button> */}
      <ModalLauncher showModal={showModal} />
      <Modal show={show} hideModal={hideModal}>
        Modal content
      </Modal>
    </section>
  );
}

export default EduLabsList;
