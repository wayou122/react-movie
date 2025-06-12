import Menu from "../layouts/Menu"
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { Col, Container, Nav, Row } from "react-bootstrap";
import { createContext, useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import EditingPlace from "../layouts/EditingPlace";
import { Icon, L } from "leaflet";
import addIcon from "../assets/add_circle_24dp_EE5555_FILL0_wght400_GRAD0_opsz24.svg"
import starIcon from "../assets/stars_24dp_EE8822_FILL0_wght400_GRAD0_opsz24.svg"
import { useMapData } from "../hooks/useMapData";
import LoadingSpinner from "../components/LoadingSpinner";
import { Footer } from "../layouts/Footer";
import { PlaceInfo } from "../layouts/PlaceInfo";

export const EditingPlaceContext = createContext()



function Map() {
  const { isDarkMode } = useContext(ThemeContext)
  const { mapData, loading } = useMapData()
  const [mode, setMode] = useState('info')
  const [formData, setFormData] = useState({ lat: '', lng: '', name: '', title: '', description: '' })
  const [infoData, setInfoData] = useState({ lat: '', lng: '', name: '', title: '', description: '' })
  const newPlaceIcon = new Icon({
    iconUrl: addIcon,
    iconSize: [30, 30],
  })

  const placesIcon = new Icon({
    iconUrl: starIcon,
    iconSize: [30, 30],
  })

  function ListenClick({ onMapClick }) {
    if (mode == 'add') {
      useMapEvents({
        click(e) {
          onMapClick(e.latlng)
        }
      })
      return null
    }
  }

  function handleClick(latlng) {
    setFormData(prev => ({
      ...prev, lat: latlng.lat, lng: latlng.lng
    }))
  }

  function handleSelectTab(selectedKey) {
    if (selectedKey == 'info') {
      setMode('info')
      setFormData({ lat: '', lng: '', name: '', title: '', description: '' })
    } else if (selectedKey == 'add') {
      setMode('add')
    }
  }

  function handleMarkerClick(data) {
    if (mode == 'info') {
      setInfoData({
        lat: data.lat, lng: data.lng, name: data.name, title: data.title, description: data.description
      })
    }
  }

  let sideSection
  if (loading) return <LoadingSpinner />

  if (mode == 'add') {
    sideSection =
      <EditingPlaceContext.Provider value={{ formData, setFormData }} >
        <EditingPlace />
      </EditingPlaceContext.Provider>

  } else if (mode == 'info') {
    sideSection = <PlaceInfo infoData={infoData} />
  }

  return (
    <>
      <Menu />
      <Container >
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={8} lg={9}>
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
              {
                mapData.map(data => (
                  <Marker position={[data.lat, data.lng]}
                    icon={placesIcon}
                    eventHandlers={{
                      click: () => {
                        handleMarkerClick(data)
                      }
                    }}>
                    <Tooltip>{data.name}</Tooltip>
                  </Marker>
                ))
              }
              <Marker position={[formData.lat, formData.lng]}
                icon={newPlaceIcon}>
                <Tooltip>你新增的地點</Tooltip>
              </Marker>

            </MapContainer>
          </Col>

          <Col xs={11} md={4} lg={3}>
            <Nav fill
              variant="tabs"
              defaultActiveKey="info"
              onSelect={(selectedKey) => handleSelectTab(selectedKey)}
              className="justify-content-center"
            >
              <Nav.Item>
                <Nav.Link eventKey="info">景點資訊</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="add">新增景點</Nav.Link>
              </Nav.Item>
            </Nav>
            <div className="mb-3"></div>
            {sideSection}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
export default Map

