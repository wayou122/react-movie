import { useState, useMemo, useContext, useEffect } from 'react'
import { MovieContext } from '../contexts/MovieContext'
import { Row, Col, Card, Form } from 'react-bootstrap'
import Review from "./Review"
import ReviewsFilter from '../components/ReviewsFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import { ReviewProvider } from "../contexts/ReviewContext"

const testReviews = () => [
  {
    reviewId: 1,
    username: 'moonlight998',
    userId: 3,
    score: 4,
    likeCount: 23,
    content: "有些事情其實也沒有解釋，只是走著走著就懂了。人們總說成長是孤獨的，卻也因此更能看清方向。",
    reaction: 1,
    createdDate: '2023-11-03'
  },
  {
    reviewId: 2,
    username: 'kittylover12',
    userId: 5,
    score: 5,
    likeCount: 8,
    content: "沙發邊的小被子還沒收，陽光剛好灑進來的午後，是我最喜歡的平靜時光。",
    reaction: 0,
    createdDate: '2025-01-19'
  },
];

function ReviewSection() {
  const { movieData, loading } = useContext(MovieContext)
  const [filteredReviews, setFilteredReviews] = useState([])
  const [myFilter, setMyFilter] = useState({
    sort: '最新影評', score: '全部評價'
  });
  const reviews = useMemo(() => {
    return testReviews()
    //return movieData.reviews
  }, [movieData])

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

  // const filteredReviews = useMemo(() => {
  //   const sorted = sortReviews(reviews);
  //   if (myFilter['評分'] == '所有評分') {
  //     return sorted;
  //   }
  //   const myScore = scoreMap[myFilter['評分']]
  //   return sorted.filter(r => r.score == myScore)
  // }, [myFilter])


  return (
    <>
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
      {
        filteredReviews.map((review) => (
          <Row className='justify-content-center' key={review.reviewId}>
            <Card className='ps-3 pe-3 pt-2 pb-2 mt-2'>
              <ReviewProvider value={{ review }}>
                <Review />
              </ReviewProvider>
            </Card>
          </Row>
        ))
      }
    </>
  )
}
export default ReviewSection