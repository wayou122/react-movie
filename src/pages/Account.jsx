import { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Menu from '../layouts/Menu'
import { validateEmailFormat, validatePasswordFormat, validateNameFormat } from '../utils/validate_function';

function Account() {

  const email = 'jjj@gmail.com'
  const name = 'mary_113'

  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    newPassword: ''
  })

  function handleChange(e) {
    setFormData(p => ({
      ...p,
      [e.target.name]: e.target.value,
    }))
  }

  function validateName(name) {
    const isNameOK = validateNameFormat(name);
    setNameValid(isNameOK);
    return isNameOK;
  }

  function validateEmail(email) {
    const isEmailOK = validateEmailFormat(email);
    setEmailValid(isEmailOK);
    return isEmailOK;
  };

  function validatePassword(pwd) {
    const isPasswordOK = validatePasswordFormat(pwd);
    setPasswordValid(isPasswordOK);
    return isPasswordOK;
  };

  function validateNewPassword(pwd) {
    const isPasswordOK = validatePasswordFormat(pwd);
    setNewPasswordValid(isPasswordOK);
    return isPasswordOK;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameValid && passwordValid && newPasswordValid) {
      alert('修改成功！' + JSON.stringify(formData));
      // 提交資料處理（例如呼叫 API）
    }
  };
  return (
    <>
      <Menu></Menu>
      <div className="col-10 col-sm-6 col-lg-4 mx-auto mt-5">

        <h2 className='h2-title'>帳號設定</h2>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>帳號信箱</Form.Label>
            <Form.Control type="email"
              name='email'
              defaultValue={email}
              placeholder="輸入email"
              onChange={(e) => validateEmail(e.target.value)}
              isInvalid={!emailValid}
              disabled />
            <Form.Control.Feedback type="invalid">

            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>帳號名稱</Form.Label>
            <Form.Control type="text"
              name='name'
              defaultValue={name}
              placeholder="輸入帳號名稱"
              onChange={(e) => { handleChange(e); validateName(e.target.value) }}
              isInvalid={!nameValid}
            />
            <Form.Control.Feedback type="invalid">
              名稱長度須為5~20字，請用英數字.-_
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>目前密碼</Form.Label>
            <Form.Control type="password"
              name='password'
              placeholder="請輸入目前密碼"
              onChange={(e) => { handleChange(e); validatePassword(e.target.value) }}
              isInvalid={!passwordValid}
              required />
            <Form.Control.Feedback type="invalid">
              密碼長度8~20位，需包含數字與英文字
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>設定新密碼</Form.Label>
            <Form.Control type="password"
              name='newPassword'
              placeholder="輸入新密碼"
              onChange={(e) => { handleChange(e); validateNewPassword(e.target.value) }}
              isInvalid={!newPasswordValid}
              required />
            <Form.Control.Feedback type="invalid">
              密碼長度8~20位，需包含數字與英文字
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" >
            修改資料
          </Button>
        </Form>

      </div>
    </>
  )
}
export default Account