import { useEffect, useState } from "react"
import { watchlistAPI } from "../api/api"

export function useWatchlistData() {
  const [watchlistData, setWatchlistData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchWatchlistData()
  }, [])

  async function fetchWatchlistData() {
    try {
      const res = await fetch(watchlistAPI, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      if (resData.code == 200) {
        setWatchlistData(resData.data)
      } else {
        console.error(`載入失敗: ${resData.message}`)
      }
    } catch (err) {
      console.error('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }
  return { watchlistData, loading }
}