import { client } from "@/lib/client";
import { useState } from "react";

// Client connection
import { paginationQuery, newsPerPage } from "@/lib/queries";

function Pagination({ totalNewsAmount, sendDataToParent, bool }) {
  const [currPage, setCurrPage] = useState(1);
  const totalPages = Math.ceil(totalNewsAmount / newsPerPage);

  async function fetchPrevPage() {
    let startIdx = newsPerPage * currPage - 2 * newsPerPage;
    let endIdx = newsPerPage * currPage - newsPerPage;

    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(currPage - 1);
    sendDataToParent(result);
  }

  async function fetchNextPage() {
    let startIdx = newsPerPage * currPage;
    let endIdx = startIdx + newsPerPage;

    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(currPage + 1);
    sendDataToParent(result);
  }

  async function fetchLastPage() {
    let startIdx = newsPerPage * (totalPages - 1);
    let endIdx = totalNewsAmount + 1;
    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(totalPages);
    sendDataToParent(result);
  }

  async function fetchFirstPage() {
    let startIdx = 0;
    let endIdx = startIdx + newsPerPage;
    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(1);
    sendDataToParent(result);
  }

  return (
    <div className="blog">
      <div className="blog-pagination">
        <ul className="justify-content-center">
          <li className="page">
            {currPage !== 1 && (
              <a href={null} onClick={fetchFirstPage}>
                Перша
              </a>
            )}
          </li>
          <li className="page">
            {currPage !== 1 && (
              <a href={null} onClick={fetchPrevPage}>
                Попередня
              </a>
            )}
          </li>
          <li className="active">
            <a href={null}>{currPage}</a>
          </li>
          <li className="page">
            {currPage < totalPages && (
              <a href={null} onClick={fetchNextPage}>
                Наступна
              </a>
            )}
          </li>
          <li className="page">
            {currPage < totalPages && (
              <a href={null} onClick={fetchLastPage}>
                Остання
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
