import { Button, Form } from "react-bootstrap"
import { EditingPlaceContext } from "../pages/Map"
import { useContext, useRef } from "react"

export default function EditingPlace() {
  const { formData, setFormData } = useContext(EditingPlaceContext)
  const textareaRef = useRef(null); //綁定底下 ref={textareaRef}

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev, [name]: value
    }))
  }

  function handleClear() {
    setFormData({ name: '', lat: '', lng: '', title: '', description: '' })
  }

  function autoGrow() {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'; // 重設高度
      textarea.style.height = textarea.scrollHeight + 5 + 'px'; // 設為內容高度
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="form">
          <Form.Label>景點名稱</Form.Label>
          <Form.Control type="text"
            name='name'
            value={formData.name}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="form">
          <Form.Label>景點位置</Form.Label>
          <Form.Control type="text"
            name='position'
            placeholder="請點選地圖設定經緯度"
            value={formData.lng ? `${Math.floor(formData.lng * 1000) / 1000}, ${Math.floor(formData.lat * 1000) / 1000}` : ''}
            onChange={handleChange}
            style={{ backgroundColor: "transparent" }}
            disabled
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="form">
          <Form.Label>電影名稱</Form.Label>
          <Form.Control type="text"
            name='title'
            value={formData.title}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="form">
          <Form.Label>地點說明</Form.Label>
          <Form.Control as="textarea"
            name='description'
            value={formData.description}
            onChange={(e) => { autoGrow(); handleChange(e) }}
            ref={textareaRef}
            required />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="me-2"
            disabled={!formData.lat || !formData.title || !formData.description} >
            確認新增
          </Button>
          <Button variant="secondary"
            onClick={handleClear} >
            清除
          </Button>
        </div>
      </Form>
    </>
  )
}
