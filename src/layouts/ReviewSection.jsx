import { useState, useMemo, useContext, useEffect } from 'react'
import { MovieContext } from '../contexts/MovieContext'
import { Row, Col, Card, Form } from 'react-bootstrap'
import Review from "./Review"
import LoadingSpinner from '../components/LoadingSpinner'
import { ReviewProvider } from "../contexts/ReviewContext"
import { UserContext } from '../contexts/UserContext'
import WriteReview from './WriteReview'

function ReviewSection() {
  const { user } = useContext(UserContext)
  const { movieData, loading } = useContext(MovieContext)
  const [filteredReviews, setFilteredReviews] = useState([])
  console.log(filteredReviews)
  const [myFilter, setMyFilter] = useState({
    sort: '最新影評', score: '全部評價'
  });

  const reviews = useMemo(() => {
    if (!movieData) return
    return movieData.reviews
  }, [movieData])

  const userId = user ? user.userId : null
  const sortOptions = ['最新影評', '熱門影評']
  const scoreOptions = ['全部評價', '超讚', '好看', '普普', '難看', '爛透']
  const scoreMap = { '超讚': 5, '好看': 4, '普普': 3, '難看': 2, '爛透': 1 }

  useEffect(() => {
    if (!reviews) return
    setFilteredReviews(filterReviews(reviews))
  }, [reviews, myFilter])

  if (loading) return <LoadingSpinner />

  function handleChange(e) {
    setMyFilter(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  function filterReviews(reviews) {
    const sorted = reviews.toSorted((a, b) => {
      if (myFilter.sort == '最新影評') {
        return b.createdDate > a.createdDate ? 1 : -1;
      } else if (myFilter.sort == '熱門影評') {
        return b.likeCount - a.likeCount;
      }
    })
    if (myFilter.score == '全部評價') {
      return sorted;
    }
    const myScore = scoreMap[myFilter.score]
    return sorted.filter(r => r.score == myScore)
  }

  return (
    <>
      {reviews.some(r => r.authorId == userId) ? '' :
        (<>
          <WriteReview />
          <hr />
        </>)
      }

      <Row>
        <Col>
          <Form.Select name='sort' className='mb-3'
            onChange={handleChange}>
            {sortOptions.map(o =>
              <option key={o}>{o}</option>
            )}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select name='score' className='mb-3'
            onChange={handleChange}>
            {scoreOptions.map(o =>
              <option key={o}>{o}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
      {console.log(filteredReviews.length)}
      {Array.isArray(filteredReviews) && filteredReviews.length > 0 ?
        filteredReviews.map((review) => (
          <Row className='justify-content-center' key={review.reviewId}>
            <Card className='ps-3 pe-3 pt-2 pb-2 mt-2'>
              <ReviewProvider value={{ review, loading }}>
                <Review />
              </ReviewProvider>
            </Card>
          </Row>
        ))
        :
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <div className="text-center small">沒有符合條件的影評 😔</div>
          </Col>
        </Row>
      }
    </>
  )
}
export default ReviewSection