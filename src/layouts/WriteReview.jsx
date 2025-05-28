import { useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { scoreOptions } from '../utils/scoreOptions'
import { loginAPI } from '../api/api'
import MovieContext from '../pages/Movie'

function WriteReview() {
  const movieData = useContext(MovieContext)
  const title = movieData.title
  //const title = '海角七號'
  const [displayText, setDisplayText] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
  const isLogin = false;

  const handleScoreChange = (e) => {
    const newValue = e.target.value
    setSelectedValue(newValue)
    const selectedOption = scoreOptions.find(option => option.value === newValue);
    if (selectedOption) {
      setDisplayText(selectedOption.text);
    } else {
      setDisplayText('');
    }
  }

  const [textareaValue, setTextareaValue] = useState('');
  const textareaRef = useRef(null);

  const autoGrow = (e) => {
    setTextareaValue(e.target.value);
    const textarea = textareaRef.current
    textarea.style.height = 'auto'; // 重設高度
    textarea.style.height = textarea.scrollHeight + 5 + 'px'; // 設為內容高度
  }

  return (
    <>
      <div>

        <div className="d-flex justify-content-center">
          <p className="mb-2">我覺得「{title}」 <span className='score-text'>{displayText}</span></p>
        </div>
        <div className="d-flex justify-content-start gap-3 mb-1">

          <Form className='w-100 mx-0'>

            <div className="review-score d-flex justify-content-center gap-1">
              {scoreOptions.map((option) => (
                <div key={option.value}>
                  <input type="radio" name="score"
                    value={option.value} id={option.value}
                    checked={selectedValue === option.value}
                    onChange={handleScoreChange}
                  />
                  <label for={option.value}>
                    <span className="me-2">{option.emoji}</span>
                  </label>
                  {/* <label for={option.value}>
                    <span className="outlined-icon me-2"
                    style={{filter: "grayscale(80%)"}}>{option.emoji}</span>
                  </label> */}
                </div>
              ))}
            </div>

            {isLogin ? (
              <div>
                <div>
                  <Form.Control as="textarea" placeholder='我的評論...'
                    rows={3} size="sm"
                    value={textareaValue}
                    ref={textareaRef}
                    onChange={autoGrow} />
                </div>
                <div className='mx-auto'>
                  <Button variant="secondary" type='submit' className='d-flex mx-auto mt-2'>
                    送出評論
                  </Button>
                </div>
              </div>
            ) : (
              <div className='mx-auto'>
                <Button variant="secondary" className='d-flex mx-auto mt-2'
                  onClick={() => { location.href = loginAPI }}>
                  請先登入再送出評論
                </Button>
              </div>

            )}
          </Form>

        </div>
      </div>
    </>
  )

}
export default WriteReview