import { useEffect, useState } from 'react';
import { Form, Col, Row, Image, Button, Alert } from 'react-bootstrap'
import Menu from '../layouts/Menu';
import { validateNameUnique, validateNameFormat, validateEmailFormat, validatePasswordFormat, validateEmailUnique } from '../utils/validate_function';
import { authcodeAPI } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin, postRegister } from '../services/LoginRegisterService';
import Swal from 'sweetalert2';


function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [nameValid, setNameValid] = useState(true)
  const [nameUnique, setNameUnique] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [emailUnique, setEmailUnique] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    authcode: ''
  })
  const [authcodeURL, setAuthcoceURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchAuthcode()
  }, [])

  useEffect(() => {
    setNameValid(true)
    setNameUnique(true)
    setEmailValid(true)
    setEmailUnique(true)
    setPasswordValid(true)
    setErrorMessage('')
    setFormData({
      username: '',
      email: '',
      password: '',
      authcode: ''
    })
  }, [isLogin])

  // 驗證碼圖片
  function fetchAuthcode() {
    setAuthcoceURL(authcodeAPI(new Date().getTime()))
  }

  function handleChange(e) {
    setFormData(p => ({
      ...p, [e.target.name]: e.target.value
    }))
  }

  // 驗證帳號名稱
  async function validateName(name) {
    const isNameFormatOK = validateNameFormat(name)
    if (!isNameFormatOK) {
      setNameValid(false)
      return
    }
    setNameValid(true)
    try {
      const isNameUnique = await validateNameUnique(name)
      setNameUnique(isNameUnique)
    } catch (err) {
      setErrorMessage(err.message)
      setNameUnique(false)
    }
  }

  // 驗證帳號信箱
  async function validateEmail(email) {
    const isEmailOK = validateEmailFormat(email)
    if (!isEmailOK) {
      setEmailValid(false)
      return
    }
    setEmailValid(true)
    if (isLogin) return //登入模式不必驗證信箱
    try {
      const isEmailUnique = await validateEmailUnique(email)
      setEmailUnique(isEmailUnique)
    } catch (err) {
      setErrorMessage(err.message)
      setEmailUnique(false)
    }
  }

  // 驗證密碼格式
  function validatePassword(password) {
    const isPasswordOK = validatePasswordFormat(password)
    setPasswordValid(isPasswordOK)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // 登入請求
    if (isLogin) {
      if (!emailValid || !passwordValid) {
        setErrorMessage('請確認填寫資料')
      } else {
        loginSubmit()
      }
    }
    // 註冊請求
    else {
      if (!nameValid || !nameUnique || !emailValid || !emailUnique || !passwordValid) {
        setErrorMessage('請確認填寫資料')
      } else {
        registerSubmit()
      }
    }
  };

  // 登入請求
  async function loginSubmit() {
    try {
      await postLogin(formData)
      navigate('/')
      window.location.reload()
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  // 註冊請求
  async function registerSubmit() {
    try {
      await postRegister(formData)
      Swal.fire({
        title: "註冊成功，請登入帳號",
        icon: "success",
        confirmButtonText: '確定'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload()
        }
      })
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  return (
    <>
      <Menu />
      <div className="col-10 col-sm-6 col-lg-4 mx-auto mt-5">
        <h2 className='h2-title'>
          <button onClick={() => setIsLogin(true)}
            className={`login-or-register-btn me-1 ${isLogin ? 'select' : ''}`}>
            登入
          </button>
          <button onClick={() => setIsLogin(false)}
            className={`login-or-register-btn ms-1 ${isLogin ? '' : 'select'}`}>
            註冊
          </button>
        </h2>

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
              isInvalid={!emailValid || !emailUnique}
              required />
            <Form.Control.Feedback type="invalid">
              {
                !emailValid ? '請輸入正確email' : '此 email 已被註冊'
              }
            </Form.Control.Feedback>
          </Form.Group>

          {isLogin ? '' : (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>帳號名稱</Form.Label>
              <Form.Control type="text"
                name='username'
                placeholder="輸入帳號名稱"
                value={formData.username}
                onChange={(e) => { handleChange(e) }}
                onBlur={(e) => { handleChange(e); validateName(e.target.value) }}
                // 離開輸入框才啟動驗證
                isInvalid={!nameValid || !nameUnique}
                required />
              <Form.Control.Feedback type="invalid">
                {
                  !nameValid ? '名稱長度須為5~15字，請用英數字-_或台語羅馬字' :
                    '帳號名稱已被使用'
                }
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>密碼</Form.Label>
            <Form.Control type="password"
              name='password'
              placeholder="輸入密碼"
              value={formData.password}
              onChange={(e) => { handleChange(e); validatePassword(e.target.value) }}
              isInvalid={!passwordValid}
              required />
            <Form.Control.Feedback type="invalid">
              密碼長度6~20位，需包含數字與英文字
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
            disabled={!nameValid || !nameUnique || !passwordValid || !emailValid || !emailUnique} >
            {isLogin ? '登入帳號' : '註冊帳號'}
          </Button>
        </Form>

        <div className='d-flex mt-3'>
          <Link to='/forget-password'
            className=" small link-offset-2 link-underline link-underline-opacity-50">
            忘記密碼?</Link>
        </div>

      </div>
    </>
  )
}
export default Login