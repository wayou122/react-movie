import { useState, useEffect } from "react"
import { movieIdAPI } from "../api/api";

export function useMovieData(id) {
  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchMovieData(id)
    //setMovieData(testmovieData)
  }, [id])

  function testmovieData() {
    setLoading(false)
    return {
      movieId: 1049,
      title: '一家子兒咕咕叫',
      director: '魏德聖'
      , actor: '李安平、游採安、朱裕鈞、王彩英、陳淑貞、張志華、黃芳宜'
      , releaseDate: '2025/02/19'
      , type: '劇情片'
      , length: 120,
      content: '2024年是全球有紀錄以來最熱的一年，極端氣候事件災害頻傳。而南極與北極，扮演著地球重要的恆溫器，影響著人類與萬千物種的生存，但人類活動所排放的二氧化碳卻讓極地暖化加速進行，暖化巨變與生態危機迫在眉睫。\n《守護我們的星球》是台灣第一部跨越南北極的生態電影，更是首度以台灣觀點、為地球生態發聲的紀錄片。拍攝團隊歷時 15 年，橫跨冰雪荒漠、潛入太平洋深海，遠征 115 個外景地，以克服嚴酷環境、生存繁衍的 82 個驚奇物種為敘事主角，真實呈現南北極宏偉壯麗、震懾人心的自然奇景；最後透過實際參與台灣科學家的極地研究，以台灣視角探討極地暖化與人類生存的未來，進而喚起世人守護地球環境的力量。\n※資料由牽猴子股份有限公司、東森電視事業股份有限公司提供'
      , posterUrl: '/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354'
      , bannerUrl: '/ImageData/60/2025/93359/11663.jpg?202505051419035691034'
      , scoreAvg: 5
      , reviewCount: 3
    }
  }
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