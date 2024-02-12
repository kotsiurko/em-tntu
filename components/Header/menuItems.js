export const menuItems = [
  {
    id: 1,
    title: "Кафедра",
    url: "/about",
    icon: "bi bi-mortarboard",
    children: [
      {
        title: "Події на кафедрі",
        url: "/about/news",
        id: 101,
      },
      // тут інші пункти з адмінки
      {
        title: "Колектив кафедри",
        url: "/about/staff",
        id: 130,
      },
      {
        title: "Матеріально-технічна база",
        url: "/about/material-and-technical-base",
        id: 150,
        children: [
          {
            title: "Семінари",
            url: "/about/material-and-technical-base/seminars",
            id: 15030,
          },
          {
            title: "Розробки студентів",
            url: "/about/material-and-technical-base/devs-of-students",
            id: 15040,
          },
        ],
      },
      // тут решта сторінок з адмінки
      {
        title: "Для працівників",
        url: "/about/secret",
        id: 170,
      },
    ],
  },
  {
    id: 2,
    title: "Спеціальності",
    url: "/specialities",
    icon: "bi bi-wrench",
    children: [
      {
        title: "Наші стейкхолдери",
        url: "/specialities/stakeholders",
        id: 240,
        children: [
          {
            title: "Комунікації із стейкхолдерами",
            url: "/specialities/stakeholders/communications-with-stakeholders",
            id: 24030,
          },
        ],
      },
      {
        title: "Практико-орієнтована освіта",
        url: "/specialities/practice-oriented-education",
        id: 250,
      },
      {
        title: "Тематичні екскурсії",
        url: "/specialities/thematic-excursions",
        id: 260,
      },
    ],
  },
  {
    id: 3,
    title: "Бакалавру",
    url: "/bachelor",
    icon: "bi bi-emoji-laughing",
    children: [
      {
        title: "Освітньо-професійні програми",
        url: "/bachelor/educational-and-professional-programs",
        id: 310,
        children: [
          {
            title: "Зустрічі",
            url: "/bachelor/educational-and-professional-programs/meetings",
            id: 31050,
          },
        ],
      },
      {
        title: "Захисти дипломних робіт бакалаврів",
        url: "/bachelor/diploma-theses-defense",
        id: 385,
      },
    ],
  },
  {
    id: 4,
    title: "Магістру",
    url: "/master",
    icon: "bi bi-emoji-sunglasses",
    children: [
      {
        title: "Освітньо-професійні програми",
        url: "/master/educational-and-professional-programs",
        id: 410,
        children: [
          {
            title: "Зустрічі",
            url: "/master/educational-and-professional-programs/meetings",
            id: 41050,
          },
        ],
      },
      {
        title: "Консультації",
        url: "/bachelor/consultations",
        id: 470,
      },
      {
        title: "Захисти дипломних робіт магістрів",
        url: "/master/diploma-theses-defense",
        id: 485,
      },
    ],
  },
  {
    id: 5,
    title: "Абітурієнту",
    url: "/entrant",
    icon: "bi bi-emoji-smile-upside-down",
    children: [
      {
        title: "Новини для абітурієнтів",
        url: "/entrant/news",
        id: 509,
      },
      {
        title: "Правила прийому",
        url: "https://tntu.edu.ua/?p=uk/admission/rules",
        id: 520,
      },
      {
        title: "Сертифікати ЗНО (НМТ)",
        url: "https://tntu.edu.ua/storage/pages/00000314/tntu-pp2023-d2.pdf",
        id: 530,
      },
      {
        title: "Документи для вступу",
        url: "https://tntu.edu.ua/?p=uk/admission/admission-docs",
        id: 540,
      },
      {
        title: "Обсяг державного замовлення",
        url: "https://tntu.edu.ua/?p=uk/admission/dz",
        id: 550,
      },
      {
        title: "Вартість навчання",
        url: "https://tntu.edu.ua/?p=uk/admission/prices",
        id: 570,
      },
      {
        title: "Банківські реквізити",
        url: "https://tntu.edu.ua/?p=uk/services/payment",
        id: 580,
      },
      {
        title: "Інформаційний сайт абітурієнта ТНТУ",
        url: "https://vstup.tntu.edu.ua",
        id: 5100,
      },
    ],
  },
  {
    id: 6,
    title: "Наука",
    url: "/science",
    icon: "bi bi-lightbulb",
    children: [
      {
        title: "Конференція “Світлотехніка й електроенергетика”",
        url: "/science/conference-lighting-and-power-engineering/conference-2024",
        id: 630,
        children: [
          // {
          //   title: "Сайт конференції",
          //   url: "#",
          //   id: 63010,
          // },
          {
            title: "Новини розділу",
            url: "/science/conference-lighting-and-power-engineering/news",
            id: 63010,
          },
          // {
          //   title: "Матеріаіли 2015",
          //   url: "#",
          //   id: 63030,
          // },
          // {
          //   title: "Матеріаіли 2018",
          //   url: "#",
          //   id: 63040,
          // },
        ],
      },
      {
        title:
          "Конференція ФПТ “Advanced Applied Energy and Information Technologies”",
        url: "https://icaaeit.tntu.org.ua/",
        id: 635,
      },
      {
        title: "НДЛ Енергоощадності та проблем енергетики",
        url: "/about/material-and-technical-base/laboratory-of-energy-saving",
        id: 660,
      },
      {
        title:
          "НДЛ Електромагнітної сумісності джерел живлення світлотехнічних пристроїв і систем",
        url: "/about/material-and-technical-base/ndl-light-engineering",
        id: 665,
      },
    ],
  },
  {
    id: 7,
    title: "Аспірантура",
    url: "/postgraduate",
    icon: "bi bi-magic",
    children: [],
  },
  {
    id: 8,
    title: "Міжн. діяльність",
    url: "/international-activity",
    icon: "bi bi-flag",
    children: [
      {
        title: "Відділ міжнародного співробітництва ТНТУ",
        url: "https://tntu.edu.ua/?p=uk/inter/vms",
        id: 810,
      },
    ],
  },
  {
    id: 9,
    title: "Виховна діяльність",
    url: "/educational-activity",
    icon: "bi bi-people",
    children: [],
  },
  {
    id: 10,
    title: "Посилання",
    url: "/references",
    icon: "bi bi-link-45deg",
    children: [
      {
        title: "Сайт університету ТНТУ",
        url: "https://tntu.edu.ua",
        id: 1010,
      },
      {
        title: "Сайт факультету ФПТ",
        url: "https://fpt.tntu.edu.ua",
        id: 1020,
      },
      {
        title: "Телефони та пошти підрозділів ТНТУ",
        url: "https://tntu.edu.ua/?p=uk/about/contacts",
        id: 1030,
      },
      {
        title: "Сторінка кафедри у Facebook",
        url: "https://www.facebook.com/kaf.ei.tntu",
        id: 1040,
      },
      {
        title: "Електронна Бібліотека ТНТУ",
        url: "https://library.tntu.edu.ua",
        id: 1050,
      },
      {
        title: "Нормативна база",
        url: "https://docs.tntu.edu.ua",
        id: 1070,
      },
    ],
  },
  {
    id: 11,
    title: "Це цікаво",
    url: "/intresting",
    icon: "bi bi-pin",
    children: [
      {
        title: "Фотоархів кафедри",
        url: "https://www.facebook.com/kaf.ei.tntu/photos_by",
        id: 1110,
      },
      {
        title: "Відеоархів кафедри",
        url: "https://www.youtube.com/@user-qe1wj7xn4u",
        id: 1120,
      },
      {
        title: "Працювали на кафедрі",
        url: "/intresting/former-staff",
        id: 1130,
      },
    ],
  },
];
