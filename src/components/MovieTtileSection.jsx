import { useState } from "react";
function MovieTitleSection(props) {

  const [mark, setMark] = useState(props.bookmark);
  const handleMarkClick = () => {
    setMark(!mark)
  }

  return (
    <div className='d-flex justify-content-between align-items-center mb-2'>
      <h4 className='movie-card-title mb-1 mt-1'>{props.title}</h4>
      <div onClick={handleMarkClick} className='me-2 mb-0'>{mark ?
        (<span className="filled-icon bookmark-icon">bookmark</span>) :
        (<span className="outlined-icon bookmark-icon">bookmark</span>)
      }</div>
    </div>
  )
}
export default MovieTitleSection