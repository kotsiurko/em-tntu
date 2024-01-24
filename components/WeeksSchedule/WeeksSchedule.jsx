import moment from "moment";

function WeeksSchedule({ data }) {
  const { semesterPeriod, weeksAmount, semesterStarts } = data;

  let tempDate = semesterStarts;

  const tableRows = Array.from({ length: weeksAmount }, (_, index) => {
    tempDate = tempDate;
    if (index % 2 === 0) {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>
            {moment(tempDate).format("DD.MM.YYYY")} -{" "}
            {moment(tempDate).add(6, "day").format("DD.MM.YYYY")}
          </td>
          <td>{index + 2}</td>
          <td>
            {moment(tempDate).add(7, "day").format("DD.MM.YYYY")} -{" "}
            {moment(tempDate).add(13, "day").format("DD.MM.YYYY")}
          </td>
        </tr>
      );
    }
    tempDate = moment(tempDate).add(14, "day");
  });

  return (
    <section className="features my-personal">
      <div className="container">
        <header className="section-header">
          <p>Графік навчальних тижнів</p>
          <span>{semesterPeriod}</span>
        </header>
        <table className="table table-bordered table-hover table-striped centered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Номер тижня</th>
              <th scope="col">І тиждень, непарний</th>
              <th scope="col">Номер тижня</th>
              <th scope="col">ІІ тиждень, непарний</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </section>
  );
}

export default WeeksSchedule;
