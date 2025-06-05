import { useState, createContext, useContext, useEffect } from "react"
import Menu from "../layouts/Menu"
import Searchbar from "../components/Searchbar"
import MoviesFilter from '../components/MoviesFilter'
import MovieCard from "../layouts/MovieCard"
import { Container, Row, Col, Card } from 'react-bootstrap'
import LoadingSpinner from "../components/LoadingSpinner"
import { useMoviesData } from "../hooks/useMoviesData"
import { MovieProvider } from "../contexts/MovieContext"
import { Footer } from "../layouts/Footer"
import { UserContext } from "../contexts/UserContext"
import { useLocation } from "react-router-dom"

export const MoviesFilterContext = createContext()

function Movies() {
  const { user } = useContext(UserContext)
  const [moviesFilter, setMoviesFilter] = useState(
    { type: '全部類型', sort: '評價最高', keyword: '' })
  const { moviesData, loading } = useMoviesData(moviesFilter)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [moviesData])

  const isWatchlist = useLocation().pathname.includes('watchlist')

  if (!moviesData) return <LoadingSpinner />

  const itemsPerPage = 10
  const totalPages = Math.ceil(moviesData.length / itemsPerPage)
  const currentMoviesData = moviesData.slice((currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage)

  function handlePageClick(page) {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (isWatchlist && !user)
    return (<>
      <Menu />
      <div className="text-center">請先登入再查看收藏清單</div>
    </>
    )
  return (
    <>
      <Menu />
      {loading && <LoadingSpinner />}
      <Container>
        <h2 className="h2-title">電影列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <MoviesFilterContext.Provider value={[moviesFilter, setMoviesFilter]}>
              <Searchbar />
              <MoviesFilter />
            </MoviesFilterContext.Provider >
          </Col>
        </Row>
        {currentMoviesData ? currentMoviesData.map((movieData) => (
          <>
            <Row className='justify-content-center'>
              <Col xs={12} sm={9} lg={6}>
                <MovieProvider
                  key={movieData.movieId}
                  value={{ movieData, loading, link: true }}>
                  <Card className="mb-1" >
                    <MovieCard />
                  </Card>
                </MovieProvider>
              </Col>
            </Row>
          </>
        )) : (
          <Row className='justify-content-center'>
            <Col xs={12} sm={9} lg={6}>
              <div className="text-center">查無電影 😔</div>
            </Col>
          </Row>
        )}

        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-2">
            <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}
              onClick={() => handlePageClick(currentPage - 1)}>
              <a className="page-link page-button" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link">{currentPage}</a></li>
            <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageClick(currentPage + 1)}>
              <a className="page-link page-button" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </Container>
      <Footer />
    </>
  )
}
export default Movies