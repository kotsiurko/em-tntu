import { newsPerPage } from "lib/queries";
import { client } from "lib/client";
import { paginationQuery } from "lib/queries";
import { gT } from "lib/genderTranslates";

import getYouTubeId from "get-youtube-id";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

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

// export const getFullSciDegree = (shortName) => {
//   if (shortName === "к.т.н.") return "кандидат технічних наук";
//   else if (shortName === "доктор філософії / ph.D") return "доктор філософії";
//   else if (shortName === "д.т.н.") return "доктор технічних наук";
// };

export const personCredentials = (sciDegree, acadStatus, position, additional_requisites, gender) => {
  const requisitesArray = [];

  // Додаємо sciDegree, якщо вона є
  if (sciDegree) {
    requisitesArray.push(sciDegree);
  }

  // Додаємо acadStatus, якщо вона не "Немає" і відрізняється від position
  if (acadStatus && acadStatus !== "Немає") {
    requisitesArray.push(gT(acadStatus, gender));
  }

  // Додаємо position, якщо вона відрізняється від acadStatus
  if (position && position !== "Немає" && position !== acadStatus) {
    requisitesArray.push(gT(position, gender));
  }

  // Додаємо additional_requisites, якщо вона існує
  if (additional_requisites) {
    requisitesArray.push(additional_requisites);
  }

  // Формуємо стрічку реквізитів
  const requisitesString = requisitesArray.join(', ');

  return requisitesString;
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
export async function getPortion(pageNumber, newsBool) {
  const start = parseInt(pageNumber * newsPerPage - newsPerPage);
  const end = parseInt(pageNumber * newsPerPage);
  const res = await client.fetch(paginationQuery(start, end, newsBool));
  return res;
}


// ----------------------------------------------
// serializers
// ----------------------------------------------
export const customSerializers = {
  types: {
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      return (
        <>
          <LiteYouTubeEmbed id={id} />
          <br />
        </>
      );
    },
    // --------------------------------------------------------
    // Це треба винести вище, щоб мати доступ з багатьох місць
    // --------------------------------------------------------
    customTable: ({ node }) => {
      return (
        <table
          className="table table-sm table-striped table-hover"
          style={{ marginBottom: '2rem' }}
        >
          <tbody>
            <tr>
              {node.rows[0].cells.map((item) => {
                return (
                  <th key={item} scope="col">
                    {item}
                  </th>
                );
              })}
            </tr>
            {node.rows.slice(1).map((row) => {
              return (
                <tr key={row._key} style={{ textAlign: "left" }}>
                  {row.cells.map((item) => {
                    return (
                      <td key={item} scope="col">
                        {item}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    },
  },
};