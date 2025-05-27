import { useEffect, useState } from 'react';
import { Form, Col, Row, Image, Button, Alert } from 'react-bootstrap'
import Menu from '../layouts/Menu';
import { validateNameUnique, validateNameFormat, validateEmailFormat, validatePasswordFormat } from '../utils/validate_function';
import { authcodeAPI, loginAPI, registerAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [nameValid, setNameValid] = useState(true)
  const [nameUnique, setNameUnique] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    authcode: ''
  })
  const [authcodeURL, setAuthcoceURL] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  //const debounceTimer = useRef(null); // 儲存 debounce timer

  function fetchAuthcode() {
    setAuthcoceURL(authcodeAPI(new Date().getTime()))
  }

  function handleChange(e) {
    setFormData(p => ({
      ...p, [e.target.name]: e.target.value
    }))

    // if(e.target.name != 'username') return
    // if (debounceTimer.current) {
    //   clearTimeout(debounceTimer.current);
    // }

    // // 設定新的 debounce timer
    // debounceTimer.current = setTimeout(() => {
    //   validateName(e.target.value);
    // }, 500); // 500ms debounce
  }

  async function validateName(name) {
    const isNameFormatOK = validateNameFormat(name)
    if (!isNameFormatOK) {
      setNameValid(false)
      return
    }
    setNameValid(true)
    const isNameUniqueOK = await validateNameUnique(name)
    setNameUnique(isNameUniqueOK)
  }

  function validateEmail(email) {
    const isEmailOK = validateEmailFormat(email)
    setEmailValid(isEmailOK)
  }

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
        alert('請確認填寫資料')
      } else {
        loginSubmit()
      }
    }
    // 註冊請求
    else {
      if (!nameValid || !nameUnique || !emailValid || !passwordValid) {
        setErrorMessage('請確認填寫資料')
        alert('請確認填寫資料')
      } else {
        registerSubmit()
      }
    }
  };

  async function loginSubmit() {
    try {
      const res = await fetch(loginAPI, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'email': formData.email, 'password': formData.password, 'authcode': formData.authcode })
      })
      const resData = await res.json()
      if (res.ok && resData.code === 200) {
        navigate("/")
        //window.location.reload()
      } else {
        setErrorMessage('登入失敗: ' + resData.message)
      }
    } catch (err) {
      alert('登入錯誤: ' + err.message)
    }
  }

  async function registerSubmit() {
    try {
      const res = await fetch(registerAPI, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'username': formData.username, 'email': formData.email, 'password': formData.password, 'authcode': formData.authcode })
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        navigate("/")
      } else {
        setErrorMessage('註冊失敗: ' + resData.message)
      }
    } catch (err) {
      alert('註冊錯誤: ' + err.message)
    }
  }

  useEffect(() => {
    setNameValid(true)
    setNameUnique(true)
    setEmailValid(true)
    setPasswordValid(true)
    setErrorMessage('')
    setFormData({
      username: '',
      email: '',
      password: '',
      authcode: ''
    })
  }, [isLogin])

  useEffect(() => {
    fetchAuthcode()
  }, [])

  return (
    <div>
      <Menu></Menu>
      <div className="col-10 col-sm-6 col-lg-4 mx-auto mt-5">
        <h2 className='h2-title'>
          <button onClick={() => setIsLogin(true)} className={`login-or-register-btn me-1 ${isLogin ? 'select' : ''}`}> 登入 </button>
          <button onClick={() => setIsLogin(false)} className={`login-or-register-btn ms-1 ${isLogin ? '' : 'select'}`}> 註冊 </button>
        </h2>

        {/* <p style={{ marginTop: 10 }}>
          {isLogin ? '還沒有帳號？' : '已經有帳號？'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} style={{ border: 'none', background: 'none', color: 'blue', cursor: 'pointer' }}>
            {isLogin ? '前往註冊' : '前往登入'}
          </button>
        </p> */}
        {
          errorMessage ?
            <Alert variant='danger'>
              {errorMessage}
            </Alert>
            : ''
        }

        <Form onSubmit={handleSubmit}>
          {isLogin ? '' : (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>帳號名稱</Form.Label>
              <Form.Control type="text"
                name='username'
                placeholder="輸入帳號名稱"
                value={formData.username}
                onChange={(e) => { handleChange(e) }}
                onBlur={(e) => { handleChange(e); validateName(e.target.value) }}
                isInvalid={!nameValid || !nameUnique}
                required />
              <Form.Control.Feedback type="invalid">
                {
                  !nameValid ? '名稱長度須為5~20字，請用英數字-_或台語羅馬字' :
                    '帳號名稱已被使用'
                }
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>帳號信箱</Form.Label>
            <Form.Control type="email"
              name='email'
              placeholder="輸入email"
              value={formData.email}
              onChange={(e) => { handleChange(e); validateEmail(e.target.value) }}
              isInvalid={!emailValid}
              required />
            <Form.Control.Feedback type="invalid">
              請輸入正確email
            </Form.Control.Feedback>
          </Form.Group>


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
              密碼長度8~20位，需包含數字與英文字
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
            disabled={!nameValid || !nameUnique || !passwordValid || !emailValid} >
            {isLogin ? '登入帳號' : '註冊帳號'}
          </Button>
        </Form>
      </div>
    </div>
  )
}
export default Login