import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 處理 marker 的 icon 不顯示問題
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

// 這個元件用來監聽地圖被點擊的事件
const MapClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng); // 把座標傳給主程式
    },
  });
  return null; // 不顯示任何東西
};

const TestMapPage = () => {
  const [markers, setMarkers] = useState([]); // 用來存使用者新增的地點
  const [form, setForm] = useState({ name: '', description: '' }); // 表單資料
  const [clickPosition, setClickPosition] = useState(null); // 使用者點擊的位置

  // 處理使用者點擊地圖
  const handleMapClick = (latlng) => {
    setClickPosition(latlng); // 存下位置，顯示表單
  };

  // 當按下儲存按鈕時
  const handleSave = (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert('請輸入地點名稱');

    // 加入新的 marker
    setMarkers([...markers, { ...form, position: clickPosition }]);

    // 清空表單與點擊位置
    setForm({ name: '', description: '' });
    setClickPosition(null);
  };

  return (
    <div>
      <h2>互動地圖（點擊新增地點）</h2>

      <MapContainer
        center={[25.033964, 121.564468]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
      >
        {/* 現代灰色底圖 */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

        {/* 監聽地圖點擊事件 */}
        <MapClickHandler onClick={handleMapClick} />

        {/* 顯示所有標記 */}
        {markers.map((m, i) => (
          <Marker key={i} position={m.position}>
            <Popup>
              <strong>{m.name}</strong><br />
              {m.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 點擊地圖後才會顯示的輸入表單 */}
      {clickPosition && (
        <div style={{ marginTop: '20px', background: '#eee', padding: '10px', borderRadius: '5px' }}>
          <h4>新增地點</h4>
          <form onSubmit={handleSave}>
            <div>
              <label>地點名稱：</label><br />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label>描述：</label><br />
              <textarea
                rows="2"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>儲存地點</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestMapPage;
