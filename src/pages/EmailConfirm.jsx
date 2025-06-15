import { useState, useEffect, useContext } from 'react'
import Menu from '../layouts/Menu'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getEmailConfirm } from '../services/LoginRegisterService';
import Swal from 'sweetalert2';

function EmailConfirm() {
  const [message, setMessage] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const navigate = useNavigate()
  useEffect(() => {
    emailConfirm()
  }, [])

  async function emailConfirm() {
    try {
      await getEmailConfirm(email, token)
      Swal.fire({
        title: "驗證成功，請登入帳號",
        icon: "success",
        confirmButtonText: '確定'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    } catch (err) {
      Swal.fire({
        title: "驗證失敗",
        icon: "error",
        confirmButtonText: err.message
      })
    }
  }

  return (
    <>
      <Menu />
      <div className='d-flex mt-5'>
        <p className='mx-auto'>{message}</p>
      </div>
    </>
  )

}
export default EmailConfirm
