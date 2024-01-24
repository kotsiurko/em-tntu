import { client } from "lib/client";
import { useState } from "react";

// Client connection
import { paginationQuery, newsPerPage } from "lib/queries";

function Pagination({ totalNewsAmount, sendDataToParent, bool }) {
  const [currPage, setCurrPage] = useState(localStorage.getItem("curr_page"));
  const totalPages = Math.ceil(totalNewsAmount / newsPerPage);

  async function fetchPrevPage() {
    let startIdx = newsPerPage * currPage - 2 * newsPerPage;
    let endIdx = newsPerPage * currPage - newsPerPage;

    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(currPage - 1);
    localStorage.setItem("curr_page", currPage - 1);
    sendDataToParent(result);
  }

  async function fetchNextPage() {
    let startIdx = newsPerPage * currPage;
    let endIdx = startIdx + newsPerPage;

    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(currPage + 1);
    localStorage.setItem("curr_page", currPage + 1);
    sendDataToParent(result);
  }

  async function fetchLastPage() {
    let startIdx = newsPerPage * (totalPages - 1);
    let endIdx = totalNewsAmount + 1;
    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(totalPages);
    localStorage.setItem("curr_page", totalPages);
    sendDataToParent(result);
  }

  async function fetchFirstPage() {
    let startIdx = 0;
    let endIdx = startIdx + newsPerPage;
    const result = await client.fetch(paginationQuery(startIdx, endIdx, bool));

    setCurrPage(1);
    localStorage.setItem("curr_page", 1);
    sendDataToParent(result);
  }

  return (
    <div className="blog">
      <div className="blog-pagination">
        <ul className="justify-content-center">
          {currPage !== 1 && (
            <li className="page">
              <a href={null} onClick={fetchFirstPage}>
                1
              </a>
            </li>
          )}
          {currPage !== 1 && currPage - 1 !== 1 && (
            <li className="page">
              <a href={null} onClick={fetchPrevPage}>
                Попередня
              </a>
            </li>
          )}
          <li className="active">
            <a href={null}>{currPage}</a>
          </li>
          {currPage < totalPages && currPage + 1 !== totalPages && (
            <li className="page">
              <a href={null} onClick={fetchNextPage}>
                Наступна
              </a>
            </li>
          )}
          {currPage < totalPages && (
            <li className="page">
              <a href={null} onClick={fetchLastPage}>
                {totalPages}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Pagination;
