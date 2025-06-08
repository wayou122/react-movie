import { addToWatchlistAPI } from "../api/api";

export async function putWatchlist(movieId) {
  let resData
  try {
    const res = await fetch(addToWatchlistAPI(movieId), {
      method: 'PUT',
      credentials: 'include',
    })
    resData = await res.json()
  } catch (err) {
    throw new Error('修改錯誤: ' + err.message)
  }
  if (resData.code === 200) {
    return true
  } else {
    throw new Error(`修改失敗:  ${resData.message}`)
  }
}