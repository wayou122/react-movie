import { useState, useMemo, useContext } from 'react'
import { MovieContext } from '../contexts/MovieContext'
import { Row, Col, Card } from 'react-bootstrap'
import Review from "./Review"
import ReviewsFilter from '../components/ReviewsFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import { ReviewProvider } from "../contexts/ReviewContext"

// const reviews = [
//   {
//     title: '夢裡有顆星',
//     account: 'moonlight998',
//     score: 4,
//     likes: 23,
//     content: "有些事情其實也沒有解釋，只是走著走著就懂了。人們總說成長是孤獨的，卻也因此更能看清方向。",
//     isLike: 'like',
//     date: '2023-11-03'
//   },
//   {
//     title: '貓咪的午茶時間',
//     account: 'kittylover12',
//     score: 2,
//     likes: 8,
//     content: "沙發邊的小被子還沒收，陽光剛好灑進來的午後，是我最喜歡的平靜時光。",
//     isLike: 'dislike',
//     date: '2025-01-19'
//   },
//   {
//     title: '走走停停才是旅行',
//     account: 'wanderer_07',
//     score: 5,
//     likes: 34,
//     content: "每一個轉角都有新的驚喜，停下來看看其實比趕路更重要，這次在山裡看見了第一場雪。",
//     isLike: 'like',
//     date: '2025-02-03'
//   },
//   {
//     title: '星空下的告白',
//     account: 'stardust_xx',
//     score: 1,
//     likes: 4,
//     content: "話說到一半就卡住了，因為那雙眼睛看著我，什麼都說不出口。",
//     isLike: 'dislike',
//     date: '2025-03-03'
//   },
//   {
//     title: '早餐店的老闆娘',
//     account: 'eggtoast404',
//     score: 3,
//     likes: 15,
//     content: "每天早上那杯豆漿就像安定劑一樣，熟悉的味道讓我感到安心，她總記得我要加一點糖。",
//     isLike: 'like',
//     date: '2024-12-03'
//   },
//   {
//     title: '雨天書店',
//     account: 'reader_june',
//     score: 5,
//     likes: 40,
//     content: "店裡放著老爵士樂，雨滴敲打著玻璃窗，我坐在角落翻著那本已經看過兩遍的小說。",
//     isLike: 'like',
//     date: '2024-01-03'
//   },
//   {
//     title: '巷口的紅燈',
//     account: 'cityfeet009',
//     score: 2,
//     likes: 7,
//     content: "每次等紅燈時，總會看到對街那個站牌下的她，好像從來沒注意過我。",
//     isLike: 'dislike',
//     date: '2025-01-01'
//   },
//   {
//     title: '記得呼吸',
//     account: 'mindfulme22',
//     score: 4,
//     likes: 19,
//     content: "在混亂中靜下來，閉上眼，深呼吸，其實只是提醒自己還活著。",
//     isLike: 'like',
//     date: '2025-01-03'
//   }
// ];

function ReviewSection() {
  const { movieData, loading } = useContext(MovieContext)
  if (loading) return <LoadingSpinner />

  const reviews = movieData.reviews

  const scoreMap = { '超讚': 5, '好看': 4, '普普': 3, '難看': 2, '爛透': 1 }
  const [myFilter, setMyFilter] = useState({
    '排序': '最新影評',
    '評分': '所有評分'
  });

  const filterGroups = {
    //'排序': ['最新影評', '熱門影評'],
    '評分': ['所有評分', '超讚', '好看', '普普', '難看', '爛透']
  }

  function sortReviews(reviews) {
    return reviews
    // return reviews.sort((a, b) => {
    //   if (myFilter['排序'] == '最新影評') {
    //     return b.createDate > a.createDate ? 1 : -1;
    //   } else if (myFilter['排序'] == '熱門影評') {
    //     return b.popular - a.popular;
    //   }
    // })
  }

  const filteredReviews = useMemo(() => {
    const sorted = sortReviews(reviews);
    if (myFilter['評分'] == '所有評分') {
      return sorted;
    }
    const myScore = scoreMap[myFilter['評分']]
    return sorted.filter(r => r.score == myScore)
  }, [myFilter])

  function handleFilterChange(e) {
    setMyFilter(f => ({
      ...f,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      {/* <Row className='justify-content-center'>
        <Col xs={12} sm={9} lg={6}>
          <ReviewsFilter />
        </Col>
      </Row> */}

      {
        filteredReviews.map((review, i) => (
          <Row className='justify-content-center' key={review.reviewId}>
            <Col xs={12} sm={9} lg={6}>
              <Card className='ps-3 pe-3 pt-2 pb-2 mt-2'>
                <ReviewProvider value={{ review }}>
                  <Review />
                </ReviewProvider>
              </Card>
            </Col>
          </Row>
        ))
      }
    </>
  )
}
export default ReviewSection