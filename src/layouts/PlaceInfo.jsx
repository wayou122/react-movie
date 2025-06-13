import { useNavigate } from "react-router-dom";

export function PlaceInfo({ infoData }) {
  const navigate = useNavigate()

  return (
    <>
      {infoData?.name ? (
        <div className="card shadow-sm p-3">
          <div className="card-body">
            <h5 className="card-title mb-3">{infoData.name}</h5>
            <p className="mb-3 navigate-link" onClick={() => navigate(`/movie/${infoData.movieId}`)}>
              <strong>電影</strong><span className="text-primary"> {infoData.title}</span>
            </p>
            <p className="mb-3">
              <strong>說明</strong> {infoData.description}
            </p>
            <p><a
              className="text-decoration-none small"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/place/${infoData.lat}+${infoData.lng}`}
            >
              🗺️ 看 Goolge 地圖</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm p-3">
          <div className="text-center text-muted py-5">
            <p>點選景點</p>
            <p>了解更多資訊</p>
          </div>
        </div>
      )}
    </>
  )
}