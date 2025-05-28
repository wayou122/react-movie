import { useState } from 'react'
import MovieContext from '../pages/Movie'

function MovieSummary() {
  const movieData = useContext(MovieContext)
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const content = movieData.content
  //const content = '2024年是全球有紀錄以來最熱的一年，極端氣候事件災害頻傳。而南極與北極，扮演著地球重要的恆溫器，影響著人類與萬千物種的生存，但人類活動所排放的二氧化碳卻讓極地暖化加速進行，暖化巨變與生態危機迫在眉睫。\n《守護我們的星球》是台灣第一部跨越南北極的生態電影，更是首度以台灣觀點、為地球生態發聲的紀錄片。拍攝團隊歷時 15 年，橫跨冰雪荒漠、潛入太平洋深海，遠征 115 個外景地，以克服嚴酷環境、生存繁衍的 82 個驚奇物種為敘事主角，真實呈現南北極宏偉壯麗、震懾人心的自然奇景；最後透過實際參與台灣科學家的極地研究，以台灣視角探討極地暖化與人類生存的未來，進而喚起世人守護地球環境的力量。\n※資料由牽猴子股份有限公司、東森電視事業股份有限公司提供\n收合'
  const splitContent = content.split('\n').map((str, k) => <p key={k}>{str}</p>)
  const contentLess = splitContent.length > 2 ? false : true;

  return (
    <>
      <div className='movie-summary'>
        {showMore ? splitContent : splitContent.filter((c, i) => i < 1)}
        {contentLess ? '' :
          <span><button
            className="p-0 ms-0 show-more-btn"
            onClick={toggleShowMore}
          >
            {showMore ? "顯示較少" : "...顯示更多"}
          </button></span>}
      </div>
    </>
  )
}
export default MovieSummary