import { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Review from "./Review";


function ReviewMovieCard() {

  const imgUrl = 'https://fakeimg.pl/300x450'

  return (
    <>
      <Card className="review-movie-card">
        <Row className='g-0'>
          <Col xs={5} sm={3} className="p-2">
            <Card.Img src={imgUrl} className="object-fit-cover" />
          </Col>
          <Col xs={7} sm={9} className="p-2 ps-1 pb-3">
            <Review />
          </Col>
        </Row>
      </Card>

    </>
  )
}

export default ReviewMovieCard;