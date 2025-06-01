import { useState, useContext } from "react"
import { Row, Col, Form } from 'react-bootstrap'
import { MoviesFilterContext } from "../pages/Movies"

function MoviesFilter() {
  const sortOptions = ['最新上映', '評價最高', '評價最低', '最多評論']
  const typeOptions = ['全部類型', '劇情片', '紀錄片', '動畫片', '短片', '其他']
  const [moviesFilter, setMoviesFilter] = useContext(MoviesFilterContext)

  function handleChange(e) {
    const { name, value } = e.target
    setMoviesFilter(prev => ({
      ...prev, [name]: value
    }))
  }

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
          <Form.Select name='type' className='mb-3'
            onChange={handleChange}>
            {typeOptions.map(o =>
              <option key={o}>{o}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
    </>
  )
}
export default MoviesFilter