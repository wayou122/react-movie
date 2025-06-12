import { createContext } from 'react'
import Menu from '../layouts/Menu'
import ReviewsFilter from '../components/ReviewsFilter'
import ReviewMovieCard from '../layouts/ReviewMovieCard'
import { Container, Row, Col } from 'react-bootstrap'
import { Footer } from '../layouts/Footer'
import { useReviewerData } from '../hooks/useReviewerData'
import LoadingSpinner from '../components/LoadingSpinner'
import { ReviewProvider } from '../contexts/ReviewContext'
import { useParams, useSearchParams } from 'react-router-dom'


function Reviewer() {
  const { reviewerName } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1");
  const { reviewerData, loading } = useReviewerData(reviewerName, page)

  if (loading) return <LoadingSpinner />

  const reviewsData = reviewerData

  function handlePageClick(newPage) {
    if (newPage < 1 || newPage > reviewsData.totalPages) return
    setSearchParams({ page: newPage.toString() })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Menu />
      <Container>
        <h2 className='h2-title'>{reviewerName} 的影評</h2>
        {loading && <LoadingSpinner />}
        {reviewsData.content.length > 0 ?
          reviewsData.content.map((review) => (
            <Row className='justify-content-center'
              key={review.reviewId}>
              <Col xs={12} sm={9} lg={6}>
                <ReviewProvider
                  value={{ review, loading }}>
                  <ReviewMovieCard className="mb-1" />
                </ReviewProvider>
              </Col>
            </Row>
          )) : (
            <Row className='justify-content-center'>
              <Col xs={12} sm={9} lg={6}>
                <div className="text-center mt-3 mb-3">目前沒有影評 😔</div>
              </Col>
            </Row>
          )
        }
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
export default Reviewer