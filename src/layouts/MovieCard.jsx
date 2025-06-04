import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ScoreSection from "../components/ScoreSection";
import MovieTitleSection from "../components/MovieTitleSection";
import { MovieContext } from '../contexts/MovieContext'
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function MovieCard() {
  const { movieData, loading, link } = useContext(MovieContext)
  const navigate = useNavigate()
  if (loading) return <LoadingSpinner />

  const title = movieData.title
  const id = movieData.movieId
  const director = movieData.director
  const actor = movieData.actor
  const releaseDate = movieData.releaseDate && movieData.releaseDate.slice(0, 4) || ''
  const type = movieData.type
  const length = movieData.length ? movieData.length + '分' : ''
  const posterUrl = 'https://taiwancinema.bamid.gov.tw' + movieData.posterUrl || `https://dummyimage.com/140x210/234/fff&text=${title}`
  const actorShow = actor && actor.length >= 28 ? actor.slice(0, actor.indexOf('、', 24)) : actor || '';

  return (
    <>
      <div className="overflow-hidden movie-card">
        <Row>
          <Col xs={4} xl={3}
            className={`p-0 ${link ? 'navigate-link' : ''}`}
            onClick={link ? () => navigate(`/movie/${id}`) : undefined}>
            <img src={posterUrl} className="movie-poster" />
          </Col>

          <Col xs={8} xl={9} className="p-3">
            <MovieTitleSection />
            <div className="movie-card-description mb-1 pe-3 gap-0">
              <p className='genre'>
                <span>{releaseDate}．</span>
                <span>{type}．</span>
                <span>{length}</span>
              </p>
              <p className='director'>導演 / {director}</p>
              <p className='actor'>演員 / {actorShow}</p>
            </div>
            <div className='navigate-link'
              onClick={() => navigate(`/movie/${id}`)}>
              <ScoreSection />
            </div>
          </Col>
        </Row>
      </div>

    </>
  )

}
export default MovieCard