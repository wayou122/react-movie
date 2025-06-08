import { addReviewAPI, updateReviewAPI } from "../api/api";

export async function postAddReview(movieId) {
  let resData;
  try {
    const res = await fetch(addReviewAPI(movieId), {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ score: selectedValue, content: textareaValue })
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

export async function putUpdateReview(reviewId) {
  let resData;
  try {
    const res = await fetch(updateReviewAPI(reviewId), {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ score: selectedValue, content: textareaValue })
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('修改錯誤: ' + err.message)
  }
  if (resData.code === 200) {
  } else {
    throw new Error(`修改失敗: ${resData.message || '未知錯誤'}`)
  }
}