export function itemsOrderAscTransform(arrayToNormalize, hardcodedArray) {
  // console.log('arrayToNormalize :>> ', arrayToNormalize);
  // console.log('hardcodedArray :>> ', hardcodedArray);

  const normalizedArray = arrayToNormalize.map(el => {
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

export const getFullSciDegree = (shortName) => {
  if (shortName === 'к.т.н.') return 'кандидат технічних наук';
  else if (shortName === 'доктор філософії / ph.D') return 'доктор філософії';
  else if (shortName === 'д.т.н.') return 'доктор технічних наук';
}

export const personCredentials = (sciDegree, acadStatus, position) => {
  return acadStatus.toLowerCase() === position.toLowerCase() ? (
    <span>
      {sciDegree}, {position}
    </span>
  ) : (
    <>
      <span>
        {sciDegree}, {acadStatus}, {position}
      </span>
    </>
  );
}