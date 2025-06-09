import { useState, useRef, useContext, useEffect } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { scoreOptions } from '../utils/scoreOptions'
import { UserContext } from '../contexts/UserContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { Link } from 'react-router-dom';
import { postAddReview, putUpdateReview } from '../services/ReviewService'
import { MovieContext } from '../contexts/MovieContext'

function WriteReview(props) {
  const { user } = useContext(UserContext)
  const { movieData, loading } = useContext(MovieContext)
  const [displayText, setDisplayText] = useState('')
  const [selectedValue, setSelectedValue] = useState();
  const [textareaValue, setTextareaValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const textareaRef = useRef(null); //綁定底下 ref={textareaRef}
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    setTextareaValue(props.content)
    setSelectedValue(props.score)
    //狀態更新後執行
    setTimeout(() => {
      autoGrow()
    }, 0);
  }, [])

  if (loading) return <LoadingSpinner />

  const isLogin = user ? true : false;
  const isUpdating = props.updating
  const reviewId = props.reviewId
  const title = movieData.title || props.title
  const movieId = movieData.movieId || ''

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedValue) {
      setErrorMessage('請點擊表情給予評價')
      return
    } else if (!textareaValue) {
      setErrorMessage('請填寫評論')
    } else {
      if (isUpdating) {
        updateReviewSubmit()
      } else {
        addReviewSubmit()
      }
    }
  }

  async function addReviewSubmit() {
    try {
      await postAddReview(movieId, selectedValue, textareaValue)
      window.location.reload()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  async function updateReviewSubmit() {
    try {
      await putUpdateReview(reviewId, selectedValue, textareaValue)
      window.location.reload()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  function handleScoreChange(e) {
    const newValue = e.target.value
    setSelectedValue(newValue)
    setErrorMessage('')
    setIsBouncing(true);
    setTimeout(() => {
      setIsBouncing(false);
    }, 150);
    const selectedOption = scoreOptions[newValue];
    if (selectedOption) {
      setDisplayText(selectedOption.text);
    } else {
      setDisplayText('');
    }
  }

  function autoGrow(e) {
    setErrorMessage('')
    if (e) setTextareaValue(e.target.value);
    const textarea = textareaRef.current
    textarea.style.height = 'auto'; // 重設高度
    textarea.style.height = textarea.scrollHeight + 5 + 'px'; // 設為內容高度
  }

  return (
    <>
      <div>

        <div className="d-flex justify-content-center">
          <p className="mb-2">我覺得「{title}」
            <span className='score-text'>{displayText}</span>
          </p>
        </div>

        <div className="d-flex justify-content-start gap-3 mb-1">

          <Form onSubmit={handleSubmit} className='w-100 mx-0'>
            <div className="review-score d-flex justify-content-center gap-1">
              {Object.values(scoreOptions).map((option) => (
                <div key={option.value}>
                  <input type="radio" name="score"
                    value={option.value} id={option.value}
                    checked={selectedValue == option.value}
                    onChange={handleScoreChange}
                  />
                  <label htmlFor={option.value} className={`${selectedValue == option.value && isBouncing ? 'bounce' : ''}`}>
                    <span className="me-2">{option.emoji}</span>
                  </label>
                </div>
              ))}
            </div>
            {
              errorMessage ?
                <Alert variant='danger' className='mt-2 p-2 text-center'>
                  {errorMessage}
                </Alert>
                : ''
            }
            {isLogin ? (
              <div>
                <div>
                  <Form.Control as="textarea"
                    placeholder='我的評論...'
                    className='mt-2'
                    rows={3}
                    value={textareaValue}
                    ref={textareaRef}
                    onChange={autoGrow}
                    required />
                </div>
                <div className='mx-auto'>
                  <Button variant="primary" type='submit'
                    className='d-flex mx-auto mt-2'>
                    {isUpdating ? '修改評論' : '送出評論'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className='mx-auto'>
                <Button variant="secondary"
                  className='d-flex mx-auto mt-2 justify-content-center'
                  as={Link} to='/login'>
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