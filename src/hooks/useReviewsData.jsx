import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { reviewAPI } from "../api/api";

export function useReviewsData(reviewsFilter) {
  const [reviewsData, setReviewsData] = useState(null)
  const [totalPage, setTotalPage] = useState(null)
  const [loading, setLoading] = useState(true)
  //const personal = useLocation().pathname.includes()
  const personal = false
  const fullReviewsFilter = { ...reviewsFilter, personal: personal }

  useEffect(() => {
    setLoading(true)
    //fetchReviewsData()
    setReviewsData(testReviewsData())
    setTotalPage(3)
    setLoading(false)
  }, [JSON.stringify(fullReviewsFilter)])

  async function fetchReviewsData() {
    try {
      const res = await fetch(reviewAPI, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },

      })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setReviewsData(resData.data)
      } else {
        console.error('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.error('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  function testReviewsData() {
    const reviewsData = [{
      movieId: 5,
      title: '一家子兒咕咕叫',
      posterUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354',
      reviewId: 7,
      authorId: 3,
      authorName: 'happy',
      createdDate: '2025/02/19',
      score: 5,
      content: '這真的是一部非常值得看的電影，超級讚有夠好看',
      likeCount: 6,
      reaction: -1,
    }, {
      movieId: 5,
      title: '一家子兒咕咕叫',
      posterUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354',
      reviewId: 9,
      authorId: 4,
      authorName: 'jack',
      createdDate: '2025/03/05',
      score: 4,
      content: '還不錯啦',
      likeCount: 3,
      reaction: 1,
    }]
    return reviewsData
  }
  return { reviewsData, totalPage, loading }
}