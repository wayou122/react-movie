import { useContext, useState } from "react";
import ThreeDotBtn from "../components/ThreeDotBtn";
import { UserContext } from "../contexts/UserContext";
import { toggleReviewReactionAPI } from "../api/api";
import { scoreOptions } from "../utils/scoreOptions";
import { ReviewContext } from "../contexts/ReviewContext"

function Review() {
  const { user } = useContext(UserContext)
  const { review } = useContext(ReviewContext)

  const userId = 3
  const reviewerId = review.userId
  const reviewerName = review.username || 'tom'
  const score = review.score
  const likes = review.likeCount
  const content = review.content
  const isLike = review.reaction || 0
  const id = review.reviewId
  const createdDate = review.createdDate

  const [showMore, setShowMore] = useState(false);
  function toggleShowMore() { setShowMore(!showMore) };
  const contentLess = content && content.length > 80 ? false : true;

  const [likeCount, setLikeCount] = useState(likes);
  const [sentiment, setSentiment] = useState(isLike);

  async function handleLikeClick() {
    if (!user) {
      alert('請先登入')
      return
    }
    if (sentiment === 'like') {
      if (await fetchReviewLike(0)) {
        setSentiment(null)
        setLikeCount(likeCount - 1)
      }
    } else {
      if (await fetchReviewLike(1)) {
        setSentiment('like')
        setLikeCount(likeCount + 1)
      }
    }
  }

  async function handleDislikeClick() {
    if (!user) {
      alert('請先登入')
      return
    }
    if (sentiment === 'dislike') {
      if (await fetchReviewLike(0))
        setSentiment(null)
    } else if (sentiment === 'like') {
      if (await fetchReviewLike(-1)) {
        setSentiment('dislike')
        setLikeCount(likeCount - 1)
      }
    } else {
      if (await fetchReviewLike(-1))
        setSentiment('dislike')
    }
  }

  async function fetchReviewLike(reaction) {
    try {
      const res = await fetch(toggleReviewReactionAPI(id, reaction), {
        method: 'GET',
        credentials: 'include',
      })
      const resData = await res.json()
      if (res.ok && resData.code === 200) {
        console.log('修改成功')
        return true
      } else {
        console.error('修改失敗: ' + resData.message)
        return false
      }
    } catch (err) {
      console.error('修改錯誤: ' + err.message)
      return false
    }
  }

  return (
    <>
      <div style={{ maxWidth: "660px" }} className="overflow-hidden">
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='pt-2 mb-2'>
              <span className="me-2">{reviewerName}</span>
              <span className="me-2">{scoreOptions[score].emoji}</span>
              <span className="small text-muted">{createdDate}</span>
              {/* <span className="stars">{'★'.repeat(score)}</span> */}
            </div>
            {reviewerId == userId ?
              <ThreeDotBtn /> : ''
            }
          </div>

          <p className="me-3 pb-0">
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