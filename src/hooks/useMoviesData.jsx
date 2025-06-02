import { useEffect, useState } from "react"
import { watchlistAPI, movieAPI } from "../api/api"

export function useMoviesData(moviesFilter) {
  const [moviesData, setMoviesData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    //fetchMovieData()
    setMoviesData(testMovieData)
  }, [moviesFilter])

  async function fetchMovieData() {
    const API = moviesFilter.watchlist ? watchlistAPI : movieAPI
    try {
      const res = await fetch(API, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(moviesFilter)
      })
      //const res = await fetch(API, { method: 'GET' })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMoviesData(resData.data)
      } else {
        console.error('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.error('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function testMovieData() {
    const moviesData = [{
      movieId: 5,
      title: '一家子兒咕咕叫',
      director: '魏德聖'
      , actor: '李安平、游採安、朱裕鈞、王彩英、陳淑貞、張志華、黃芳宜'
      , releaseDate: '2022/02/19'
      , type: '劇情片'
      , length: 120
      , posterUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354'
      , bannerUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/11663.jpg?202505051419035691034'
      , scoreAvg: 4
      , reviewCount: 3
      , bookmark: true
    }, {
      movieId: 10,
      title: '海角七號',
      director: '王小棣'
      , actor: '王彩英、陳淑貞、張志華、黃芳宜'
      , releaseDate: '2023/06/31'
      , type: '紀錄片'
      , length: 98
      , posterUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354'
      , bannerUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/11663.jpg?202505051419035691034'
      , scoreAvg: 5
      , reviewCount: 3
      , bookmark: false
    }]
    setLoading(false)
    return moviesData
  }

  return { moviesData, loading }
}