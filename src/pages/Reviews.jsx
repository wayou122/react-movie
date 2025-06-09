import { createContext } from 'react'
import Menu from '../layouts/Menu'
import ReviewsFilter from '../components/ReviewsFilter'
import ReviewMovieCard from '../layouts/ReviewMovieCard'
import { Container, Row, Col } from 'react-bootstrap'
import { Footer } from '../layouts/Footer'
import { useReviewsData } from '../hooks/useReviewsData'
import LoadingSpinner from '../components/LoadingSpinner'
import { ReviewProvider } from '../contexts/ReviewContext'
import { useSearchParams } from 'react-router-dom'

export const ReviewsFilterContext = createContext()

function Reviews() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1");
  const sort = searchParams.get('sort') || 'new'
  const score = searchParams.get('score') || 'all'

  const { reviewsData, loading } = useReviewsData(`?page=${page}&sort=${sort}&score=${score}`)

  if (loading) return <LoadingSpinner />

  const value = { page, sort, score, setFilter }

  function handlePageClick(newPage) {
    if (newPage < 1 || newPage > reviewsData.totalPages) return
    setSearchParams({ page: newPage.toString(), sort, score })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function setFilter(newFilter) {
    setSearchParams({
      page: "1",
      sort: newFilter.sort ?? sort,
      score: newFilter.score ?? score,
    })
  }

  return (
    <>
      <Menu />
      <Container>
        <h2 className='h2-title'>評論列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <ReviewsFilterContext.Provider value={value} >
              <ReviewsFilter />
            </ReviewsFilterContext.Provider>
          </Col>
        </Row>
        {loading && <LoadingSpinner />}
        {reviewsData.content.map((review) => (
          <Row className='justify-content-center'
            key={review.reviewId}>
            <Col xs={12} sm={9} lg={6}>
              <ReviewProvider
                value={{ review, loading }}>
                <ReviewMovieCard />
              </ReviewProvider>
            </Col>
          </Row>
        ))}
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center mt-2">
            <li className={`page-item ${reviewsData.first ? 'disabled' : ''}`}
              onClick={() => handlePageClick(page - 1)}>
              <a className="page-link page-button" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item"><a className="page-link">{page}</a></li>
            <li className={`page-item ${reviewsData.last ? 'disabled' : ''}`}
              onClick={() => handlePageClick(page + 1)}>
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
export default Reviews