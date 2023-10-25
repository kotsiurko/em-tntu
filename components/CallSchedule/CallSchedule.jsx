// import ComingSoon from "../../public/assets/img/coming-soon.png";
import moment from "moment";

function CallSchedule({ data }) {
  console.log("data :>> ", data);
  const { lessonDuration, callSchedule } = data;
  console.log("callSchedule :>> ", callSchedule);
  console.log("lessonDuration :>> ", lessonDuration);

  {
    /* <p>
  {moment(callSchedule).format("HH:mm")} -{" "}
  {moment(callSchedule).add(80, "m").format("HH:mm")}
</p>; */
  }

  return (
    <section className="features my-personal">
      <div className="container" data-aos="fade-up">
        <header class="section-header">
          <p>Розклад дзвінків</p>
        </header>
        <table className="table table-bordered table-hover centered">
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
