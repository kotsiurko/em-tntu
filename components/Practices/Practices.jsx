import React from "react";

function Practices() {
  return (
    <section id="team" className="team">
      {/* <div className="container" data-aos="fade-up"> */}
      <div className="container">
        <p>Таблиця для І курсу</p>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Форма навчання</th>
              <th scope="col">Період</th>
              <th scope="col">Назва</th>
              <th scope="col">Керівник</th>
              <th scope="col">Курс в ATutor</th>
              <th scope="col">Наказ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Денна</th>
              <td>Період 1</td>
              <td>Назва 1</td>
              <td>Прізвище 1</td>
              <td>Лінк 1</td>
              <td>Наказ 1</td>
            </tr>
            <tr>
              <th scope="row">Заочна</th>
              <td>Період 2</td>
              <td>Назва 2</td>
              <td>Прізвище 2</td>
              <td>Лінк 2</td>
              <td>Наказ 2</td>
            </tr>
            <tr className="align-middle">
              <th scope="row">
                Студенти, які навчаються
                <br /> іноземною мовою
              </th>
              <td>Період 3</td>
              <td>Назва 3</td>
              <td>Прізвище 3</td>
              <td>Лінк 3</td>
              <td>Наказ 3</td>
            </tr>
          </tbody>
        </table>
        <br />
        <p>Таблиця для ІІ курсу</p>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Форма навчання</th>
              <th scope="col">Період</th>
              <th scope="col">Назва</th>
              <th scope="col">Керівник</th>
              <th scope="col">Курс в ATutor</th>
              <th scope="col">Наказ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Денна</th>
              <td>Період 1</td>
              <td>Назва 1</td>
              <td>Прізвище 1</td>
              <td>Лінк 1</td>
              <td>Наказ 1</td>
            </tr>
            <tr>
              <th scope="row">Заочна</th>
              <td>Період 2</td>
              <td>Назва 2</td>
              <td>Прізвище 2</td>
              <td>Лінк 2</td>
              <td>Наказ 2</td>
            </tr>
            <tr>
              <th scope="row">
                Студенти, які навчаються
                <br /> іноземною мовою
              </th>
              <td>Період 2</td>
              <td>Назва 2</td>
              <td>Прізвище 2</td>
              <td>Лінк 2</td>
              <td>Наказ 2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Practices;
