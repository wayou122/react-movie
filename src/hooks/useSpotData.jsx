import { useCallback, useEffect, useState } from "react";
import { mapDataAPI } from "../api/api";

export function useSpotData() {
  const [spotData, setSpotData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSpotData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(mapDataAPI, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setSpotData(resData.data)
      } else {
        console.log('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.log('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSpotData()
  }, [fetchSpotData])

  return { spotData, loading, refetch: fetchSpotData }
}