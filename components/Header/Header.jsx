import Image from "next/image";
import {
  useState,
  useEffect,
} from "react";

// Images
import headerLogo from "../../public/assets/img/logo-header.png";

const Header = () => {
  // Прописав свою логіку додавання класу, так як AOS не працює
  // "header-scrolled"

  // const [scroll, setScroll] =
  //   useState(false);
  // useEffect(() => {
  //   window.addEventListener(
  //     "scroll",
  //     () => {
  //       setScroll(window.scrollY > 50);
  //     }
  //   );
  // }, []);

  return (
    <>
      <header
        id="header"
        className="header fixed-top"
        // className={
        //   scroll
        //     ? "header fixed-top header-scrolled"
        //     : "header fixed-top"
        // }
      >
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a
            href="default.aspx"
            className="logo d-flex align-items-center"
          >
            <Image
              src={headerLogo}
              alt="Header Logo"
            />
            &nbsp;|&nbsp;
            <div>
              ЕЛЕКТРИЧНА ІНЖЕНЕРІЯ
            </div>
          </a>

          <nav
            id="navbar"
            className="navbar"
          >
            <ul>
              <li className="dropdown">
                <a href="#">
                  <span>
                    Про кафедру
                  </span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="kolektyv.aspx">
                      Колектив кафедри
                    </a>
                  </li>
                  <li>
                    <a href="obovjazky.aspx">
                      Розподіл
                      обов’язків
                    </a>
                  </li>
                  <li>
                    <a href="istoria.aspx">
                      Історія кафедри
                    </a>
                  </li>
                  <li>
                    <a href="events.aspx">
                      Події на кафедрі
                    </a>
                  </li>
                  <li>
                    <a href="osvprogramy.aspx">
                      Освітні програми
                    </a>
                  </li>
                  <li>
                    <a href="navplany.aspx">
                      Навчальні плани
                    </a>
                  </li>
                  <li>
                    <a href="laborator.aspx">
                      Навчальні
                      лабораторії
                    </a>
                  </li>
                  <li>
                    <a href="fotoarchiv.aspx">
                      Фотоархів кафедри
                    </a>
                  </li>
                  <li>
                    <a href="video.aspx">
                      Відеоархів кафедри
                    </a>
                  </li>
                  <li>
                    <a href="kadry.aspx">
                      Працювали на
                      кафедрі
                    </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Наука</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="naukova-robota.aspx">
                      Наукова робота
                      кафедри
                    </a>
                  </li>
                  <li>
                    <a href="naukovi-publikaсii.aspx">
                      Головні наукові
                      публікації
                    </a>
                  </li>
                  <li>
                    <a href="naukovi-proekty.aspx">
                      Наукові проекти
                    </a>
                  </li>
                  <li>
                    <a href="aspirantura.aspx">
                      Аспірантура
                    </a>
                  </li>
                  <li>
                    <a href="labenergysaving.aspx">
                      Лабораторія
                      енергоощадності
                    </a>
                  </li>
                  <li>
                    <a href="zahysty.aspx">
                      Захисти дисертацій
                    </a>
                  </li>
                  <li>
                    <a href="conf-2015.aspx?lang=uk">
                      Конференція - 2015
                    </a>
                  </li>
                  <li>
                    <a href="conf-2018.aspx?lang=uk">
                      Конференція - 2018
                    </a>
                  </li>
                  <li>
                    <a href="presa.aspx">
                      Публікації у пресі
                    </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Студенту</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="navproces.aspx">
                      Графіки
                      навчального
                      процесу
                    </a>
                  </li>
                  <li>
                    <a href="dyscypliny.aspx">
                      Навчальні
                      дисципліни кафедри
                    </a>
                  </li>
                  <li>
                    <a href="literatura.aspx">
                      Навчально-методична
                      література
                    </a>
                  </li>
                  <li>
                    <a href="praktyky.aspx">
                      Практики
                    </a>
                  </li>
                  <li>
                    <a href="kurs-proekt.aspx">
                      Курсове
                      проектування
                    </a>
                  </li>
                  <li>
                    <a href="dypl-proekt.aspx">
                      Дипломне
                      проектування
                    </a>
                  </li>
                  <li>
                    <a href="repozytorij.aspx">
                      Репозиторій файлів
                    </a>
                  </li>
                  <li>
                    <a href="temyproektiv.aspx">
                      Тематика
                      дипломного
                      проектування
                    </a>
                  </li>
                  <li>
                    <a href="dni-fakultetu.aspx">
                      Дні факультету
                    </a>
                  </li>
                  <li>
                    <a href="travel.aspx">
                      Тематичні
                      екскурсії
                    </a>
                  </li>
                  <li>
                    <a href="olimpiady-em.aspx">
                      Участь в
                      олімпіадах з ЕМ
                    </a>
                  </li>
                  <li>
                    <a href="olimpiady-ese.aspx">
                      Участь в
                      олімпіадах з ЕСЕ
                    </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>
                    Абітурієнту
                  </span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="abiturientu.aspx">
                      Абітурієнту про
                      спеціальність
                    </a>
                  </li>
                  <li>
                    <a href="energomenedzher.aspx">
                      Навики та уміння
                      енергоменеджера
                    </a>
                  </li>
                  <li>
                    <a href="cikavi-statti.aspx">
                      Цікаві статті
                    </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>
                    Міжн. зв`язки
                  </span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="mizhnar-spivpracia.aspx">
                      Міжнародна
                      співпраця
                    </a>
                  </li>
                  <li>
                    <a href="mizhnar-proekty.aspx">
                      Участь у
                      міжнародних
                      проектах
                    </a>
                  </li>
                  <li>
                    <a href="mizhnar-dyplomy.aspx">
                      Подвійні дипломи
                    </a>
                  </li>
                  <li>
                    <a href="mizhnar-stazhuvannia.aspx">
                      Стажування за
                      кордоном
                    </a>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#">
                  <span>Посилання</span>{" "}
                  <i className="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="kontakty.aspx">
                      Контакти Кафедри
                    </a>
                  </li>
                  <li>
                    <a href="http://tntu.edu.ua/">
                      Головна сторінка
                      університету
                    </a>
                  </li>
                  <li>
                    <a href="http://tntu.edu.ua/?p=uk/about/contacts#page">
                      Телефони та пошта
                      підрозділів
                    </a>
                  </li>
                  <li>
                    <a href="http://tntu.edu.ua/?p=uk/admission#page">
                      Приймальна комісія
                    </a>
                  </li>
                  <li>
                    <a href="http://tntu.edu.ua/?p=uk/structure/faculties/fpt#page">
                      Деканат ФПТ
                    </a>
                  </li>
                  <li>
                    <a href="gramoty.aspx">
                      Відзнаки студентів
                    </a>
                  </li>
                  <li>
                    <a href="wypusknyky-ei.aspx">
                      Випускники кафедри
                      ЕІ
                    </a>
                  </li>
                  <li>
                    <a href="wypusknyky-em.aspx">
                      Випускники кафедри
                      ЕМ (2003-2018
                      роки)
                    </a>
                  </li>
                  <li>
                    <a href="robota.aspx">
                      Працевлаштування
                      випускників
                    </a>
                  </li>
                  <li>
                    <a href="fpt-sklad-nmk.aspx">
                      Науково-методична
                      комісія факультету
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
          {/* .navbar */}
        </div>
      </header>
    </>
  );
};

export default Header;
