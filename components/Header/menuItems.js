export const menuItems = [
  {
    id: 1,
    title: "Про кафедру",
    url: "#",
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
        url: null,
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
        ]
      },
      // тут решта сторінок з адмінки
    ],
  },
  {
    id: 2,
    title: "Спеціальності",
    url: "#",
    icon: "bi bi-wrench",
    children: [
      {
        title: "Наші стейкхолдери",
        url: null,
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
        url: '/specialities/practice-oriented-education',
        id: 250,
      },
      {
        title: "Тематичні екскурсії",
        url: '/specialities/thematic-excursions',
        id: 260,
      },
      {
        title: "Дуальна освіта",
        url: '/specialities/dual-education',
        id: 280,
      },
      {
        title: "Психологічна підтримка студентів",
        url: '/specialities/students-psychological-support',
        id: 290,
      },
    ],
  },
  {
    id: 3,
    title: "Бакалавру",
    url: "#",
    icon: "bi bi-emoji-laughing",
    children: [
      {
        title: "Освітньо-професійні програми",
        url: null,
        id: 310,
        children: [
          {
            title: "Зустрічі",
            url: "/bachelor/educational-and-professional-programs/meetings",
            id: 31050,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Магістру",
    url: "#",
    icon: "bi bi-emoji-sunglasses",
    children: [
      {
        title: "Освітньо-професійні програми",
        url: null,
        id: 410,
        children: [
          {
            title: "Зустрічі",
            url: "/master/educational-and-professional-programs/meetings",
            id: 41050,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Абітурієнту",
    url: "#",
    icon: "bi bi-emoji-smile-upside-down",
    children: [],
  },
  {
    id: 6,
    title: "Наука",
    url: "#",
    icon: "bi bi-lightbulb",
    children: [],
  },
  {
    id: 7,
    title: "Аспірантура",
    url: "#",
    icon: "bi bi-magic",
    children: [],
  },
  {
    id: 8,
    title: "Міжнародна діяльність",
    url: "#",
    icon: "bi bi-flag",
    children: [],
  },
  {
    id: 9,
    title: "Виховна діяльність",
    url: "#",
    icon: "bi bi-people",
    children: [],
  },
  {
    id: 10,
    title: "Посилання",
    url: "#",
    icon: "bi bi-link-45deg",
    children: [],
  },
  {
    id: 11,
    title: "Це цікаво",
    url: "#",
    icon: "bi bi-pin",
    children: [],
  },
];

