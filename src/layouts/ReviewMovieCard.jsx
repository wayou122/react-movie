import { useContext, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import Review from "./Review";
import { ReviewContext } from "../contexts/ReviewContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function ReviewMovieCard() {
  const { review, loading } = useContext(ReviewContext)
  const navigate = useNavigate()
  if (loading) return <LoadingSpinner />

  const movieId = review.movieId
  const title = review.title

  //若是預設圖則修改為含電影名稱的圖片
  let posterUrl = review.posterUrl
  if (posterUrl == 'https://taiwancinema.bamid.gov.tw/Images/film/film_1.jpg?v=202505281353288331007')
    posterUrl = review.posterUrl = `https://dummyimage.com/140x210/234/fff&text=${title}`

  return (
    <>
      <Card className="review-movie-card">
        <Row className='g-1'>
          <Col xs={3} sm={3} className="p-2">
            <Card.Img src={posterUrl} className="object-fit-cover navigate-link"
              onClick={() => navigate(`/movie/${movieId}`)} />
          </Col>
          <Col xs={9} sm={9} className="p-2 pt-1">
            <Review />
          </Col>
        </Row>
      </Card>

    </>
  )
}

export default ReviewMovieCard;