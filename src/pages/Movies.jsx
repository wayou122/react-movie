import { useState, useEffect, createContext } from "react"
import Menu from "../layouts/Menu"
import Searchbar from "../components/Searchbar"
import MoviesFilter from '../components/MoviesFilter'
import MovieCard from "../layouts/MovieCard"
import { Container, Row, Col, Card } from 'react-bootstrap'
import LoadingSpinner from "../components/LoadingSpinner"
import { useMoviesData } from "../hooks/useMoviesData"
import { MovieProvider } from "../contexts/MovieContext"

export const MoviesFilterContext = createContext()

function Movies() {
  const [moviesFilter, setMoviesFilter] = useState(null)
  const { moviesData, loading } = useMoviesData(moviesFilter)
  useEffect(() => {
    setMoviesFilter({ type: '全部類型', sort: '最新上映' })
  }, [])

  return (
    <>
      <Menu />
      {loading && <LoadingSpinner />}
      <Container>
        <Searchbar />
        <h2 className="h2-title">電影列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <MoviesFilterContext.Provider value={[moviesFilter, setMoviesFilter]}>
              <MoviesFilter />
            </MoviesFilterContext.Provider >
          </Col>
        </Row>
        {moviesData ? moviesData.map((movieData) => (
          <MovieProvider
            key={movieData.movieId}
            value={{ movieData, loading, link: true }}>
            <Row className='justify-content-center'>
              <Col xs={12} sm={9} lg={6}>
                <Card className="mb-1" >
                  <MovieCard />
                </Card>
              </Col>
            </Row>
          </MovieProvider>
        )) : (
          <div>無符合電影</div>
        )}
      </Container>
    </>
  )
}
export default Movies