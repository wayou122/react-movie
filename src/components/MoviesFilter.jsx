import { useContext } from "react"
import { Row, Col, Form } from 'react-bootstrap'
import { MoviesFilterContext } from "../pages/Movies"

function MoviesFilter() {
  const { sort, type, setFilter } = useContext(MoviesFilterContext)

  const sortOptions = { '評價最高': 'score_desc', '評價最低': 'score_asc', '最多評論': 'reviewCount_desc', '最新上映': 'releaseDate_desc' }
  const typeOptions = { '全部類型': 'all', '劇情片': 'drama', '紀錄片': 'documentary', '動畫': 'animation', '短片': 'short', '其他類型': 'other' }

  return (
    <>
      <Row>
        <Col>
          <Form.Select className='mb-3'
            name='sort'
            onChange={(e) => { setFilter({ sort: e.target.value }) }}
            value={sort}>
            {Object.entries(sortOptions).map(([key, value]) =>
              <option key={value} value={value}>{key}</option>
            )}
          </Form.Select>
        </Col>
        <Col>
          <Form.Select className='mb-3'
            name='type'
            onChange={(e) => { setFilter({ type: e.target.value }) }}
            value={type}>
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