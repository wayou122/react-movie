import { useState } from "react";
import { MovieContext } from "../contexts/MovieContext";

function MovieTitleSection(props) {
  const movieData = useContext(MovieContext)
  const title = movieData.title
  const bookmark = movieData.bookmark
  const [mark, setMark] = useState(bookmark);
  const handleMarkClick = () => {
    setMark(!mark)
  }

  return (
    <div className='d-flex justify-content-between align-items-center mb-2'>
      <h4 className='movie-card-title mb-1 mt-1'>{title}</h4>
      <div onClick={handleMarkClick} className='me-2 mb-0'>{mark ?
        (<span className="filled-icon bookmark-icon">bookmark</span>) :
        (<span className="outlined-icon bookmark-icon">bookmark</span>)
      }</div>
    </div>
  )
}
export default MovieTitleSection