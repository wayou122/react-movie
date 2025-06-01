import { useContext, useState } from 'react'
import { MovieContext } from '../contexts/MovieContext';
import LoadingSpinner from '../components/LoadingSpinner';

function MovieSummary() {
  const { movieData, loading } = useContext(MovieContext)
  const [showMore, setShowMore] = useState(false);
  if (loading) return <LoadingSpinner />

  const content = movieData.content
  const splitContent = content.split('\n').map((str, k) => <p key={k}>{str}</p>)
  const contentLess = splitContent.length > 2 ? false : true;

  return (
    <>
      <div className='movie-summary'>
        {showMore ? splitContent : splitContent.filter((_, i) => i < 1)}
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