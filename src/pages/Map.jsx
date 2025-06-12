import Menu from "../layouts/Menu"
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function ListenClick({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng)
    }
  })
  return null
}

function Map() {
  const { isDarkMode } = useContext(ThemeContext)
  const [formData, setFormData] = useState({ lat: '', lng: '', title: '', description: '' })

  function handleClick(latlng) {
    setFormData(prev => ({
      ...prev, lat: latlng.lat, lng: latlng.lng
    }))
  }

  function handleClear() {
    setFormData({ lat: '', lng: '', title: '', description: '' })
  }
  return (
    <>
      <Menu />
      <Container >
        <Row>
          <Col xs={12} lg={9}>
            <MapContainer center={[25.05, 121.55]} zoom={13} style={{ height: '500px', width: '100%' }}>
              {
                isDarkMode ?
                  <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                  :
                  <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
              }
              <ListenClick onMapClick={handleClick} />
              <Marker position={[25.033964, 121.564468]}>
                <Tooltip>台北101</Tooltip>
              </Marker>
            </MapContainer>
          </Col>

          <Col xs={12} lg={3}>
            <h3 className="text-center mb-2">新增電影地點</h3>
            <Form onSubmit={''}>
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>地點位置</Form.Label>
                <Form.Text className="text-muted">
                  請點選地圖設定經緯度
                </Form.Text>
                <Form.Control type="text"
                  name='position'
                  value={formData ? `${Math.floor(formData.lng * 1000) / 1000}, ${Math.floor(formData.lat * 1000) / 1000}` : ''}
                  onChange={''}
                  isInvalid={false}
                  disabled
                  required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>電影名稱</Form.Label>
                <Form.Control type="text"
                  name='title'
                  value={''}
                  onChange={''}
                  isInvalid={false}
                  required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>地點說明</Form.Label>
                <Form.Control as="textarea"
                  name='description'
                  value={''}
                  onChange={''}
                  isInvalid={false}
                  required />
              </Form.Group>
              <Button variant="primary" type="submit"
                disabled={!formData.lat || !formData.title || !formData.description} >
                確認新增
              </Button>
              <Button variant="secondary"
                onClick={handleClear} >
                清除
              </Button>
            </Form>
          </Col>
        </Row>

      </Container>
    </>
  )
}
export default Map

