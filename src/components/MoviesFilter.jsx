import { useState } from "react"
import { Row, Col, Form } from 'react-bootstrap'

function MoviesFilter() {
  const options = ['劇情片', '紀錄片', '動畫片']
  return (
    <>
      <Row>
        <Col>
          <Form.Select className='mb-3'>
            <option>最新上映</option>
            <option>熱門電影</option>
            <hr></hr>
            <option>評價最高</option>
            <option>評價最低</option>
            <option>最多評論</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Select className='mb-3'>
            {options.map(o =>
              <option>{o}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
    </>
  )
}
export default MoviesFilter