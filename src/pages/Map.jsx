import Menu from "../layouts/Menu"
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import { Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import { createContext, useState, useEffect, useRef } from "react";
import EditingPlace from "../layouts/EditingPlace";
import { Footer } from "../layouts/Footer";
import { PlaceInfo } from "../layouts/PlaceInfo";
import L from "leaflet";
import { Icon } from "leaflet";

import addIcon from "../assets/add_circle_24dp_EE5555_FILL0_wght400_GRAD0_opsz24.svg"
import starIcon from "../assets/stars_24dp_5555CC_FILL0_wght400_GRAD0_opsz24.svg"
import { useSpotData } from "../hooks/useSpotData";
import Select from "react-select";
import { useMovieTitleData } from "../hooks/useMovieTitleData";
import { useParams } from "react-router-dom";

export const EditingPlaceContext = createContext()

function Map() {
  const { spotData, loading, refetch } = useSpotData()
  const { movieTitleData } = useMovieTitleData()
  const { id } = useParams()

  const [activeTab, setActiveTab] = useState('info')
  const [formData, setFormData] = useState({ lat: '', lng: '', spotName: '', movieId: '', description: '' })
  const [infoData, setInfoData] = useState({ lat: '', lng: '', name: '', title: '', description: '' })
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [filteredSpots, setFilteredSpots] = useState([])
  const prevFilteredSpotsRef = useRef([])
  const [optionInputValue, setOptionInputValue] = useState('');

  useEffect(() => {
    if (id && options?.length > 0) {
      const defaultOption = options.find(o => o.value == id)
      setSelectedMovie(defaultOption)
    }
  }, [movieTitleData])

  useEffect(() => {
    if (!loading && spotData) {
      setFilteredSpots(spotData);
    }
  }, [spotData, loading])

  useEffect(() => {
    if (selectedMovie) {
      setFilteredSpots(spotData.filter(data => data.movieId == selectedMovie.value))
    } else {
      setFilteredSpots(spotData)
    }
  }, [spotData, selectedMovie])

  const options = movieTitleData?.map(data => ({
    value: data.movieId,
    label: data.title,
  }))

  const newPlaceIcon = new Icon({
    iconUrl: addIcon,
    iconSize: [24, 24],
  })

  const placesIcon = new Icon({
    iconUrl: starIcon,
    iconSize: [24, 24],
  })

  // 點擊地圖
  function ListenClick() {
    if (activeTab == 'add') {
      useMapEvents({
        click(e) {
          setFormData(prev => ({
            ...prev, lat: e.latlng.lat, lng: e.latlng.lng
          }))
        }
      })
      return null
    }
  }

  // 設定標籤
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
      lat: data.lat,
      lng: data.lng,
      movieId: data.movieId,
      name: data.spotName,
      title: data.movieTitle,
      description: data.description
    })
  }

  // 選項篩選器
  function getSortedOptions(input) {
    if (!input) return options;

    const filtered = options
      .filter(opt => opt.label.includes(input))
      .sort((a, b) => {
        const aIndex = a.label.indexOf(input);
        const bIndex = b.label.indexOf(input);
        if (aIndex === bIndex) return 0;
        if (aIndex === 0) return -1; // a 前綴
        if (bIndex === 0) return 1;  // b 前綴
        return aIndex - bIndex;      // 否則比較位置
      });

    return filtered;
  };

  function handleSelectChange(option) {
    setSelectedMovie(option);
  }

  function MapController() {
    const map = useMap()

    useEffect(() => {
      // 如果篩選景點與之前不同才重新縮放地圖，否則只要點選地圖就會重新縮放
      if (JSON.stringify(filteredSpots) === JSON.stringify(prevFilteredSpotsRef.current)) {
        return
      }
      const locations = filteredSpots.map(s => ([s.lat, s.lng]))
      if (locations.length > 0) {
        const bounds = L.latLngBounds(locations)
        map.fitBounds(bounds, {
          padding: [50, 50], // 避免點太靠邊界
          animate: true,
        })
        prevFilteredSpotsRef.current = filteredSpots
      }
    }, [filteredSpots, map])

    return null
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
              <ListenClick />
              <MapController />
              {
                !loading && filteredSpots.map(data => (
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
                <Form.Group className="mb-3" controlId="form">
                  <Select
                    options={getSortedOptions(optionInputValue)}
                    value={selectedMovie}
                    onInputChange={(value) => setOptionInputValue(value)}
                    onChange={handleSelectChange}
                    isSearchable
                    isClearable
                    placeholder="搜尋或選擇電影..."
                    noOptionsMessage={() => "找不到符合的電影"}
                  />
                </Form.Group>
                <div className="mb-3 d-flex gap-1">
                  <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill"
                    onClick={() => handleSelectChange({
                      label: "陽光普照",
                      value: "282"
                    })}>陽光普照</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill"
                    onClick={() => handleSelectChange({
                      label: "等一個人咖啡",
                      value: "522"
                    })}>等一個人咖啡</button>
                </div>
                <PlaceInfo infoData={infoData} noSpot={filteredSpots.length == 0} />
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

