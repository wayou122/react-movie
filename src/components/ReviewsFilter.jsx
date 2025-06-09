import { useState, useContext } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { ReviewsFilterContext } from '../pages/Reviews'

function ReviewsFilter() {
  const { sort, score, setFilter } = useContext(ReviewsFilterContext)
  const sortOptions = { '最新影評': 'all', '熱門影評': 'popular' }
  const scoreOptions = { '全部評價': 'all', '超讚😍': 5, '好看🙂': 4, '普普😶': 3, '難看☹️': 2, '爛透💩': 1 }

  return (
    <>
      <Row>
        <Col>
          <Form.Select className='mb-2'
            name='sort'
            value={sort}
            onChange={(e) => { setFilter({ sort: e.target.value }) }}        >
            {Object.entries(sortOptions).map(([category, value]) => (
              <option key={value} value={value}>
                {category}</option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select className='mb-2'
            name='score'
            value={score}
            onChange={(e) => { setFilter({ score: e.target.value }) }} >
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