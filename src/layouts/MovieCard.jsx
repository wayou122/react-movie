import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ScoreSection from "../components/ScoreSection";
import MovieTitleSection from "../components/MovieTtileSection";
import { MovieContext } from '../contexts/MovieContext'
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function MovieCard() {
  const { movieData, loading } = useContext(MovieContext)
  const navigate = useNavigate()
  if (loading) return <LoadingSpinner />

  const title = movieData.title
  const id = movieData.movieId
  const director = movieData.director
  const actor = movieData.actor
  const releaseDate = movieData.releaseDate.slice(0, 4)
  const genre = movieData.genre
  const length = movieData.length + '分'
  const posterUrl = movieData.posterUr || `https://dummyimage.com/140x210/234/fff&text=${title}`
  const actorShow = actor.length >= 25 ? actor.slice(0, actor.indexOf(',', 22)) : actor;

  // const title = '一家子兒咕咕叫'
  // const director = '魏德聖'
  // const actor = '李安平, 游採安, 朱裕鈞, 王彩英, 陳淑貞, 張志華, 黃芳宜'
  // const releaseDate = '2025/02/19'
  // const genere = '劇情片'
  // const length = '120 分鐘'
  // const imgUrl = 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354'
  //const score = '85%'
  //const reviewCount = 27

  return (
    <>
      <div className="overflow-hidden">
        <Row>
          <Col xs={4} sm={3} className="p-0 navigate-link"
            onClick={() => navigate(`/movie/${id}`)}>
            <img src={posterUrl} className="movie-poster" />
          </Col>

          <Col xs={8} sm={9} className="ps-1">
            <div className="ps-2 py-2 me-1">
              <MovieTitleSection />
              <div className="movie-card-description mb-1 gap-0">
                <p className='genre'>
                  <span>{releaseDate}．</span>
                  <span>{genre}．</span>
                  <span>{length}</span>
                </p>
                <p className='director'>導演 / {director}</p>
                <p className='actor'>演員 / {actorShow}</p>
              </div>
              <div className='navigate-link'
                onClick={() => navigate(`/movie/${id}`)}>
                <ScoreSection />
              </div>
            </div>
          </Col>
        </Row>
      </div>

    </>
  )

}
export default MovieCard