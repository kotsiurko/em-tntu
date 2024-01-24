import moment from "moment";

function CallSchedule({ data }) {
  const { lessonDuration, callSchedule } = data;

  return (
    <section className="features myPT-0">
      <div className="container">
        <header className="section-header">
          <p>Розклад дзвінків</p>
        </header>
        <table className="table table-bordered table-hover table-striped centered">
          <thead className="thead-light">
            <tr>
              <th scope="col">Пара</th>
              <th scope="col">Початок</th>
              <th scope="col">Завершення</th>
            </tr>
          </thead>
          <tbody>
            {callSchedule.map((el, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">{idx + 1}</th>
                  <td>{moment(el).format("HH:mm")}</td>
                  <td>{moment(el).add(lessonDuration, "m").format("HH:mm")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CallSchedule;
