// import Image from "next/image";

// Images

const Responsibilities = () => {
  return (
    <>
      {/* ======= Breadcrumbs ======= */}
      <section className="breadcrumbs">
        <div className="container">
          <ol>
            <li>
              <a href="default.aspx">
                Головна
              </a>
            </li>
            <li>Про кафедру</li>
          </ol>
          <h2>Розподіл обов`язків</h2>
        </div>
      </section>
      {/* End Breadcrumbs */}

      {/* ======= Inner Page Section ======= */}
      <section className="inner-page">
        <div className="container">
          <header className="section-header">
            <p>
              РОЗПОДІЛ ОБОВ`ЯЗКІВ СЕРЕД
              ПРАЦІВНИКІВ КАФЕДРИ
            </p>
          </header>

          <table className="table table-striped table-hover">
            <tr>
              {" "}
              <th>
                №<br />
                п/п
              </th>
              <th>
                Обов’язки
                <br />
                по кафедрі
              </th>{" "}
              <th>
                Відповідальний
                <br />
                працівник
              </th>
            </tr>
            <tr>
              {" "}
              <td>1</td>{" "}
              <td>
                Навчальні плани,
                навантаження, додатки до
                дипломів
              </td>{" "}
              <td>
                <a href="person.aspx?name=koval">
                  Коваль Вадим Петрович
                </a>
                <br />
                <a href="person.aspx?name=kostyk">
                  Костик Любов
                  Миколаївна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>2</td>{" "}
              <td>
                Розподіл навантаження по
                викладачах для складання
                розкладу (2 рази на рік)
              </td>{" "}
              <td>
                <a href="person.aspx?name=koval">
                  Коваль Вадим Петрович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>3</td>{" "}
              <td>
                Звіти про виконання
                навчальної роботи
                кафедри (2 рази на рік)
              </td>{" "}
              <td>
                <a href="person.aspx?name=kostyk">
                  Костик Любов
                  Миколаївна
                </a>
                <br />
              </td>
            </tr>
            <tr>
              {" "}
              <td>4</td>{" "}
              <td>
                Графік відпусток,
                ведення табелів
                (лікарняні, відрядження)
              </td>{" "}
              <td>
                <a href="person.aspx?name=panchyshyn">
                  Панчишин Іванна
                  Павлівна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>5</td>{" "}
              <td>
                Інформування працівників
                кафедри про робочі та
                вихідні дні (через
                Viber)
              </td>{" "}
              <td>
                <a href="person.aspx?name=getmanjuk">
                  Гетманюк Володимир
                  Іванович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>6</td>{" "}
              <td>
                Введення в АСУ рейтингу
                працівників кафедри (2
                рази на рік)
              </td>{" "}
              <td>
                <a href="person.aspx?name=nakonechnyj">
                  Наконечний Мирослав
                  Степанович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>7</td>{" "}
              <td>
                Введення в АСУ
                відомостей навчальних
                дисциплін та практик
              </td>{" "}
              <td>
                <a href="person.aspx?name=panchyshyn">
                  Панчишин Іванна
                  Павлівна
                </a>
                <br />
                <a href="person.aspx?name=getmanjuk">
                  Гетманюк Володимир
                  Іванович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>8</td>{" "}
              <td>
                Секретар екзаменаційної
                комісії (бакалаври)
              </td>{" "}
              <td>
                <a href="person.aspx?name=panchyshyn">
                  Панчишин Іванна
                  Павлівна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>9</td>{" "}
              <td>
                Секретар екзаменаційної
                комісії (магістри та
                іноземці)
              </td>{" "}
              <td>
                <a href="person.aspx?name=babjuk">
                  Бабюк Сергій
                  Миколайович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>10</td>{" "}
              <td>
                Табеля погодинної оплати
                праці (іноземці)
              </td>{" "}
              <td>
                <a href="person.aspx?name=panchyshyn">
                  Панчишин Іванна
                  Павлівна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>11</td>{" "}
              <td>Діловодство</td>{" "}
              <td>
                <a href="person.aspx?name=getmanjuk">
                  Гетманюк Володимир
                  Іванович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>12</td>{" "}
              <td>
                Протоколи засідань
                кафедри
              </td>{" "}
              <td>
                <a href="person.aspx?name=beljakova">
                  Белякова Ірина
                  Володимирівна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>13</td>{" "}
              <td>
                Робота з іноземними
                студентами
              </td>{" "}
              <td>
                <a href="person.aspx?name=kuzemko">
                  Куземко Наталія
                  Анатоліївна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>14</td>{" "}
              <td>
                Реклама кафедри та
                спеціальності
              </td>{" "}
              <td>
                <a href="person.aspx?name=kocjurko">
                  Коцюрко Роман
                  Володимирович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>15</td>{" "}
              <td>
                Ведення журналу
                відкритих занять та
                взаємовідування
              </td>{" "}
              <td>
                <a href="person.aspx?name=bunjak">
                  Буняк Олег
                  Андронікович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>16</td>{" "}
              <td>
                <a href="http://tntu.edu.ua/?p=uk/schedule&s=fpt">
                  Розклади
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=panchyshyn">
                  Панчишин Іванна
                  Павлівна
                </a>
                <br />
                <a href="person.aspx?name=getmanjuk">
                  Гетманюк Володимир
                  Іванович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>17</td>{" "}
              <td>
                <a href="osvprogramy.aspx">
                  Освітні програми
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=getmanjuk">
                  Гетманюк Володимир
                  Іванович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>18</td>{" "}
              <td>
                <a href="http://tntu.org.ua/">
                  Сайт кафедри
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=kocjurko">
                  Коцюрко Роман
                  Володимирович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>19</td>{" "}
              <td>
                <a href="http://tntu.edu.ua/?p=uk/structure/departments/ei/info">
                  Сторінка кафедри на
                  сайті ТНТУ
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=filjuk">
                  Філюк Ярослав
                  Олександрович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>20</td>{" "}
              <td>
                <a href="https://www.facebook.com/kaf.ei.tntu/">
                  Сторінка кафедри у
                  Facebook
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=filjuk">
                  Філюк Ярослав
                  Олександрович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>21</td>{" "}
              <td>
                <a href="https://www.youtube.com/channel/UCkRiBJEjnihxVqZvl5lAv_A">
                  Відеоканал кафедри на
                  YouTube
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=filjuk">
                  Філюк Ярослав
                  Олександрович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>22</td>{" "}
              <td>
                <a href="https://scholar.google.com.ua/citations?user=IKmXP1oAAAAJ">
                  Профіль кафедри у
                  Google Scholar
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=nakonechnyj">
                  Наконечний Мирослав
                  Степанович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>23</td>{" "}
              <td>
                <a href="travel.aspx">
                  Тематичні екскурсії
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=orobchuk">
                  Оробчук Богдан
                  Ярославович
                </a>
                <br />
                <a href="person.aspx?name=kozak">
                  Козак Катерина
                  Миколаївна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>24</td>{" "}
              <td>
                <a href="dni-fakultetu.aspx">
                  Дні факультету,
                  організаційні заходи
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=sysak">
                  Сисак Іван Михайлович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>25</td>{" "}
              <td>
                <a href="olimpiady-em.aspx">
                  Студентські олімпіади
                  зі спеціальності
                  «Енергетичний
                  менеджмент»
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=zin">
                  Зінь Мирослав
                  Михайлович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>26</td>{" "}
              <td>
                <a href="olimpiady-ese.aspx">
                  Студентські олімпіади
                  зі спеціальності
                  «Електротехнічні
                  системи
                  електроспоживання»
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=sysak">
                  Сисак Іван Михайлович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>27</td>{" "}
              <td>
                Студентські олімпіади із
                «Загальної
                електротехніки»
              </td>{" "}
              <td>
                <a href="person.aspx?name=kuzemko">
                  Куземко Наталія
                  Анатоліївна
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>28</td>{" "}
              <td>
                <a href="laborator.aspx">
                  Забезпечення
                  функціонування
                  лабораторій кафедри
                </a>
              </td>{" "}
              <td>
                <a href="person.aspx?name=getmanjuk">
                  Гетманюк Володимир
                  Іванович
                </a>
                <br />
                <a href="person.aspx?name=levytskyj">
                  Левицький Андрій
                  Михайлович
                </a>
                <br />
                <a href="person.aspx?name=natjaga">
                  Натяга Володимир
                  Миколайович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>29</td>{" "}
              <td>
                Наукові пікніки,
                виставки
              </td>{" "}
              <td>
                <a href="person.aspx?name=zin">
                  Тарасенко Микола
                  Григорович
                </a>
                <br />
                <a href="person.aspx?name=koval">
                  Коваль Вадим Петрович
                </a>
                <br />
                <a href="person.aspx?name=zin">
                  Зінь Мирослав
                  Михайлович
                </a>
                <br />
                <a href="person.aspx?name=filjuk">
                  Філюк Ярослав
                  Олександрович
                </a>
                <br />
                <a href="person.aspx?name=getmanjuk">
                  Гетманюк Володимир
                  Іванович
                </a>
              </td>
            </tr>
            <tr>
              {" "}
              <td>30</td>{" "}
              <td>
                Профорієнтаційна робота
                серед випускників шкіл,
                коледжів, профтехучилищ
              </td>{" "}
              <td>
                <a href="person.aspx?name=babjuk">
                  Бабюк Сергій
                  Миколайович
                </a>
                <br />
                <a href="person.aspx?name=koval">
                  Коваль Вадим Петрович
                </a>
                <br />
                <a href="person.aspx?name=osadtsa">
                  Осадца Ярослав
                  Михайлович
                </a>
                <br />
                (інші – за потребою)
              </td>
            </tr>
            <tr>
              {" "}
              <td>31</td>{" "}
              <td>
                Робота у приймальній
                комісії
              </td>{" "}
              <td>
                Три бригади, які
                працюють сезон через два
              </td>
            </tr>
            <tr>
              {" "}
              <td>32</td>{" "}
              <td>
                Зв’язки з стейкхолдерами
              </td>{" "}
              <td>
                <a href="person.aspx?name=bunjak">
                  Буняк Олег
                  Андронікович
                </a>
                <br />
                <a href="person.aspx?name=vakulenko">
                  Вакуленко Олександр
                  Олексійович
                </a>
                <br />
                <a href="person.aspx?name=olijarnyk">
                  Оліярник Петро
                  Миколайович
                </a>
              </td>
            </tr>
          </table>
        </div>
      </section>
      {/* ======= End Inner Page Section ======= */}
    </>
  );
};

export default Responsibilities;
