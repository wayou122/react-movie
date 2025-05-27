import { useState, useEffect, createContext } from "react"
import Menu from "../layouts/Menu"
import Searchbar from "../components/Searchbar"
import MoviesFilter from '../components/MoviesFilter'
import MovieCard from "../layouts/MovieCard"
import { Container, Row, Col, Card } from 'react-bootstrap'
import { movieAPI } from "../api/api"


function Movies() {
  const MovieContext = createContext(null)
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    fetchMovieData()
  }, [])

  async function fetchMovieData() {
    try {
      const res = await fetch(movieAPI, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMoviesData(resData.data)
      } else {
        alert('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.log('載入錯誤: ' + err.message)
    }
  }

  return (
    <>
      <Menu />
      <Container>
        <Searchbar />
        <h2 className="h2-title">電影列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <MoviesFilter />
          </Col>
        </Row>
        {
          moviesData.map((movieData) => (
            <MovieContext.Provider value={movieData}>
              <Row className='justify-content-center'>
                <Col xs={12} sm={9} lg={6}>
                  <Card>
                    <MovieCard />
                  </Card>
                </Col>
              </Row>
            </MovieContext.Provider>
          ))
        }

      </Container>
    </>
  )
}
export default Movies