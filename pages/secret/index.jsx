import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { mainMenuQueriesObjCreator } from "@/lib/queries";
import { menuItems } from "@/components/Header/menuItems";
import { menuCreator, menuItemsMerger } from "@/lib/menuCreator";
import { client } from "@/lib/client";

const SecretForm = ({ mainMenuQO, other }) => {
  const [mainMenuArr, setMainMenuArr] = useState(menuItems);

  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Виконати перевірку пароля
    if (password === other[0].secretPagePass) {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainMenuQO]);

  return (
    <>
      <Head>
        <title>Кафедра електричної інженерії ТНТУ :: Історія кафедри</title>
      </Head>

      <Header mainMenuArr={mainMenuArr} />

      <Breadcrumbs
        chapterTitle="Про кафедру"
        pageTitle="Колектив"
        pageUrl="/about/staff"
      />

      {/* ======= Inner Page Section ======= */}
      <section className="inner-page">
        <div className="container">
          <header className="section-header">
            <p>ВНУТРІШНЬОКАФЕДРАЛЬНІ ПОЛОЖЕННЯ, РОЗПОРЯДЖЕННЯ ТА НАКАЗИ</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="mx-sm-3 mb-2">
                <label htmlFor="inputPassword2" className="sr-only">
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
  // const staffData = await client.fetch(staffListQuery);
  const mainMenuQO = await mainMenuQueriesObjCreator();
  const other = await client.fetch(`*[_type=='other']`);

  return {
    props: {
      // staffData,
      mainMenuQO,
      other,
    },
  };
}
