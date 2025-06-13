import { useEffect, useState } from "react";
import { movieTitleAPI } from "../api/api";

export function useMovieTitleData() {
  const [movieTitleData, setMovieTitleData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchMovieTitleData()
  }, [])

  async function fetchMovieTitleData() {
    try {
      const res = await fetch(movieTitleAPI, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMovieTitleData(resData.data)
      } else {
        console.log('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.log('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return { movieTitleData, loading }
}