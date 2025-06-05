import { useState, useEffect } from "react"
import { useMoviesData } from "../hooks/useMoviesData"
import LoadingSpinner from "../components/LoadingSpinner";

const PaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [moviesFilter, setMoviesFilter] = useState({ type: '全部類型', sort: '最新上映', keyword: '' })
  const { moviesData, loading } = useMoviesData(moviesFilter)

  if (loading) return <LoadingSpinner />
  let totalPages = 0
  let currentItems = []

  if (moviesData) {
    // 計算總頁數
    totalPages = Math.ceil(moviesData.length / itemsPerPage);

    // 取得目前這一頁要顯示的資料
    currentItems = moviesData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }
  // 換頁
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>資料列表</h2>
      <ul>
        {currentItems.map((item, index) => (
          <li key={index.movieId}>{item.title}</li>
        ))}
      </ul>
      <div style={{ marginTop: "20px" }}>
        {/* 上一頁 */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          上一頁
        </button>

        <div>{currentPage}</div>

        {/* 頁碼按鈕 */}
        {/* {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              style={{
                margin: "0 5px",
                fontWeight: currentPage === page ? "bold" : "normal",
                backgroundColor: currentPage === page ? "#ccc" : "white",
              }}
            >
              {page}
            </button>
          );
        })} */}

        {/* 下一頁 */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          下一頁
        </button>
      </div>
    </div>
  );
};

export default PaginationExample;