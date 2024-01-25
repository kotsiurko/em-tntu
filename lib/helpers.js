import { newsPerPage } from "lib/queries";
import { client } from "lib/client";
import { paginationQuery } from "lib/queries";

export function itemsOrderAscTransform(arrayToNormalize, hardcodedArray) {
  // console.log('arrayToNormalize :>> ', arrayToNormalize);
  // console.log('hardcodedArray :>> ', hardcodedArray);

  const normalizedArray = arrayToNormalize.map((el) => {
    return {
      title: el.title,
      url: `${el.slug.current}`,
      id: el.positionNumber,
      // id: el.slug.current,
    };
  });

  let mergedArray = [];
  // Склеюю обидва мисиви разом
  if (hardcodedArray) {
    mergedArray = [...normalizedArray, ...hardcodedArray];
  } else {
    mergedArray = [...normalizedArray];
  }

  // Сортую масив в порядку зростання значень id
  // console.log('mergedArr :>> ', mergedArray);
  return mergedArray.sort((a, b) => a.id - b.id);
}

// Дописати функцію, коли усі пункти головного меню
// будуть передати через запити на PAGES
// export function mainMenuArrFormation(prevState) {

// }

export const personPageTitle = (position) => {
  if (
    position === "провідний інженер" ||
    position === "інженер 2-ї категорії" ||
    position === "інженер 1-ї категорії" ||
    position === "лаборант"
  ) {
    return "Профіль працівника";
  } else {
    return "Профіль викладача";
  }
};

export const getFullSciDegree = (shortName) => {
  if (shortName === "к.т.н.") return "кандидат технічних наук";
  else if (shortName === "доктор філософії / ph.D") return "доктор філософії";
  else if (shortName === "д.т.н.") return "доктор технічних наук";
};

export const personCredentials = (sciDegree, acadStatus, position) => {
  // Якщо відсутні sciDegree, acadStatus (для допоміжного персоналу), тоді формую таке:
  if (sciDegree === "Немає" && acadStatus === "Немає") {
    return <span>{position}</span>;
  }
  // Якщо немає наукового ступеня
  else if (sciDegree === "Немає") {
    return (
      <span>
        {acadStatus}, {position}
      </span>
    );
  }
  // Якщо немає вченого звання
  else if (acadStatus === "Немає") {
    return (
      <span>
        {sciDegree}, {position}
      </span>
    );
  }
  // Якщо ступінь збігається з посадою, формую скорочений підпис
  // (для більшості викладачів, де ступінь 'доцент' збігається з посадою 'доцента кафедри...')
  else if (position.toLowerCase().startsWith(acadStatus.toLowerCase())) {
    return (
      <span>
        {sciDegree}, {acadStatus}
      </span>
    );
  }
  // В інших випадках - залишаю все як є
  // (наприклад, підпис під завкафедрою чи заступником)
  else {
    return (
      <span>
        {sciDegree}, {acadStatus}, {position}
      </span>
    );
  }
};

export const getCourseId = (link) => {
  // визначаю індекс.з якого починається вираз "course="
  const courseIdIndex = link.indexOf("course=");

  if (courseIdIndex !== -1) {
    // одаю до попереднього індексу довжину виразу "course=",
    // яка дає індекс. з якого починається сам ID курсу
    const courseIdStart = courseIdIndex + "course=".length;
    // вирізаю ID з лінку
    const courseId = link.slice(courseIdStart);
    return courseId;
  } else {
    // Якщо не вдалося знайти "course=" у посиланні
    console.error("Course ID not found in the link");
    return "unknown";
  }
};

// Запит на порцію новин
export async function getPortion(pageNumber, newsBool, setResultQuery) {
  const start = parseInt(pageNumber * newsPerPage - newsPerPage);
  console.log("start :>> ", start);
  const end = parseInt(pageNumber * newsPerPage);
  console.log("end :>> ", end);
  const res = await client.fetch(paginationQuery(start, end, newsBool));
  // setResultQuery(res);
  return res;
}
