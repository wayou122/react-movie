import { useState } from "react";
import { Dropdown, DropdownButton, ButtonGroup, Modal, Button } from "react-bootstrap";
import MyReview from '../layouts/WriteReview'

function ThreeDotBtn() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
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
          <MyReview></MyReview>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleCloseEdit}>
            關閉
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            儲存
          </Button>
        </Modal.Footer>
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
          <Button variant="primary" onClick={handleCloseDelete}>
            確定刪除
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}
export default ThreeDotBtn