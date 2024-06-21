import { useEffect, useState } from "react";
import TextContent from "../TextContent/TextContent";
import { useRouter } from "next/router";

function SciPublTypes({ data }) {
  const { sciPublTypes } = data;
  const router = useRouter();

  console.log("sciPublTypes :>> ", sciPublTypes);
  // тут з адресного рядка витягувати активну табу, а якщо такої нема, то тоді першу табу відображати
  const [activeTab, setActiveTab] = useState(sciPublTypes[0]._key);

  useEffect(() => {
    if (router.asPath.includes(`${router.query.slug}#`)) {
      // 1. ПРОЧИТАТИ ПІСЛЯ СЛЕША НАЗВУ ВКЛАДКИ
      const cuttedTab = router.asPath.split(
        "/main-scientific-publications#"
      )[1];

      // 2. ЗРОБИТИ АКТИВНОЮ ВІДПОВІДНУ ВКЛАДКУ
      setActiveTab(cuttedTab);

      setActiveTab(router.asPath.split("/main-scientific-publications#")[1]);
    }
  }, [router.asPath, router.query.slug]);

  return (
    <section className="features my-personal">
      <div className="container">
        {/* <!-- Feature Icons --> */}
        <div className="row feature-icons">
          <div className="col-xl-12 pt-2 px-2">
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {sciPublTypes.map((el) => {
                  const { sciPublType, _key } = el;
                  return (
                    <a
                      className={
                        activeTab === _key
                          ? `nav-item nav-link active`
                          : `nav-item nav-link`
                      }
                      href={`#${_key}`}
                      onClick={() => setActiveTab(_key)}
                      key={_key}
                    >
                      <b style={{ textTransform: "uppercase" }}>
                        {sciPublType}
                      </b>
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* {activeTab} */}
            <div className="row align-self-start content text-justify">
              <div className="icon-box my-dstyle mt-4 tab-content">
                {sciPublTypes.map((el) => {
                  const { sciPublType, publBody, _key } = el;
                  console.log("publBody :>> ", publBody);
                  return (
                    <div
                      className={
                        activeTab === _key
                          ? `tab-pane fade show active`
                          : `tab-pane fade`
                      }
                      key={_key}
                    >
                      <TextContent data={publBody} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Feature Icons --> */}
      </div>
    </section>
  );
}

export default SciPublTypes;
