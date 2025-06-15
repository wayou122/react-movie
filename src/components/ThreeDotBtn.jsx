import { useContext, useState } from "react";
import { Dropdown, DropdownButton, ButtonGroup, Modal, Button } from "react-bootstrap";
import WriteReview from '../layouts/WriteReview'
import { ReviewContext } from "../contexts/ReviewContext";
import { deleteReviewAPI } from "../api/api";
import Swal from "sweetalert2";

function ThreeDotBtn() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { review } = useContext(ReviewContext)

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  async function handleDelete() {
    try {
      const res = await fetch(deleteReviewAPI(review.reviewId), {
        method: 'DELETE',
        credentials: 'include',
      })
      const resData = await res.json()
      if (res.ok && resData.code === 200) {
        Swal.fire({
          title: "刪除成功",
          icon: "success",
          confirmButtonText: '確定'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })
      } else {
        Swal.fire({
          title: "刪除失敗",
          icon: "error",
          confirmButtonText: resData.message
        })
      }
    } catch (err) {
      Swal.fire({
        title: "刪除失敗",
        icon: "error",
        confirmButtonText: err.message
      })
    }
  }


  return (
    <div>
      <DropdownButton
        as={ButtonGroup}
        id={`dropdown-button-drop-1`}
        variant="light"
        title="⋮"
        className='review-ddd-btn'
      >
        <Dropdown.Item eventKey="1" onClick={handleShowEdit}>編輯</Dropdown.Item>
        <Dropdown.Item eventKey="2" onClick={handleShowDelete}>刪除</Dropdown.Item>
      </DropdownButton>

      {/* 編輯跳窗 */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>編輯影評</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WriteReview
            updating
            content={review.content}
            score={review.score}
            reviewId={review.reviewId}
            title={review.title} />
        </Modal.Body>
      </Modal>

      {/* 刪除跳窗 */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>刪除影評</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>確定要刪除影評嗎？</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleCloseDelete}>
            關閉
          </Button>
          <Button variant="primary" onClick={() => { handleDelete(); handleCloseDelete() }}>
            確定刪除
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
export default ThreeDotBtn