import { getCourseId } from "@/lib/helpers";
import Link from "next/link";
import React from "react";

function Practices({ prList }) {
  // Створюю масив зі значень ключа 'PracticeCourse'
  const arrayOfPracticeCourses = prList.map((obj) => {
    return obj.practiceCourse;
  });
  // Знаходжу унікальні значення в попередньому масиві
  const uniqueArray = [...new Set(arrayOfPracticeCourses)];

  return (
    <section id="team" className="team">
      <div className="container">
        <header className="section-header">
          <p>Список практик</p>
          <span>по курсах для різних форм навчання</span>
        </header>
        <table className="table table-striped">
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
          {uniqueArray.map((el) => {
            return (
              <tbody key={el}>
                <tr>
                  <th scope="row" colSpan={6} className="text-center">
                    {el} КУРС
                  </th>
                </tr>
                {prList.map((obj) => {
                  const {
                    practiceCourse,
                    practiceEduForm,
                    practicePeriod,
                    practiceTitle,
                    practiceSupervisor,
                    practiceATLink,
                    practiceDecree,
                    _key,
                  } = obj;
                  if (practiceCourse === el) {
                    return (
                      <tr key={_key}>
                        <th scope="row">{practiceEduForm}</th>
                        <td>{practicePeriod}</td>
                        <td>{practiceTitle}</td>
                        <td>{practiceSupervisor}</td>
                        <td>
                          <Link href={practiceATLink} target="_blank">
                            Посилання | ID:
                            {getCourseId(practiceATLink)}
                          </Link>
                        </td>
                        <td>
                          <Link href={practiceDecree} target="_blank">
                            Завантажити
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            );
          })}
        </table>
      </div>
    </section>
  );
}

export default Practices;
