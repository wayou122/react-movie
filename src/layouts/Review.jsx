import { useContext, useState } from "react";
import ThreeDotBtn from "../components/ThreeDotBtn";
import { UserContext } from "../contexts/UserContext";
import { toggleReviewReactionAPI } from "../api/api";
import { scoreOptions } from "../utils/scoreOptions";
import { ReviewContext } from "../contexts/ReviewContext"
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Review() {
  const { user } = useContext(UserContext)
  const { review } = useContext(ReviewContext)
  const navigate = useNavigate()

  const userId = user ? user.userId : null
  const reviewerId = review.authorId
  const reviewerName = review.authorName
  const reviewerImg = review.authorImagePath
  const score = review.score
  const likes = review.likeCount
  const content = review.content
  const reaction = review.reaction
  const id = review.reviewId
  const createdDate = review.createdDate
  const title = review.title


  const [showMore, setShowMore] = useState(false);
  function toggleShowMore() { setShowMore(!showMore) };
  const contentLess = content && content.length > 80 ? false : true;

  const [likeCount, setLikeCount] = useState(likes);
  const [sentiment, setSentiment] = useState(reaction);

  async function handleLikeClick() {
    if (!user) {
      Swal.fire({
        title: "請先登入再按讚",
        icon: "warning"
      });
      return
    }
    if (sentiment === 1) {
      if (await fetchReviewLike(0)) {
        setSentiment(null)
        setLikeCount(likeCount - 1)
      }
    } else {
      if (await fetchReviewLike(1)) {
        setSentiment(1)
        setLikeCount(likeCount + 1)
      }
    }
  }

  async function handleDislikeClick() {
    if (!user) {
      Swal.fire({
        title: "請先登入再按",
        icon: "warning"
      });
      return
    }
    if (sentiment === -1) {
      if (await fetchReviewLike(0))
        setSentiment(null)
    } else if (sentiment === 1) {
      if (await fetchReviewLike(-1)) {
        setSentiment(-1)
        setLikeCount(likeCount - 1)
      }
    } else {
      if (await fetchReviewLike(-1))
        setSentiment(-1)
    }
  }

  async function fetchReviewLike(reaction) {
    try {
      const res = await fetch(toggleReviewReactionAPI(id, reaction), {
        method: 'PUT',
        credentials: 'include',
      })
      const resData = await res.json()
      if (res.ok && resData.code === 200) {
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
      <div className="overflow-hidden">

        <div className='d-flex justify-content-between align-items-center'>
          <div className='pt-2 mb-2 d-flex align-items-center'>
            <img className='review-account-img me-2' src={`http://localhost:8085/${reviewerImg}`}></img>
            <span className="me-2 navigate-link" onClick={() => navigate(`/reviewer/${reviewerName}`)}>{reviewerName}</span>
            <span className="me-2">{scoreOptions[score].emoji}</span>
            <span className="small text-muted">{createdDate}</span>
          </div>
          {userId && reviewerId == userId ?
            <ThreeDotBtn /> : ''
          }
        </div>

        {/* 內容 */}
        <p className="me-3 pb-0">
          {title ? <span >【{title}】</span> : ''}
          {showMore ? content : content.slice(0, 100)}
          {contentLess ? '' :
            <button
              className="p-0 ms-0 show-more-btn"
              onClick={toggleShowMore}
            >
              {showMore ? "顯示較少" : "...顯示更多"}
            </button>}
        </p>

        {/* 按鈕 */}
        <div className="d-flex justify-content-start gap-3 like-dislike-btn">
          <button onClick={handleLikeClick}
            className={sentiment === 1 ? "review-like-btn-checked" : "review-like-btn"}>
            <div className="d-flex align-items-center">
              <span className={`me-2 ${sentiment === 1 ? 'filled-icon' : 'outlined-icon'}`}>thumb_up</span>
              <span>{likeCount}</span>
            </div>
          </button>
          <button onClick={handleDislikeClick}
            className={sentiment === -1 ? "review-dislike-btn-checked" : "review-dislike-btn"}>
            <div className="d-flex align-items-center">
              <span className={`me-2 ${sentiment === -1 ? 'filled-icon' : 'outlined-icon'}`}>thumb_down</span>
            </div>
          </button>
        </div>

      </div>
    </>
  )
}

export default Review;