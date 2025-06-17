import { useState, useEffect, useContext, useRef } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Menu from '../layouts/Menu'
import { validateNameUnique, validateEmailFormat, validatePasswordFormat, validateNameFormat } from '../utils/validate_function';
import { UserContext } from '../contexts/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { postAccountInfo } from '../services/AccountService';
import Swal from 'sweetalert2';

let oldUsername = ''

function Account() {
  const { user } = useContext(UserContext)
  const [nameValid, setNameValid] = useState(true)
  const [nameUnique, setNameUnique] = useState(true)
  const [emailValid, setEmailValid] = useState(true);
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const fileInputRef = useRef(null); // file是非受控元件必須用ref重設input

  useEffect(() => {
    if (user) {
      oldUsername = user.username
      setFormData({
        username: user.username,
        email: user.email,
      })
    }
  }, [user])

  function handleChange(e) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  //上傳圖片
  function handleFileSelect(e) {
    const file = e.target.files[0]
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith('image/')) {
        setErrorMessage('')
        setFormData(prev => ({
          ...prev,
          image: e.target.files[0]
        }))
      } else {
        setErrorMessage("檔案格式不符，請重新上傳圖片")
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // 清除image
        setFormData(prev => ({
          ...prev,
          image: null
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        image: null
      }));
    }
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
        Swal.fire({
          title: "修改成功",
          icon: "success",
          confirmButtonText: '確定'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })
      } catch (error) {
        Swal.fire({
          title: "修改失敗",
          icon: "error",
          text: error.message
        })
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
              ref={fileInputRef}
            />
          </Form.Group>

          <Button variant="primary" type="submit"
            disabled={!nameValid || !nameUnique || (oldUsername == formData.username && !formData.image)}>
            修改資料
          </Button>
        </Form>

      </div>
    </>
  )
}
export default Account