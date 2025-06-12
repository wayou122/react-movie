import { useEffect, useState } from "react";
import { reviewerNameAPI } from "../api/api";

export function useReviewerData(name, page) {
  const [reviewerData, setReviewerData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchReviewerData()
  }, [name, page])

  async function fetchReviewerData() {
    try {
      const res = await fetch(reviewerNameAPI(name, page), {
        method: 'GET',
        credentials: 'include',
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setReviewerData(resData.data)
      } else {
        console.error('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.error('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }
  return { reviewerData, loading }
}