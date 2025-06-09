import { useState, useEffect } from "react"
import { movieIdAPI } from "../api/api";

export function useMovieData(id) {
  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchMovieData(id)
  }, [id])

  async function fetchMovieData(id) {
    try {
      const res = await fetch(movieIdAPI(id), {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMovieData(resData.data)
      } else {
        console.log('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.log('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }
  return { movieData, loading }
}