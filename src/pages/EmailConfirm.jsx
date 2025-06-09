import { useState, useEffect, useContext } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import Menu from '../layouts/Menu'
import { useSearchParams } from 'react-router-dom';
import { getEmailConfirm } from '../services/LoginRegisterService';

function EmailConfirm() {
  const [message, setMessage] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  useEffect(() => {
    emailConfirm()
  })

  async function emailConfirm() {
    try {
      await getEmailConfirm(email, token)
      setMessage('信箱驗證成功，請登入帳號')
    } catch (err) {
      setMessage(err.message)
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
