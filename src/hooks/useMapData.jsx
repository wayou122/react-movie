import { useEffect, useState } from "react";
import { mapDataAPI } from "../api/api";

export function useMapData() {
  const [mapData, setMapData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    //fetchMapData()
    testData()
  }, [])

  async function fetchMapData() {
    try {
      const res = await fetch(mapDataAPI, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMapData(resData.data)
      } else {
        console.log('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.log('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function testData() {
    setMapData([
      { lat: 25.02, lng: 121.56, name: 'abc', title: '438' },
      { lat: 25.03, lng: 121.54, name: 'abb', title: '432' },
      { lat: 25.03, lng: 121.53, name: 'abe', title: '429' },
      { lat: 25.07, lng: 121.54, name: 'abd', title: '434' },
      { lat: 25.04, lng: 121.53, name: 'acc', title: '412' }
    ])
    setLoading(false)
  }

  return { mapData, loading }
}