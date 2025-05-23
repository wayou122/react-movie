import { useState, useRef } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function MyReview() {
  const title = '海角七號'
  const [displayText, setDisplayText] = useState('')
  const [selectedValue, setSelectedValue] = useState('');
  const isLogin = true;

  const rateOptions = [
    { value: '5', label: 'sentiment_excited', text: '超讚', emoji: '😊' },
    { value: '4', label: 'sentiment_satisfied', text: '好看', emoji: '🙂' },
    { value: '3', label: 'sentiment_neutral', text: '普普', emoji: '😐' },
    { value: '2', label: 'sentiment_dissatisfied', text: '難看', emoji: '☹️' },
    { value: '1', label: 'sentiment_frustrated', text: '爛透', emoji: '😠' },
  ];

  const handleRateChange = (e) => {
    const newValue = e.target.value
    setSelectedValue(newValue)
    const selectedOption = rateOptions.find(option => option.value === newValue);
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
          <p className="mb-2">我覺得{title}...<span className='rate-text'>{displayText}</span></p>
        </div>
        <div className="d-flex justify-content-start gap-3 mb-1">

          <Form className='w-100 mx-0'>

            <div className="review-rate d-flex justify-content-center gap-1">
              {rateOptions.map((option) => (
                <div key={option.value}>
                  <input type="radio" name="rate"
                    value={option.value} id={option.value}
                    checked={selectedValue === option.value}
                    onChange={handleRateChange}
                  />
                  <label for={option.value}>
                    <span className="outlined-icon me-2">{option.label}</span>
                  </label>
                </div>
              ))}
            </div>

            {isLogin ? (
              <div>
                <Form.Control as="textarea" placeholder='我的評論...'
                  rows={3} size="sm"
                  value={textareaValue}
                  ref={textareaRef}
                  onChange={autoGrow} />
              </div>) : ''
            }
            <Row>
              <Col className='mx-auto'>
                <Button variant="secondary" type='submit' className='d-flex mx-auto mt-2'>
                  送出評論
                </Button>
              </Col>
            </Row>
          </Form>

        </div>
      </div>
    </>
  )

}
export default MyReview