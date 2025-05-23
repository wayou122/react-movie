import { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

function MovieCard() {
  const title = '一家子兒咕咕叫'
  const director = '魏德聖'
  const actor = '李安平, 游採安, 朱裕鈞, 王彩英, 陳淑貞, 張志華, 黃芳宜'
  const releaseDate = '2025/02/19'
  const genere = '劇情片'
  const length = '120 分'
  const imgUrl = 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93000/t_93000.jpg?v=202505061124047318532'

  const score = '85%'
  const reviewCount = 27

  const actorShow = actor.length >= 25 ? actor.slice(0, actor.indexOf(',', 22)) : actor;

  return (
    <>
      <Card style={{ maxWidth: "660px" }} border='none' className="overflow-hidden review-movie-card">
        <Row>
          <Col xs={4} sm={3} className="p-0 ">
            <Card.Img src={imgUrl} className="object-fit-cover" />
          </Col>

          <Col xs={8} sm={9} className="ps-1">
            <Card.Body>
              <Card.Title className='mb-3'>{title}</Card.Title>
              <div className="movie-card-description mb-3">
                <div className="d-flex justify-content-start">
                  <div>{releaseDate.slice(0, 4)}．</div>
                  <div>{genere}．</div>
                  <div>{length}</div>
                </div>
                <div>導演&nbsp;&nbsp;{director}</div>
                <div>演員&nbsp;&nbsp;{actorShow}</div>
              </div>

              <div className="d-flex justify-content-start mb-2">
                <div className="d-flex align-items-center me-3">
                  <span className="material-symbols-outlined me-2 icon-stockpot">stockpot</span>
                  <span className="text-stockpot">{score}</span>
                </div>
                <div className="d-flex align-items-center me-3">
                  <span className="material-symbols-outlined me-2 icon-comment">comment</span>
                  <span className="text-comment">{reviewCount}</span>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>

    </>
  )


}
export default MovieCard