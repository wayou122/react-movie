import { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import Menu from "../layouts/Menu";
import RankingReviewerList from "../layouts/RankingReviewList"

function RankingReviewer() {
  const rankingData = [
    { id: 1, name: 'Alice', image: 'C:\Users\NTPU\Pictures\Screenshots\螢幕擷取畫面 (9).png', length: 5 },
    { id: 2, name: 'Bob', image: 'https://fakeimg.pl/100x100', length: 8 },
    { id: 3, name: 'Charlie', image: 'https://fakeimg.pl/100x100', length: 50 },
  ];
  return (
    <>
      <Menu />
      <Container>
        <h2 className='h2-title'>焦點影評人</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <RankingReviewerList data={rankingData} />
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default RankingReviewer