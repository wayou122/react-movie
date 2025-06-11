import { useState, useContext, useEffect, useRef } from "react";
import { MoviesFilterContext } from "../pages/Movies";

function Searchbar() {
  const { keyword, setFilter } = useContext(MoviesFilterContext)

  const [inputValue, setInputValue] = useState(keyword || '')

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter')
      setFilter({ keyword: inputValue })
  }
  function handleClick() {
    setFilter({ keyword: inputValue })
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
          onChange={handleChange}
          onKeyDown={handleKeyDown} />
        <button className="btn btn-primary"
          type="button" id="button-addon2"
          onClick={handleClick}>搜尋</button>

      </div>
    </>
  )
}
export default Searchbar