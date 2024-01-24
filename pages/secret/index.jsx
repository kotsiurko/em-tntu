import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "components/Header/Header";
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs";
import { mainMenuQueriesObjCreator } from "lib/queries";
import { menuItems } from "components/Header/menuItems";
import { menuCreator, menuItemsMerger } from "lib/menuCreator";
import { client } from "lib/client";

const SecretForm = ({ mainMenuQO, secretPage }) => {
  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Виконати перевірку пароля
    if (password === secretPage[0].secretPagePass) {
      localStorage.setItem("authenticated", "true"); // Зберегти статус аутентифікації
      setTimeout(() => {
        localStorage.removeItem("authenticated"); // Видалити статус аутентифікації через 15 хвилин
      }, 900000); // 15 хвилин = 900 000 мілісекунд

      router.push("/secret/protected-page");
    } else {
      alert("Невірний пароль");
    }
  };

  useEffect(() => {
    const menuObj = menuItemsMerger(menuItems, mainMenuQO);

    setMainMenuArr((prevState) => {
      if (prevState) {
        return menuCreator(menuObj, prevState);
      }
    });
  }, [mainMenuQO]);

  return (
    <>
      <Head>
        <title>
          Положення. розпоряджння. накази | Кафедра електричної інженерії ТНТУ
        </title>
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Про кафедру"
        pageTitle="Для працівників"
        pageUrl="/secret"
      />

      {/* ======= Inner Page Section ======= */}
      <section className="inner-page">
        <div className="container">
          <header className="section-header">
            <p>КАФЕДРАЛЬНІ ПОЛОЖЕННЯ, РОЗПОРЯДЖЕННЯ ТА НАКАЗИ</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="mx-sm-3 mb-2">
                <label htmlFor="inputPassword2" className="sr-only pb-2">
                  Введіть пароль доступу до сторінки
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword2"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Увійти
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* ======= End Inner Page Section ======= */}
    </>
  );
};

export default SecretForm;

export async function getStaticProps() {
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const secretPage = await client.fetch(
    `*[_type == "secretPage" && defined(secretPagePass)]`
  );

  return {
    props: {
      mainMenuQO,
      secretPage,
    },
  };
}
