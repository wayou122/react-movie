import { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import Menu from '../layouts/Menu'
import { validateNameUnique, validateEmailFormat, validatePasswordFormat, validateNameFormat } from '../utils/validate_function';
import { accountAPI, updateUsernameAPI } from '../api/api';
import { UserContext } from '../contexts/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';

let oldUsername = ''

function Account() {
  const { user } = useContext(UserContext)
  const [nameValid, setNameValid] = useState(true)
  const [nameUnique, setNameUnique] = useState(true)
  const [emailValid, setEmailValid] = useState(true);
  const [formData, setFormData] = useState({
    email: '', username: ''
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      })
      oldUsername = user.username
    }
  }, [user])

  if (!user) {
    return <LoadingSpinner />
  }

  function handleChange(e) {
    setFormData(p => ({
      ...p,
      [e.target.name]: e.target.value,
    }))
  }

  async function validateName(name) {
    const isNameFormatOK = validateNameFormat(name)
    if (!isNameFormatOK) {
      setNameValid(false)
      return
    }
    setNameValid(true)
    const isNameUniqueOK = await validateNameUnique(name, oldUsername)
    setNameUnique(isNameUniqueOK)
  }

  function validateEmail(email) {
    const isEmailOK = validateEmailFormat(email);
    setEmailValid(isEmailOK);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameValid || !nameUnique) {
      alert('請確認填寫資料');
    } else {
      updateAccountSubmit()
    }
  };

  async function updateAccountSubmit() {
    try {
      const res = await fetch(updateUsernameAPI, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'username': formData.username })
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        alert('修改成功')
      } else {
        alert('修改失敗: ' + resData.message)
      }
    } catch (err) {
      alert('修改錯誤: ' + err.message)
    }
    window.location.reload()
  }

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
              defaultValue={formData.email}
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
              name='username'
              defaultValue={formData.username}
              placeholder="輸入帳號名稱"
              onChange={(e) => { handleChange(e) }}
              onBlur={(e) => { handleChange(e); validateName(e.target.value) }}
              isInvalid={!nameValid || !nameUnique}
            />
            <Form.Control.Feedback type="invalid">
              {
                !nameValid ? '名稱長度須為5~20字，請用英數字-_或台語羅馬字' :
                  '帳號名稱已被使用'
              }
            </Form.Control.Feedback>
          </Form.Group>

          {/* <Form.Group className="mb-3" controlId="formBasicPassword">
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
          </Form.Group> */}

          <Button variant="primary" type="submit"
            disabled={!nameValid || !nameUnique || formData.username == oldUsername}>
            修改資料
          </Button>
        </Form>

      </div>
    </>
  )
}
export default Account