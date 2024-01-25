import { client } from "lib/client";
import { useState } from "react";
import { useRouter } from "next/router";

// Client connection
import { paginationQuery, newsPerPage } from "lib/queries";
import { getPortion } from "lib/helpers";

function NewPagination({
  totalNewsAmount,
  currPage,
  setResultQuery,
  setCurrPage,
  newsBool,
}) {
  const totalPages = Math.ceil(totalNewsAmount / newsPerPage);

  async function getData(page) {
    const res = await getPortion(page, newsBool);
    setResultQuery(res);
  }

  const router = useRouter();
  // console.log("router :>> ", router);

  return (
    <div className="d-flex mt-4 justify-content-center gap-2">
      {currPage !== 1 && (
        <button
          type="button"
          className="btn btn-primary"
          disabled={currPage == 1}
          onClick={() => {
            getData(1);
            setCurrPage(1);
            // router.push(`/about/news?page=${1}`);
            router.push(`${router.asPath.split("?page=")[0]}?page=${1}`);
          }}
        >
          Перша
        </button>
      )}
      <button
        type="button"
        className="btn btn-primary"
        disabled={currPage == 1}
        onClick={() => {
          getData(currPage - 1);
          setCurrPage(currPage - 1);
          router.push(
            `${router.asPath.split("?page=")[0]}?page=${currPage - 1}`
          );
        }}
      >
        Назад
      </button>
      <button type="button" className="btn btn-primary" disabled={true}>
        {currPage} / {totalPages}
      </button>
      <button
        type="button"
        className="btn btn-primary"
        disabled={currPage == totalPages}
        onClick={() => {
          getData(currPage + 1);
          setCurrPage(currPage + 1);
          router.push(
            `${router.asPath.split("?page=")[0]}?page=${currPage + 1}`
          );
        }}
      >
        Вперед
      </button>
      {currPage !== totalPages && (
        <button
          type="button"
          className="btn btn-primary"
          disabled={currPage == totalPages}
          onClick={() => {
            getData(totalPages);
            setCurrPage(totalPages);
            router.push(
              `${router.asPath.split("?page=")[0]}?page=${totalPages}`
            );
          }}
        >
          Остання
        </button>
      )}
    </div>
  );
}

export default NewPagination;
