import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import ScoreSection from '../components/ScoreSection'
import MovieTitleSection from '../components/MovieTtileSection'
function MovieCardSmall() {
  const title = '一家子兒咕咕叫'
  const director = '魏德聖'
  const actor = '李安平, 游採安, 朱裕鈞, 王彩英, 陳淑貞, 張志華, 黃芳宜'
  const releaseDate = '2025/02/19'
  const genere = '劇情片'
  const length = '120 分'
  const imgUrl = 'https://fakeimg.pl/300x450'

  const score = '85%'
  const reviewCount = 27
  const bookmark = false

  const [mark, setMark] = useState(bookmark);
  const handleMarkClick = () => [
    setMark(!mark)
  ]

  return (
    <>
      <Card>
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body>
          <MovieTitleSection bookmark={true} title={title}></MovieTitleSection>
          <div>
            <p className='mb-2'>
              <span>{releaseDate.slice(0, 4)}．</span>
              <span>{genere}．</span>
              <span>{length}</span>
            </p>
            <ScoreSection score={score} reviewCount={reviewCount}></ScoreSection>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
export default MovieCardSmall