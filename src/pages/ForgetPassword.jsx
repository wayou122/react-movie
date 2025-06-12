import { useEffect, useState } from 'react';
import { validateEmailFormat } from "../utils/validate_function"
import { forgetPassword, } from "../services/LoginRegisterService"
import { Form, Button, Alert, Row, Col, Image } from 'react-bootstrap'
import { authcodeAPI } from '../api/api';
import Menu from "../layouts/Menu"
import Swal from 'sweetalert2';

function ForgetPassword() {
  const [emailValid, setEmailValid] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    authcode: ''
  })
  const [authcodeURL, setAuthcoceURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchAuthcode()
  }, [])

  // 驗證碼圖片
  function fetchAuthcode() {
    setAuthcoceURL(authcodeAPI(new Date().getTime()))
  }

  function handleChange(e) {
    setErrorMessage('')
    setFormData(p => ({
      ...p, [e.target.name]: e.target.value
    }))
  }

  // 驗證帳號信箱
  function validateEmail(email) {
    const isEmailOK = validateEmailFormat(email)
    if (isEmailOK) {
      setEmailValid(true)
    } else {
      setEmailValid(false)
    }
  }

  //提交表單
  async function handleSubmit(e) {
    e.preventDefault();
    if (!emailValid) {
      setErrorMessage('請確認填寫資料')
    } else {
      try {
        await forgetPassword(formData)
        setFormData({ email: '', authcode: '' })
        Swal.fire({
          title: "已發送連結，請從email連結重設密碼",
          icon: "success"
        })
      } catch (err) {
        setErrorMessage(err.message)
      }
    }
  }

  return (
    <>
      <Menu />
      <div className="col-10 col-sm-6 col-lg-4 mx-auto mt-5">
        <h2 className='h2-title'>忘記密碼</h2>
        {
          errorMessage ?
            <Alert variant='danger'>
              {errorMessage}
            </Alert>
            : ''
        }
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>帳號信箱</Form.Label>
            <Form.Control type="email"
              name='email'
              placeholder="輸入email"
              value={formData.email}
              onChange={(e) => { handleChange(e) }}
              onBlur={(e) => { handleChange(e); validateEmail(e.target.value) }}
              isInvalid={!emailValid}
              required />
            <Form.Control.Feedback type="invalid">
              請輸入正確email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAuthcode">
            <Form.Label>驗證碼</Form.Label>
            <Row>
              <Col xs={8}>
                <Form.Control type="text"
                  name='authcode'
                  value={formData.authcode}
                  onChange={handleChange}
                  placeholder="輸入驗證碼" required />
              </Col>
              <Col xs={4} className="d-flex align-items-center px-0">
                <Image src={authcodeURL || null} />
                <button onClick={fetchAuthcode} style={{ 'border': 'none' }}>⟳</button>
              </Col>
            </Row>
          </Form.Group>

          <Button variant="primary" type="submit"
            disabled={!emailValid} >
            發送重設密碼連結
          </Button>
        </Form>
      </div>
    </>
  )

}
export default ForgetPassword