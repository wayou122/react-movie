import { useState, useContext, useRef } from "react";
import { MoviesFilterContext } from "../pages/Movies";

function Searchbar() {
  const [moviesFilter, setMoviesFilter] = useContext(MoviesFilterContext)
  const [inputValue, setInputValue] = useState(moviesFilter.keyword || '')

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  function handleClick() {
    setMoviesFilter(prev => ({
      ...prev, keyword: inputValue
    }))
  }

  return (
    <>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">🔍</span>
        </div>
        <input type="text"
          className="form-control"
          placeholder="搜尋電影"
          aria-label="搜尋電影"
          value={inputValue}
          onChange={handleChange} />
        <button className="btn btn-primary"
          type="button" id="button-addon2"
          onClick={handleClick}>搜尋</button>

      </div>
    </>
  )
}
export default Searchbar