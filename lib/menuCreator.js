import { itemsOrderAscTransform } from "./helpers";

// Другий об'єкт приходить із місця виклику функції menuItemsMerger
// його поля приходять з фалу запитів queries.
// Тому. щоб витягнути новий пункт меню тут, треба його в запитах додати
export function menuItemsMerger(
  menuItems,
  {
    aboutItems,
    aboutMTBItems,

    specialitiesItems,
    specialitiesSHItems,

    bachelorItems,
    bachelorEPPItems,

    masterItems,
    masterEPPItems,

    entrantItems,

    scienceItems,
    scienceLEConferenceItems,

    postgraduateItems,

    internationalActivityItems,

    educationalActivityItems,

    // referencesItems,

    intrestingItems,
  }
) {
  // Якщо додаються/видаляються сторінки із меню, то їх треба редагувати тут
  const transformedAbout = itemsOrderAscTransform(
    aboutItems,
    menuItems[0].children
  );
  // першим аргументом вказую який об'єкт я передаю для злиття,
  // а другим - в який пункт меню поточного розділу його злити.
  const transformedAboutMTB = itemsOrderAscTransform(
    aboutMTBItems,
    transformedAbout[5].children
  );

  const transformedSpecialities = itemsOrderAscTransform(
    specialitiesItems,
    menuItems[1].children
  );
  const transformedSHSpecialities = itemsOrderAscTransform(
    specialitiesSHItems,
    transformedSpecialities[2].children
  );

  const transformedBachelor = itemsOrderAscTransform(
    bachelorItems,
    menuItems[2].children
  );
  const transformedBachelorEPP = itemsOrderAscTransform(
    bachelorEPPItems,
    transformedBachelor[0].children
  );

  const transformedMaster = itemsOrderAscTransform(
    masterItems,
    menuItems[3].children
  );
  const transformedMasterEPP = itemsOrderAscTransform(
    masterEPPItems,
    transformedMaster[0].children
  );

  const transformedEntrant = itemsOrderAscTransform(
    entrantItems,
    menuItems[4].children
  );

  const transformedScience = itemsOrderAscTransform(
    scienceItems,
    menuItems[5].children
  );

  const transformedScienceLEConference = itemsOrderAscTransform(
    scienceLEConferenceItems,
    transformedScience[2].children
  );

  const transformedPostgraduate = itemsOrderAscTransform(
    postgraduateItems,
    menuItems[6].children
  );

  const transformedInternationalActivity = itemsOrderAscTransform(
    internationalActivityItems,
    menuItems[7].children
  );

  const transformedEducationalActivity = itemsOrderAscTransform(
    educationalActivityItems,
    menuItems[8].children
  );

  // const transformedReferences = itemsOrderAscTransform(
  //   referencesItems,
  //   menuItems[9].children
  // );

  const transformedIntresting = itemsOrderAscTransform(
    intrestingItems,
    menuItems[9].children
  );

  return {
    transformedAbout,
    transformedAboutMTB,

    transformedSpecialities,
    transformedSHSpecialities,

    transformedBachelor,
    transformedBachelorEPP,

    transformedMaster,
    transformedMasterEPP,

    transformedEntrant,

    transformedScience,
    transformedScienceLEConference,

    transformedPostgraduate,

    transformedInternationalActivity,

    transformedEducationalActivity,

    // transformedReferences,

    transformedIntresting,
  };
}

export function menuCreator(
  {
    transformedAbout,
    transformedAboutMTB,

    transformedSpecialities,
    transformedSHSpecialities,

    transformedBachelor,
    transformedBachelorEPP,

    transformedMaster,
    transformedMasterEPP,

    transformedEntrant,

    transformedScience,
    transformedScienceLEConference,

    transformedPostgraduate,

    transformedInternationalActivity,

    transformedEducationalActivity,

    // transformedReferences,

    transformedIntresting,
  },
  prevState
) {
  // -----------------------------------------------------------------------------------------
  // Додаю підпункти до розділу меню 'Кафедра'
  const transformedAboutwSubs = transformedAbout.map((item, index) => {
    // console.log('item :>> ', item);
    // console.log('index :>> ', index);
    if (index === 5) {
      return {
        ...item,
        children: [...transformedAboutMTB],
      };
    }
    return item;
  });

  // Додаю підпункти до розділу меню 'Спеціальності'
  const transformedSpecialitieswSubs = transformedSpecialities.map(
    (item, index) => {
      // console.log('el :>> ', el);
      if (index === 2) {
        return {
          ...item,
          children: [...transformedSHSpecialities],
        };
      }
      return item;
    }
  );

  // Додаю підпункти до розділу меню 'Бакалавру'
  const transformedBachelorwSubs = transformedBachelor.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        children: [...transformedBachelorEPP],
      };
    }
    return item;
  });

  // Додаю підпункти до розділу меню 'Магістру'
  const transformedMasterwSubs = transformedMaster.map((item, index) => {
    if (index === 0) {
      return {
        ...item,
        children: [...transformedMasterEPP],
      };
    }
    return item;
  });

  // Додаю підпункти до розділу меню 'Наука'
  const transformedSciencewSubs = transformedScience.map((item, index) => {
    if (index === 2) {
      return {
        ...item,
        children: [...transformedScienceLEConference],
      };
    }
    return item;
  });

  // -----------------------------------------------------------------------------------------
  // ФОРМУЮ ГОЛОВНЕ МЕНЮ
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
        children: [...transformedSpecialitieswSubs],
      };
    }
    if (index === 2) {
      return {
        ...item,
        children: [...transformedBachelorwSubs],
      };
    }
    if (index === 3) {
      return {
        ...item,
        children: [...transformedMasterwSubs],
      };
    }
    if (index === 4) {
      return {
        ...item,
        children: [...transformedEntrant],
      };
    }
    if (index === 5) {
      return {
        ...item,
        children: [...transformedSciencewSubs],
      };
    }
    if (index === 6) {
      return {
        ...item,
        children: [...transformedPostgraduate],
      };
    }
    if (index === 7) {
      return {
        ...item,
        children: [...transformedInternationalActivity],
      };
    }
    if (index === 8) {
      return {
        ...item,
        children: [...transformedEducationalActivity],
      };
    }
    // if (index === 9) {
    //   return {
    //     ...item,
    //     children: [...transformedReferences],
    //   };
    // }
    if (index === 9) {
      return {
        ...item,
        children: [...transformedIntresting],
      };
    }
    return item;
  });
}
