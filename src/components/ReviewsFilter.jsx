import { useState, useContext } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { ReviewsFilterContext } from '../pages/Reviews'

function ReviewsFilter() {
  const [reviewsFilter, setReviewsFilter] = useContext(ReviewsFilterContext)
  const sortOptions = { '最新影評': 'all', '熱門影評': 'popular' }
  const scoreOptions = { '全部評價': 'all', '超讚': 5, '好看': 4, '普普': 3, '難看': 2, '爛透': 1 }

  function handleFilterChange(e) {
    setReviewsFilter(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Row>
        <Col>
          <Form.Select className='mb-2'
            name='sort'
            value={reviewsFilter.sort}
            onChange={handleFilterChange}        >
            {Object.entries(sortOptions).map(([category, value]) => (
              <option key={value} value={value}>
                {category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select className='mb-2'
            name='score'
            value={reviewsFilter.score}
            onChange={handleFilterChange} >
            {Object.entries(scoreOptions).map(([category, value]) => (
              <option key={value} value={value}>
                {category}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>


    </>
  )
}
export default ReviewsFilter