import { MovieProvider } from "../contexts/MovieContext"
import { useParams } from "react-router-dom"
import { Row, Col, Container } from 'react-bootstrap'
import Menu from "../layouts/Menu"
import MovieCard from "../layouts/MovieCard"
import WriteReview from "../layouts/WriteReview"
import ReviewSection from "../layouts/ReviewSection"
import MovieSummary from "../layouts/MovieSummary"
import MovieBanner from "../layouts/MovieBanner"

function Movie() {
  const { id } = useParams()
  //const { movieData } = useContext(MovieContext)
  //const [movieData, setMovieData] = useState()
  //const [error, setError] = useState()

  // useEffect(() => {
  //   fetchMovieData(id)
  // }, [id])

  // async function fetchMovieData(id) {
  //   try {
  //     console.log(movieIdAPI(id))
  //     const res = await fetch(movieIdAPI(id), {
  //       method: 'GET',
  //       credentials: 'include'
  //     })
  //     const resData = await res.json()
  //     if (res.ok && resData.code == 200) {
  //       setMovieData(resData.data)
  //       //setError(null)
  //     } else {
  //       console.log('載入失敗: ' + resData.message)
  //       //setError('載入失敗: ' + resData.message)
  //     }
  //   } catch (err) {
  //     console.log('載入錯誤: ' + err.message)
  //     //setError('載入錯誤: ' + err.message)
  //   }
  // }

  return (
    <>
      <Menu />
      <MovieProvider id={id}>
        <Container>
          <Row className='justify-content-center'>
            <Col xs={12} sm={9} lg={6}>
              <MovieBanner />
              <MovieCard />
              <MovieSummary />
              <hr />
            </Col>
          </Row>

          <Row className='justify-content-center'>
            <Col xs={12} sm={9} lg={6}>
              <WriteReview></WriteReview>
              <hr />
            </Col>
          </Row>
          <ReviewSection />
        </Container>
      </MovieProvider>
    </>
  )
}
export default Movie