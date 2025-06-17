import { updateAccountAPI } from "../api/api"

export async function postAccountInfo(formData) {
  let resData;
  try {
    const res = await fetch(updateAccountAPI, {
      method: 'POST',
      credentials: 'include',
      body: formData
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