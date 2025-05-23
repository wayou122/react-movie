import { useState } from "react"
import Menu from "../layouts/Menu"
import Searchbar from "../components/Searchbar"
import MoviesFilter from '../components/MoviesFilter'
import MovieCard from "../layouts/MovieCard"
import { Container, Row, Col, Card } from 'react-bootstrap'


function Movies() {

  return (
    <>
      <Menu />
      <Container>
        <Searchbar />
        <h2 className="h2-title">電影列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <MoviesFilter />
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <Card>
              <MovieCard />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Movies