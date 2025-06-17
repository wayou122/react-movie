import { Button, Form } from "react-bootstrap"
import { EditingPlaceContext } from "../pages/Map"
import { useContext, useRef, useState } from "react"
import Swal from "sweetalert2";
import { addSpotSubmit } from "../services/SpotService";
import { UserContext } from "../contexts/UserContext";
import { useMovieTitleData } from "../hooks/useMovieTitleData";
import LoadingSpinner from "../components/LoadingSpinner";
import Select from "react-select";

export default function EditingPlace() {
  const { user } = useContext(UserContext)
  const { formData, setFormData, refetch } = useContext(EditingPlaceContext)
  const textareaRef = useRef(null)
  const { movieTitleData, loading } = useMovieTitleData()
  const [selectedOption, setSelectedOption] = useState(null)

  if (loading) return <LoadingSpinner />

  const options = movieTitleData.map(data => ({
    value: data.movieId,
    label: data.title,
  }));

  function handleChange(name, value) {
    setFormData(prev => ({
      ...prev, [name]: value
    }))
  }

  function handleSelectChange(option) {
    setSelectedOption(option);
    const value = option ? option.value : ''
    handleChange('movieId', value);
  }

  function handleClear() {
    setFormData({ spotName: '', lat: '', lng: '', movieId: '', description: '' })
    setSelectedOption(null)
  }

  function autoGrow() {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'; // 重設高度
      textarea.style.height = textarea.scrollHeight + 5 + 'px'; // 設為內容高度
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await addSpotSubmit(formData)
      handleClear()
      refetch()
      Swal.fire({
        title: "新增成功",
        icon: "success",
      })
    } catch (err) {
      Swal.fire({
        title: "新增失敗",
        icon: "error",
        text: err.message
      })
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="form">
          <Form.Label>景點名稱</Form.Label>
          <Form.Control type="text"
            name='spotName'
            placeholder="輸入景點名稱"
            value={formData.spotName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="form">
          <Form.Label>景點位置</Form.Label>
          <Form.Control type="text"
            name='position'
            placeholder="點選地圖設定位置"
            value={formData.lng ? `${Math.floor(formData.lng * 100000) / 100000}, ${Math.floor(formData.lat * 100000) / 100000}` : ''}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            style={{ backgroundColor: "transparent" }}
            disabled
            required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="form">
          <Form.Label>電影名稱</Form.Label>
          <Select
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            isSearchable
            isClearable
            placeholder="搜尋或選擇電影..."
            noOptionsMessage={() => "找不到符合的電影"}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="form">
          <Form.Label>地點說明</Form.Label>
          <Form.Control as="textarea"
            name='description'
            value={formData.description}
            onChange={(e) => { autoGrow(); handleChange(e.target.name, e.target.value) }}
            ref={textareaRef}
            required />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit" className="me-2"
            disabled={!user || !formData.lat || !formData.movieId || !formData.description} >
            {user ? '確認新增' : '登入才可新增'}
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
