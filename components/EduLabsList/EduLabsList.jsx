import React from "react";

function EduLabsList({ labsList }) {
  console.log("labsList :>> ", labsList);

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
                      <td>{labNumber}</td>
                      <td>{labTitle}</td>
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
    </section>
  );
}

export default EduLabsList;
