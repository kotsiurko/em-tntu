import { itemsOrderAscTransform } from '@/lib/helpers';

export function menuItemsMerger(
  menuItems,
  {
    aboutItems,
    aboutMTBItems,
    specialitiesItems,
    bachelorItems,
    masterItems,
  }
) {

  const transformedAbout = itemsOrderAscTransform(aboutItems, menuItems[0].children);
  const transformedAboutMTB = itemsOrderAscTransform(aboutMTBItems, transformedAbout[5].children);
  const transformedSpecialities = itemsOrderAscTransform(specialitiesItems, menuItems[1].children);
  const transformedBachelor = itemsOrderAscTransform(bachelorItems, menuItems[2].children);
  const transformedMaster = itemsOrderAscTransform(masterItems, menuItems[3].children);

  return {
    transformedAbout,
    transformedAboutMTB,
    transformedSpecialities,
    transformedBachelor,
    transformedMaster,
  }
}

export function menuCreator(
  {
    transformedAbout,
    transformedAboutMTB,
    transformedSpecialities,
    transformedBachelor,
    transformedMaster,
  },
  prevState,
) {

  const transformedAboutwSubs = transformedAbout.map((item, index) => {
    if (index === 5) {
      return {
        ...item,
        children: [...transformedAboutMTB]
      }
    }
    return item;
  })

  return prevState.map((item, index) => {
    // Тут можна через решту IF додати інші масиви в інші об'єкти
    if (index === 0) {
      return {
        ...item,
        children: [...transformedAboutwSubs],
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