import { useContext, useState } from "react";
import Menu from "../layouts/Menu";
import { UserContext } from "../contexts/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { Footer } from "../layouts/Footer";
import { useWatchlistData } from "../hooks/useWatchlistData";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MovieProvider } from "../contexts/MovieContext";
import MovieCard from "../layouts/MovieCard";

export function Watchlist() {
  const { user } = useContext(UserContext)
  const { watchlistData, loading } = useWatchlistData()

  if (!user)
    return (<>
      <Menu />
      <h2 className="h2-title">收藏電影</h2>
      <div className="text-center">請先登入再查看收藏清單</div>
    </>)

  if (loading) return <LoadingSpinner />

  return (
    <>
      <Menu />
      <Container>
        <h2 className="h2-title">收藏電影</h2>
        {loading && <LoadingSpinner />}

        {watchlistData.length > 0 ?
          watchlistData.map((movieData) => (
            <Row className='justify-content-center' key={movieData.movieId}>
              <Col xs={12} sm={9} lg={6}>
                <MovieProvider
                  value={{ movieData, loading, link: true }}>
                  <Card className="mb-1" >
                    <MovieCard />
                  </Card>
                </MovieProvider>
              </Col>
            </Row>
          )) : (
            <Row className='justify-content-center'>
              <Col xs={12} sm={9} lg={6}>
                <div className="text-center">目前沒有收藏電影 😔</div>
              </Col>
            </Row>
          )}
      </Container>
      <Footer />
    </>
  )
}