import { useState } from "react";
import { Card, Row, Col, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import ThreeDotBtn from "../components/ThreeDotBtn";


function Review(props) {

  const title = props.title
  const account = props.account
  const score = props.score
  const likes = props.likes
  const content = props.content
  const isLike = props.isLike

  // const title = '一家子兒咕咕叫'
  // const account = 'fifine0892'
  // const score = 5;
  // const likes = 10;
  // const content = "是跟連漂可以起後數，的名字做線上一堆的原因是不你說的，你是屬於該就明信片，真的覺長的也跟開就是的情緒，所以才想著麼也還是會。 難以有年期的會覺得是不，不需要的網似乎沒辛苦了，筆其實我了什有很多買了⋯快樂代表這種一天，起門口嚴重教會被我都還交小朋友，正確一次一很開心並不是。就是花敗家的比較很一直有有沒有⋯大小看了一是，些事情就開始，想第天說沒有，多久好可以發現的有夠，想要甚麼呢主線一個是時的時間。 黑再這幾，是認識，都沒大叔台死狀風格。的時候最可愛你還是，你是有大家高雄會出麵包，裡的對方身邊，得有點非也很務對方上是不是，的眼神：哈哈哈。配信⋯半夜我的快希望幫助，不會啊啊的人在乎了，嗚嗚就是不是不正太還有，不知道在因為爛怎麼看⋯來玩品的想不到我發。說什麼用，高沒什麼長時間嗚嗚了一就覺得，感覺拉，起來了，之後啊啊你跟我身⋯公一樣的賣貨便我覺得別的很喜歡。起來喜歡這竟然⋯已經也覺得雖然，都有以先，拍攝看到會在是我沒因為，然後一我用哈哈哈，啊啊了好漫啊啊個人。麼呢主線一個是時的時間。 黑再這幾，是認識，都沒大叔台死狀風格。的時候最可門口嚴重教會被我都還交小朋友，正確一次一很開心並不是。就是花敗家的比。"
  // const isLike = 'like'

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => setShowMore(!showMore);
  const contentLess = content.length > 80 ? false : true;

  const [likeCount, setLikeCount] = useState(likes);
  const [sentiment, setSentiment] = useState(isLike);
  const handleLikeClick = () => {
    if (sentiment === 'like') {
      setSentiment(null);
      setLikeCount(likeCount - 1)
    } else {
      setSentiment('like')
      setLikeCount(likeCount + 1)
    }
  }
  const handleDislikeClick = () => {
    if (sentiment === 'dislike') {
      setSentiment(null)
    } else if (sentiment === 'like') {
      setSentiment('dislike')
      setLikeCount(likeCount - 1)
    }
    else {
      setSentiment('dislike')
    }
  }

  return (
    <>
      <div style={{ maxWidth: "660px" }} className="overflow-hidden review-movie-card">
          <div>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='pt-2 mb-2'>
                  <span className="me-2">{account}</span>
                  <span className="stars">{'★'.repeat(score)}</span>
                </div>
              <ThreeDotBtn />
            </div>

            <p className="me-3">
              {showMore ? content : content.slice(0, 100)}
              {contentLess ? '' :
                <button
                  className="p-0 ms-0 show-more-btn"
                  onClick={toggleShowMore}
                >
                  {showMore ? "顯示較少" : "...顯示更多"}
                </button>}
            </p>

            <div className="d-flex justify-content-start gap-3 like-dislike-btn">
              <button onClick={handleLikeClick}
                className={sentiment === 'like' ? "review-like-btn-checked" : "review-like-btn"}>
                <div className="d-flex align-items-center">
                  <span className='me-2'>
                    {sentiment === 'like' ?
                      (<span className="filled-icon">expand_circle_up</span>) :
                      (<span className="outlined-icon">expand_circle_up</span>)
                    }</span>
                  <span>{likeCount}</span>
                </div>
              </button>
              <button onClick={handleDislikeClick}
                className={sentiment === 'dislike' ? "review-dislike-btn-checked" : "review-dislike-btn"}>
                <div className="d-flex align-items-center">
                  <span className='me-2'>
                    {sentiment === 'dislike' ?
                      (<span className="filled-icon">expand_circle_down</span>) :
                      (<span className="outlined-icon">expand_circle_down</span>)
                    }</span>
                </div>
              </button>
            </div>
          </div>
      </div>
    </>
  )
}

export default Review;