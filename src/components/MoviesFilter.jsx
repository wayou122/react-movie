import { useState, useContext } from "react"
import { Row, Col, Form } from 'react-bootstrap'
import { MoviesFilterContext } from "../pages/Movies"

function MoviesFilter() {
  const [moviesFilter, setMoviesFilter, setHasInteracted]
    = useContext(MoviesFilterContext)
  const sortOptions = { '評價最高': 'score_desc', '評價最低': 'score_asc', '最多評論': 'reviewCount_desc', '最新上映': 'releaseDate_desc' }
  const typeOptions = { '全部類型': 'all', '劇情片': 'drama', '紀錄片': 'documentary', '動畫': 'animation', '短片': 'short', '其他類型': 'other' }

  function handleChange(e) {
    const { name, value } = e.target
    setMoviesFilter(prev => ({
      ...prev, [name]: value
    }))
    setHasInteracted(true)
  }

  return (
    <>
      <Row>
        <Col>
          <Form.Select className='mb-3'
            name='sort'
            onChange={handleChange}
            value={moviesFilter.sort}>
            {Object.entries(sortOptions).map(([key, value]) =>
              <option key={value} value={value}>{key}</option>
            )}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select className='mb-3'
            name='type'
            onChange={handleChange}
            value={moviesFilter.type}>
            {Object.entries(typeOptions).map(([key, value]) =>
              <option key={value} value={value}>{key}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
    </>
  )
}
export default MoviesFilter