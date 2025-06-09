import { useState, useEffect, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Menu from '../layouts/Menu'
import { validateNameUnique, validateEmailFormat, validatePasswordFormat, validateNameFormat } from '../utils/validate_function';
import { UserContext } from '../contexts/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { postAccountInfo } from '../services/AccountService';

let oldUsername = ''

function Account() {
  const { user } = useContext(UserContext)
  const [nameValid, setNameValid] = useState(true)
  const [nameUnique, setNameUnique] = useState(true)
  const [emailValid, setEmailValid] = useState(true);
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (user) {
      oldUsername = user.username
      setFormData({
        username: user.username,
        email: user.email,
      })
    }
  }, [user])

  // if (!user) {
  //   return <LoadingSpinner />
  // }
  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  //上傳圖片
  function handleFileSelect(e) {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!nameValid || !nameUnique) {
      alert('請確認填寫資料');
    } else {
      try {
        const fd = new FormData()
        fd.append('username', formData.username)
        fd.append('image', formData.image)
        await postAccountInfo(fd)
        window.location.reload()
      } catch (error) {
        setErrorMessage(error.message)
      }
    }
  };

  if (!user) {
    return (
      <>
        <Menu></Menu>
        <div className="text-center mt-5">
          <p>請先登入再修改使用者資訊</p>
        </div>
      </>)
  }

  return (
    <>
      <Menu></Menu>
      <div className="col-10 col-sm-6 col-lg-4 mx-auto mt-5">

        <h2 className='h2-title d-flex justify-content-center align-items-center gap-3'>
          <img className='account-page-img' src={`http://localhost:8085/${user.imagePath}`} />
          <div>帳號設定</div>
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
          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>帳號圖片</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </Form.Group>

          <Button variant="primary" type="submit"
            disabled={!nameValid || !nameUnique}>
            修改資料
          </Button>
        </Form>

      </div>
    </>
  )
}
export default Account