import { useContext, useState } from 'react'
import { MovieContext } from '../contexts/MovieContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

function MovieSummary() {
  const { movieData, loading } = useContext(MovieContext)
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate()

  if (loading) return <LoadingSpinner />

  const id = movieData.movieId
  const content = movieData.summary
  const splitContent = content.split('\n').map((str, k) => <p key={k}>{str}</p>)
  const contentLess = splitContent.length > 2 ? false : true;

  return (
    <>
      <button className="btn btn-sm btn-outline-danger mt-4"
        onClick={() => window.open(`https://www.youtube.com/results?search_query=電影+${movieData.title}`)}>
        YouTube 搜尋
      </button>
      <button className="btn btn-sm btn-outline-success mt-4 ms-2"
        onClick={() => navigate(`/map/${id}`)}>
        取景地圖
      </button>
      <div className='movie-summary mt-1 p-2'>
        {showMore ? splitContent : splitContent.filter((_, i) => i < 2)}
        {contentLess ? '' :
          <span><button
            className="p-0 ms-0 show-more-btn"
            onClick={() => setShowMore(!showMore)}>
            {showMore ? "顯示較少" : "...顯示更多"}
          </button></span>}
      </div>
    </>
  )
}
export default MovieSummary