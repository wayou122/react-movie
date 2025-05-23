import { useState } from 'react';
import { Form, Col, Row, Image, Button, FloatingLabel } from 'react-bootstrap'
import Menu from '../layouts/Menu';
import { validateEmailFormat, validatePasswordFormat } from '../utils/validate_function';

const authcodeUrl = 'http://localhost:8085/tiann/authcode'
function Register() {

  const [isLogin, setIsLogin] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  function validateEmail(email) {
    const isEmailOK = validateEmailFormat(email)
    setEmailValid(isEmailOK)
    return isEmailOK
  }

  function validatePassword(password) {
    const isPasswordOK = validatePasswordFormat(password)
    setPasswordValid(isPasswordOK)
    return isPasswordOK
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!emailValid || !passwordValid) {
      alert("請確認欄位資料");
      return;
    }

  };

  return (
    <div>
      <Menu></Menu>
      <div className="col-10 col-sm-6 col-lg-4 mx-auto mt-5">
        <h3 >註冊帳號</h3>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>帳號</Form.Label>
            <Form.Control type="email"
              placeholder="輸入email"
              onChange={(e) => validateEmail(e.target.value)}
              isInvalid={!emailValid}
              required />
            <Form.Control.Feedback type="invalid">
              請輸入正確email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>密碼</Form.Label>
            <Form.Control type="password"
              placeholder="輸入密碼"
              onChange={(e) => validatePassword(e.target.value)}
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
                <Form.Control type="text" placeholder="輸入驗證碼" required />
              </Col>
              <Col xs={4} className="d-flex align-items-center px-0">
                <Image src={authcodeUrl} />
              </Col>
            </Row>
          </Form.Group>

          <Button variant="primary" type="submit" >
            註冊帳號
          </Button>
        </Form>
      </div>
    </div>
  )
}
export default Register