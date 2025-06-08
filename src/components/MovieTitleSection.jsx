import { useState, useContext, useEffect } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import { putWatchlist } from "../services/MovieService.jsx";

function MovieTitleSection() {
  const { user } = useContext(UserContext)
  const { movieData, loading, link } = useContext(MovieContext)
  const [mark, setMark] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const navigate = useNavigate()
  if (loading) return <LoadingSpinner />

  const movieId = movieData.movieId
  const title = movieData.title
  const bookmark = movieData.collected

  useEffect(() => {
    setMark(bookmark)
  }, [])

  async function handleMarkClick() {
    if (!user) {
      alert('請先登入')
      return
    }
    try {
      const res = await putWatchlist(movieId)
      if (res) {
        setMark(!mark)
        setIsBouncing(true); // 動畫效果
        setTimeout(() => {
          setIsBouncing(false);
        }, 150);
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className='d-flex justify-content-between align-items-center mb-2'>
      <h4
        className={`movie-card-title mb-1 mt-1 ${link ? 'navigate-link' : ''}`}
        onClick={link ? () => navigate(`/movie/${movieId}`) : undefined}
      >{title}</h4>
      <div onClick={handleMarkClick} className={`me-2 mb-0 ${isBouncing ? 'bounce' : ''}`}>{mark ?
        (<span className="filled-icon bookmark-icon">bookmark</span>) :
        (<span className="outlined-icon bookmark-icon">bookmark</span>)
      }</div>
    </div>
  )
}
export default MovieTitleSection