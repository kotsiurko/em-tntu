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
        url: "/specialities/stakeholders",
        id: 240,
        children: [
          {
            title: "Експертна рада роботодавців",
            url: "/specialities/stakeholders/employers-expert-council",
            id: 24010,
          },
          {
            title: "Комунікації із стейкхолдерами",
            url: "/specialities/stakeholders/communications-with-stakeholders",
            id: 24020,
          },
          {
            title: "Положення",
            url: "/specialities/stakeholders/principles",
            id: 24030,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Бакалавру",
    url: "#",
    icon: "bi bi-emoji-laughing",
    children: [],
  },
  {
    id: 4,
    title: "Магістру",
    url: "#",
    icon: "bi bi-emoji-sunglasses",
    children: [],
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

