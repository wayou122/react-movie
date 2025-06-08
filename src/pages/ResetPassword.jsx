import { validatePasswordFormat } from "../utils/validate_function"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { postResetPassword } from "../services/LoginRegisterService"
import { Form, Button, Alert } from 'react-bootstrap'
import Menu from "../layouts/Menu"

function ResetPassword() {
  const navigate = useNavigate()
  const [passwordValid, setPasswordValid] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const token = searchParams.get('token') || ''

  const [formData, setFormData] = useState({
    email: email,
    token: token,
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e) {
    setFormData(p => ({
      ...p, [e.target.name]: e.target.value
    }))
  }
  // 驗證密碼格式
  function validatePassword(password) {
    const isPasswordOK = validatePasswordFormat(password)
    setPasswordValid(isPasswordOK)
  }

  //提交表單
  async function handleSubmit(e) {
    e.preventDefault();
    if (!passwordValid) {
      setErrorMessage('請確認填寫資料')
    } else {
      try {
        await postResetPassword(formData)
        alert('已重設密碼，請重新登入')
        navigate('/login')
      } catch (err) {
        setErrorMessage(err.message)
      }
    }
  }

  return (
    <>
      <Menu />
      <div className="col-10 col-sm-6 col-lg-4 mx-auto mt-5">
        <h2 className='h2-title'>重設密碼</h2>
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
              value={formData.email}
              disabled
              required />
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

          <Button variant="primary" type="submit"
            disabled={!passwordValid} >
            重設密碼
          </Button>
        </Form>
      </div>
    </>
  )

}
export default ResetPassword