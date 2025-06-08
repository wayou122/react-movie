import { updateUsernameAPI } from "../api/api"

export async function putAccountInfo(formData) {
  let resData;
  try {
    const res = await fetch(updateUsernameAPI, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'username': formData.username })
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('修改錯誤: ' + err.message)
  }
  if (resData.code == 200) {
    return '修改成功'
  } else {
    throw new Error(`修改失敗: ${resData.message || '未知錯誤'}`)
  }
}