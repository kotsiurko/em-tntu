import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { mainMenuQueriesObjCreator } from "lib/queries";
import { menuItems } from "components/Header/menuItems";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { client } from "lib/client";

// Other libs
import moment from "moment";


const ProtectedPage = ({
  mainMenuQO,
  secretDocsList,
}) => {

  // console.log('secretDocsList :>> ', secretDocsList);
  // const [initialList] = useState(secretDocsList.slice());
  // const [selectedDocList, setSelectedDocList] = useState(secretDocsList.slice());

  const [selectedItemId, setSelectedItemId] = useState(secretDocsList[0]._id);
  const [initialList] = useState(JSON.parse(JSON.stringify(secretDocsList)));
  const [selectedDocList, setSelectedDocList] = useState(JSON.parse(JSON.stringify(secretDocsList)));
  const [filteredByCat, setFilteredByCat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputSubmit = (event) => {
    event.preventDefault();

    if (searchQuery.length > 0) {
      const tempArr = JSON.parse(JSON.stringify(secretDocsList))
      const searchedSelectedDocList = tempArr.map(obj => ({ ...obj, docs: obj.docs.slice() })).filter(obj => {
        obj.docs = obj.docs.filter(doc =>
        (doc.docForWhom.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.docTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.docNumber.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        return obj.docs.length > 0;
      });
      setSelectedDocList(searchedSelectedDocList);
    } else {
      setSelectedDocList(initialList);
    }

  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length === 0) {
      setSelectedDocList(initialList);
    }
  };

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };

  const handleCatClick = (category) => {
    const tempArr = JSON.parse(JSON.stringify(secretDocsList));
    const filteredSelectedDocList = tempArr.filter(obj => {
      obj.docs = obj.docs.filter(doc => doc.docCats === category);
      return obj.docs.length > 0;
    });
    setSelectedDocList(filteredSelectedDocList);
    setFilteredByCat(true);
  };

  const filterReset = () => {
    setFilteredByCat(false);
    setSelectedDocList(initialList);
  }

  const [mainMenuArr, setMainMenuArr] = useState(menuItems);
  const router = useRouter();

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });

    // Перевірити, чи існує статус аутентифікації в localStorage
    const authenticated = localStorage.getItem("authenticated");
    if (!authenticated) {
      router.push("/secret"); // Перенаправити на головну сторінку, якщо не аутентифіковано
    }
  }, [mainMenuQO, router]);

  return (
    <>
      <Head>
        <title>Положення, розпорядження та накази | Кафедра електричної інженерії ТНТУ</title>
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Кафедра"
        pageTitle="Для працівників"
        pageUrl="/secret"
      />

      {/* ======= Inner Page Section ======= */}
      <section className="inner-page">
        <div className="container">
          <header className="section-header">
            <p>КАФЕДРАЛЬНІ НАКАЗИ, РОЗПОРЯДЖЕННЯ ТА ПОЛОЖЕННЯ ПО КАФЕДРІ</p>
          </header>

          <div className="d-flex justify-content-between align-items-center mb-4">

            <form className="d-flex" onSubmit={handleInputSubmit}>
              <div className="form-group">
                <input type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Введіть пошуковий запит"
                  value={searchQuery}
                  onChange={handleInputChange}
                  style={{ width: 250 }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mx-2"
              >Шукати</button>
              {filteredByCat && <button
                type="submit"
                className="btn btn-primary mx-2"
                onClick={filterReset}
              >Скинути категорії</button>}
            </form>

            <button type="submit"
              className="btn btn-primary"
              onClick={() => {
                localStorage.removeItem("authenticated");
                router.push("/secret");
              }}>
              Вийти
            </button>
          </div>

          <div className="accordion" id="accordionExample">

            {selectedDocList.map(({ pageTitle, _id, docs }) => {
              return (
                <div className="card" key={_id} style={{ "fontSize": "0.9rem" }}>
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        onClick={() => { handleItemClick(_id) }}
                      >
                        {pageTitle}
                      </button>
                    </h2>
                  </div>

                  <div
                    id="collapseOne"
                    className={selectedItemId === _id ? 'collapse show' : 'collapse'}
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <table className="table table-striped table-hover table-sm">
                        <thead>
                          <tr style={{ textAlign: 'center' }}>
                            <th scope="col" style={{ minWidth: "50px" }}>Дата</th>
                            <th scope="col" style={{ minWidth: "90px" }}>Реєстр. №</th>
                            <th scope="col">Назва документу</th>
                            <th scope="col" style={{ width: "160px" }}>Категорія</th>
                            <th scope="col" style={{ minWidth: "140px" }}>Для кого</th>
                          </tr>
                        </thead>
                        <tbody>
                          {docs && docs.map(row => {
                            return (
                              <tr key={row._key}>
                                <td scope="row" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{moment(row.publishedDate).format("DD.MM")}</td>
                                <th scope="row" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{row.docNumber}</th>
                                <td scope="row" style={{ verticalAlign: 'middle' }}><a href={row.docUrl} download>{row.docTitle}</a></td>
                                <td scope="row" style={{ verticalAlign: 'middle' }}>
                                  <button
                                    type="button"
                                    style={{ width: '100%' }}
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => (handleCatClick(row.docCats))}
                                  >{row.docCats}</button>
                                </td>
                                <td scope="row" style={{ textAlign: 'center', verticalAlign: 'middle' }}><a href={null} >{row.docForWhom}</a>
                                </td>
                              </tr>
                            )
                          })}

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            })}


          </div>
        </div>
      </section >
      {/* ======= End Inner Page Section ======= */}
    </>
  );
};

export default ProtectedPage;

export async function getStaticProps() {
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const secretDocsList = await client.fetch(`*[_type == "secretPage" && defined(docs)] | order(year desc)`);

  return {
    props: {
      mainMenuQO,
      secretDocsList,
    },
  };
}