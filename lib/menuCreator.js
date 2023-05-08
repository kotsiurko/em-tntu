export function menuCreator(
  transformedAbout,
  // transformedAboutMTB,
  transformedSpecialities,
  transformedBachelor,
  transformedMaster,
  prevState,
) {

  // console.log('transformedAboutMTB MCreator :>> ', transformedAboutMTB);
  // transformedAbout.map((item, index) => {
  //   if (index === 5) {
  //     return {
  //       ...item,
  //       children: [...transformedAboutMTB]
  //     }
  //   }
  // })

  return prevState.map((item, index) => {
    // Тут можна через решту IF додати інші масиви в інші об'єкти
    if (index === 0) {
      return {
        ...item,
        children: [...transformedAbout],
      };
    }
    if (index === 1) {
      return {
        ...item,
        children: [...transformedSpecialities],
      };
    }
    if (index === 2) {
      return {
        ...item,
        children: [...transformedBachelor],
      };
    }
    if (index === 3) {
      return {
        ...item,
        children: [...transformedMaster],
      };
    }
    return item;
  });
}