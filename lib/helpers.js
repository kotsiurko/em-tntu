export function arrayNormalization(array) {
  const transformedArray = array.map(el => {
    return {
      title: el.title,
      url: `master/${el.slug.current}`,
      id: el.positionNumber,
      // id: el.slug.current,
    };
  });

  // Сортую масив в порядку зростання значень id
  return transformedArray.sort((a, b) => a.id - b.id);
}