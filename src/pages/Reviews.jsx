import { useState } from 'react'
import Menu from '../layouts/Menu'
import Filter from '../components/Filter'
import ReviewMovieCard from '../layouts/ReviewMovieCard'
import Searchbar from '../components/Searchbar'
import { Container, Row, Col } from 'react-bootstrap'

function Reviews() {
  const [myFilter, setMyFilter] = useState({
    '排序': '最新影評',
    '類型': '所有類型',
    '評分': '所有評分'
  });

  const filterGroups = {
    '排序': ['最新影評', '熱門影評'],
    '類型': ['所有類型', '劇情片', '紀錄片', '動畫片'],
    '評分': ['所有評分', '從高到低', '從低到高']
  }

  function handleFilterChange(e) {
    setMyFilter(f => ({
      ...f,
      [e.target.name]: e.target.value
    }))
    console.log(myFilter)
  }

  return (
    <>
      <Menu />
      <Container>
        <Searchbar />
        <h2 className='h2-title'>評論列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <Filter filterGroups={filterGroups}
              myFilter={myFilter}
              handleFilterChange={handleFilterChange}
            />
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <ReviewMovieCard />
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Reviews