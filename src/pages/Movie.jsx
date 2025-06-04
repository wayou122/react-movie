import { MovieProvider } from "../contexts/MovieContext"
import { useParams } from "react-router-dom"
import { Row, Col, Container } from 'react-bootstrap'
import Menu from "../layouts/Menu"
import MovieCard from "../layouts/MovieCard"
import ReviewSection from "../layouts/ReviewSection"
import MovieSummary from "../layouts/MovieSummary"
import MovieBanner from "../layouts/MovieBanner"
import { useMovieData } from "../hooks/useMovieData"

function Movie() {
  const { id } = useParams()
  const { movieData, loading } = useMovieData(id)

  return (
    <>
      <Menu />
      <MovieProvider value={{ movieData, loading, link: false }}>
        <Container>
          <Row className='justify-content-center'>
            <Col xs={12} sm={9} lg={6}>
              <MovieBanner />
              <MovieCard />
              <MovieSummary />
              <hr />
              <ReviewSection />
            </Col>
          </Row>
        </Container>
      </MovieProvider>
    </>
  )
}
export default Movie