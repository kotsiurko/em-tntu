// import BlockContent from "@sanity/block-content-to-react";
// import { clientConfig } from "@/lib/client";
import { useEffect, useState } from "react";

const itemsPerPage = 10;

function Pagination({ totalNewsAmount }) {
  const [newsArr, setNewsArr] = useState(initArr);
  const [currPage, setCurrPage] = useState(1);
  const totalPages = Math.ceil(totalNewsAmount / itemsPerPage);

  async function fetchPrevPage() {
    let startIdx = itemsPerPage * currPage - 2 * itemsPerPage;
    let endIdx = itemsPerPage * currPage - itemsPerPage;

    const result = await client.fetch(paginationQuery(startIdx, endIdx));

    setCurrPage(currPage - 1);
    setNewsArr(result);
  }

  async function fetchNextPage() {
    let startIdx = itemsPerPage * currPage;
    let endIdx = startIdx + itemsPerPage;

    const result = await client.fetch(paginationQuery(startIdx, endIdx));

    setCurrPage(currPage + 1);
    setNewsArr(result);
  }

  async function fetchLastPage() {
    let startIdx = itemsPerPage * (totalPages - 1);
    let endIdx = totalNewsAmount + 1;
    const result = await client.fetch(paginationQuery(startIdx, endIdx));

    setCurrPage(totalPages);
    setNewsArr(result);
  }
  async function fetchFirstPage() {
    let startIdx = 0;
    let endIdx = startIdx + itemsPerPage;
    const result = await client.fetch(paginationQuery(startIdx, endIdx));

    setCurrPage(1);
    setNewsArr(result);
  }

  return (
    <div class="blog">
      <div class="blog-pagination">
        <ul class="justify-content-center">
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
