import { useEffect, useState } from "react"
import { MovieContext } from "../contexts/MovieContext"
import { useParams } from "react-router-dom"
import { Row, Col, Container } from 'react-bootstrap'
import Menu from "../layouts/Menu"
import MovieCard from "../layouts/MovieCard"
import WriteReview from "../layouts/WriteReview"
import ReviewSection from "../layouts/ReviewSection"
import MovieSummary from "../layouts/MovieSummary"
import MovieBanner from "../layouts/MovieBanner"
import { movieIdAPI } from "../api/api"

function Movie() {
  const { id } = useParams()
  const [movieData, setMovieData] = useState()
  //const [error, setError] = useState()

  useEffect(() => {
    fetchMovieData(id)
  }, [id])

  async function fetchMovieData(id) {
    try {
      const res = await fetch(movieIdAPI(id), {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMovieData(resData.data)
        //setError(null)
      } else {
        console.log('載入失敗: ' + resData.message)
        //setError('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.log('載入錯誤: ' + err.message)
      //setError('載入錯誤: ' + err.message)
    }
  }

  return (
    <>
      <Menu />
      <MovieContext.Provider value={movieData}>
        <Container>
          <Row className='justify-content-center'>
            <Col xs={12} sm={9} lg={6}>
              <MovieBanner />
              <MovieCard />
              <MovieSummary />
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col xs={12} sm={9} lg={6}>
              <WriteReview></WriteReview>
            </Col>
          </Row>
          <ReviewSection />
        </Container>
      </MovieContext.Provider>
    </>
  )
}
export default Movie