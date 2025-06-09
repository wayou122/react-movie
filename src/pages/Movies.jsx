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
import { useSearchParams } from "react-router-dom"

export const MoviesFilterContext = createContext()

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get('page') || '1')
  const sort = searchParams.get('sort') || 'score_desc'
  const type = searchParams.get('type') || 'all'
  const keyword = searchParams.get('keyword') || ''
  const { moviesData, loading } =
    useMoviesData(`?page=${page}&sort=${sort}&type=${type}&keyword=${keyword}`)

  if (loading) return <LoadingSpinner />

  const value = { page, sort, type, keyword, setFilter }

  function handlePageClick(newPage) {
    if (newPage < 1 || newPage > moviesData.totalPages) return
    setSearchParams({
      page: newPage.toString(),
      sort, type, keyword
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function setFilter(newFilter) {
    setSearchParams({
      page: "1",
      sort: newFilter.sort ?? sort,
      type: newFilter.type ?? type,
      keyword: newFilter.keyword ?? keyword,
    })
  }

  return (
    <>
      <Menu />
      <Container>
        <h2 className="h2-title">電影列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <MoviesFilterContext.Provider value={value}>
              <Searchbar />
              <MoviesFilter />
            </MoviesFilterContext.Provider >
          </Col>
        </Row>
        {loading && <LoadingSpinner />}
        {moviesData.content.length > 0 ?
          moviesData.content.map((movieData) => (
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
          )) : (
            <Row className='justify-content-center'>
              <Col xs={12} sm={9} lg={6}>
                <div className="text-center mt-3 mb-3">沒有找到符合的電影 😔</div>
              </Col>
            </Row>
          )}

        {moviesData.content.length > 0 ?
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center mt-2">
              <li className={`page-item ${moviesData.first ? 'disabled' : ''}`}
                onClick={() => handlePageClick(page - 1)}>
                <a className="page-link page-button" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link">{page}</a></li>
              <li className={`page-item ${moviesData.last ? 'disabled' : ''}`}
                onClick={() => handlePageClick(page + 1)}>
                <a className="page-link page-button" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          : ''
        }
      </Container>
      <Footer />
    </>
  )
}
export default Movies