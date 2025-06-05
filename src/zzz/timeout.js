
// if(e.target.name != 'username') return
// if (debounceTimer.current) {
//   clearTimeout(debounceTimer.current);
// }

// // 設定新的 debounce timer
// debounceTimer.current = setTimeout(() => {
//   validateName(e.target.value);
// }, 500); // 500ms debounce

//debounce
const debounceTimer = useRef(null);

function handleChange(e) {
  //e.preventDefault()
  setInputValue(e.target.value)
  if (debounceTimer.current) {
    clearTimeout(debounceTimer.current);
  }
  debounceTimer.current = setTimeout(() => {
    setMoviesFilter(prev => ({
      ...prev, keyword: e.target.value
    }))
  }, 700);
}