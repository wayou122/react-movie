import { createContext, useState } from 'react'
import Menu from '../layouts/Menu'
import ReviewsFilter from '../components/ReviewsFilter'
import ReviewMovieCard from '../layouts/ReviewMovieCard'
import Searchbar from '../components/Searchbar'
import { Container, Row, Col } from 'react-bootstrap'
import { reviewAPI } from '../api/api'
import { Footer } from '../layouts/Footer'

export const ReviewsFilterContext = createContext()

function Reviews() {
  const [myFilter, setMyFilter] = useState({
    '排序': '最新影評',
    '類型': '所有類型',
    '評分': '所有評分'
  });

  async function fetchReviewsData() {
    try {
      const res = await fetch(reviewAPI, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(moviesFilter)
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMoviesData(resData.data)
      } else {
        console.error('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.error('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Menu />
      <Container>
        <Searchbar />
        <h2 className='h2-title'>評論列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <ReviewsFilterContext.Provider value={[myFilter, setMyFilter]} >
              <ReviewsFilter />
            </ReviewsFilterContext.Provider>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <ReviewMovieCard />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
export default Reviews