import { MovieContext } from "../contexts/MovieContext"
import { useContext } from "react"
import LoadingSpinner from "../components/LoadingSpinner";

function ScoreSection() {
  const { movieData, loading } = useContext(MovieContext)
  if (loading) return <LoadingSpinner />
  const score = movieData.scoreAvg || 0
  const reviewCount = movieData.reviewCount

  return (
    <div className="d-flex align-items-center">
      <span className="filled-icon me-2 stockpot-icon">stockpot</span>
      <span className="stockpo-text me-2">{score.toFixed(1)}</span>
      <span className='comment-text'>{'( ' + reviewCount + ' )'}</span>
    </div>
  )
}
export default ScoreSection