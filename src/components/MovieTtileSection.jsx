import { useState, useContext } from "react";
import { MovieContext } from "../contexts/MovieContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router";
import { addToWatchlistAPI } from "../api/api.js";


function MovieTitleSection() {
  const { movieData, loading } = useContext(MovieContext)
  const navigate = useNavigate()
  if (loading) return <LoadingSpinner />

  const id = movieData.movieId
  const title = movieData.title
  const bookmark = movieData.bookmark
  const [mark, setMark] = useState(bookmark);

  async function handleMarkClick() {
    try {
      const res = await fetch(addToWatchlistAPI(id), {
        method: 'GET',
        credentials: 'include',
      })
      const resData = await res.json()
      if (res.ok && resData.code === 200) {
        console.log('修改成功')
        setMark(!mark)
      } else {
        console.error('修改失敗: ' + resData.message)
      }
    } catch (err) {
      console.error('修改錯誤: ' + err.message)
    }
  }

  return (
    <div className='d-flex justify-content-between align-items-center mb-2'>
      <h4 className='movie-card-title mb-1 mt-1 navigate-link'
        onClick={() => navigate(`/movie/${id}`)}
      >{title}</h4>
      <div onClick={handleMarkClick} className='me-2 mb-0'>{mark ?
        (<span className="filled-icon bookmark-icon">bookmark</span>) :
        (<span className="outlined-icon bookmark-icon">bookmark</span>)
      }</div>
    </div>
  )
}
export default MovieTitleSection