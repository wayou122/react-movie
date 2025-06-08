import { emailConfirmAPI, forgetPasswordAPI, loginAPI, logoutAPI, registerAPI, resetPasswordAPI } from "../api/api"

export async function postLogin(formData) {
  let resData;
  try {
    const res = await fetch(loginAPI, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'email': formData.email, 'password': formData.password, 'authcode': formData.authcode })
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('登入錯誤: ' + err.message)
  }
  if (resData.code === 200) {
    return '登入成功'
  } else {
    throw new Error(`登入失敗: ${resData.message || '未知錯誤'}`)
  }
}

export async function postRegister(formData) {
  let resData;
  try {
    const res = await fetch(registerAPI, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'username': formData.username,
        'email': formData.email,
        'password': formData.password,
        'authcode': formData.authcode
      })
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('註冊錯誤: ' + err.message)
  }
  if (resData.code == 200) {
    return '註冊成功'
  } else {
    throw new Error(`註冊失敗: ${resData.message || '未知錯誤'}`)
  }
}

export async function getLogout() {
  try {
    await fetch(logoutAPI, {
      method: 'GET',
      credentials: 'include'
    })
  } catch (err) {
    throw new Error('登出錯誤: ' + err.message)
  }
}

export async function getEmailConfirm(email, token) {
  let resData;
  try {
    const res = await fetch(emailConfirmAPI(email, token), {
      method: 'GET',
      credentials: 'include',
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('驗證錯誤: ' + err.message)
  }
  if (resData.code === 200) {
    return '驗證成功'
  } else {
    throw new Error(`驗證失敗:  ${resData.message || '未知錯誤'}`)
  }
}

export async function postResetPassword(formData) {
  const email = formData.email
  const token = formData.token
  const password = formData.password
  let resData;
  try {
    const res = await fetch(resetPasswordAPI, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token, password })
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('重設密碼錯誤: ' + err.message)
  }
  if (resData.code === 200) {
    return '重設成功'
  } else {
    throw new Error(`重設失敗:  ${resData.message || '未知錯誤'}`)
  }
}

export async function forgetPassword(formData) {
  const email = formData.email
  const authcode = formData.authcode
  let resData;
  try {
    const res = await fetch(forgetPasswordAPI, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, authcode })
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('發送錯誤: ' + err.message)
  }
  if (resData.code === 200) {
    return '發送成功'
  } else {
    throw new Error(`發送失敗:  ${resData.message || '未知錯誤'}`)
  }
}