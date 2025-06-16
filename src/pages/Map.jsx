import Menu from "../layouts/Menu"
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { createContext, useState, useEffect } from "react";
import EditingPlace from "../layouts/EditingPlace";
import { Footer } from "../layouts/Footer";
import { PlaceInfo } from "../layouts/PlaceInfo";
import { Icon, L } from "leaflet";
import addIcon from "../assets/add_circle_24dp_EE5555_FILL0_wght400_GRAD0_opsz24.svg"
import starIcon from "../assets/stars_24dp_5555CC_FILL0_wght400_GRAD0_opsz24.svg"
import { useSpotData } from "../hooks/useSpotData";
import LoadingSpinner from "../components/LoadingSpinner";

export const EditingPlaceContext = createContext()

function Map() {
  const { spotData, loading, refetch } = useSpotData()
  const [activeTab, setActiveTab] = useState('info')
  const [formData, setFormData] = useState({ lat: '', lng: '', spotName: '', movieId: '', description: '' })
  const [infoData, setInfoData] = useState({ lat: '', lng: '', name: '', title: '', description: '' })

  const newPlaceIcon = new Icon({
    iconUrl: addIcon,
    iconSize: [24, 24],
  })

  const placesIcon = new Icon({
    iconUrl: starIcon,
    iconSize: [24, 24],
  })

  function ListenClick({ onMapClick }) {
    if (activeTab == 'add') {
      useMapEvents({
        click(e) {
          onMapClick(e.latlng)
        }
      })
      return null
    }
  }

  function handleClick(latlng) {
    console.log(latlng);

    setFormData(prev => ({
      ...prev, lat: latlng.lat, lng: latlng.lng
    }))
  }

  function handleSelectTab(selectedKey) {
    if (selectedKey == 'info') {
      setActiveTab('info')
    } else if (selectedKey == 'add') {
      setActiveTab('add')
    }
  }

  function handleMarkerClick(data) {
    setActiveTab('info')
    setInfoData({
      lat: data.lat, lng: data.lng,
      movieId: data.movieId,
      name: data.spotName,
      title: data.movieTitle,
      description: data.description
    })

  }

  // loading寫在下面是為了讓marker刷新時地圖不要重新渲染

  return (
    <>
      <Menu />
      <Container >
        <Row className="d-flex justify-content-center">
          <Col xs={12} md={8} lg={9}>
            <MapContainer
              center={[25.0, 121.56]}
              zoom={13}
              style={{ height: '500px', width: '100%' }}>
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png' />
              <ListenClick onMapClick={handleClick} />
              {
                !loading && spotData.map(data => (
                  <Marker position={[data.lat, data.lng]}
                    icon={placesIcon}
                    eventHandlers={{
                      click: () => {
                        handleMarkerClick(data)
                      }
                    }}
                    key={data.spotId}>
                    <Tooltip>{data.spotName}</Tooltip>
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
            <Tabs
              fill
              activeKey={activeTab}
              id="fill-tab-example"
              onSelect={(selectedKey) => handleSelectTab(selectedKey)}
              className="justify-content-center"
            >
              <Tab eventKey="info" title='景點資訊'>
                <div className="mb-3" />
                <PlaceInfo infoData={infoData} />
              </Tab>
              <Tab eventKey="add" title='新增景點'>
                <div className="mb-3" />
                <EditingPlaceContext.Provider value={{ formData, setFormData, refetch }} >
                  <EditingPlace />
                </EditingPlaceContext.Provider>
              </Tab>

            </Tabs>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
export default Map

