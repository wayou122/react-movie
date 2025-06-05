import { useContext } from "react"
import { MovieContext } from '../contexts/MovieContext'
import LoadingSpinner from "../components/LoadingSpinner"

function MovieBanner() {
  const { movieData, loading } = useContext(MovieContext)
  if (loading) return <LoadingSpinner />

  const bannerUrl = movieData.bannerUrl

  if (!bannerUrl) return

  return (
    <div >
      <img src={bannerUrl} className='movie-banner' />
    </div>
  )
}
export default MovieBanner