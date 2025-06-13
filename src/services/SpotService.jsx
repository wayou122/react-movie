import { addSpotAPI } from "../api/api";

export async function addSpotSubmit(formData) {
  let resData;
  try {
    const res = await fetch(addSpotAPI, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('新增錯誤: ' + err.message)
  }
  if (resData.code === 200) {
  } else {
    throw new Error(`新增失敗: ${resData.message || '未知錯誤'}`)
  }
}