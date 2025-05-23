import { useState } from "react"
import { Row, Col, Card, Container } from 'react-bootstrap'
import Menu from "../layouts/Menu"
import MovieCard from "../layouts/MovieCard"
import WriteReview from "../layouts/WriteReview"
import ReviewSection from "../layouts/ReviewSection"
import MovieSummary from "../layouts/MovieSummary"
import MovieBanner from "../layouts/MovieBanner"

function Movie() {
  return (
    <>
      <Menu />
      <Container>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <MovieBanner />
            <MovieCard />
            <MovieSummary />
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <WriteReview></WriteReview>
          </Col>
        </Row>
        <ReviewSection />
      </Container>
    </>
  )
}
export default Movie