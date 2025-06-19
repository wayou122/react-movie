import { useNavigate } from "react-router-dom";

export function PlaceInfo({ infoData, noSpot }) {
  const navigate = useNavigate()

  return (
    <>
      {infoData?.name ? (
        <div className="card p-2">
          <div className="card-body">
            <h5 className="card-title mb-2">{infoData.name}</h5>
            <p className="mb-2 navigate-link" onClick={() => navigate(`/movie/${infoData.movieId}`)}>
              🎬<span className="text-primary"> {infoData.title}</span>
            </p>
            <p className="mb-2">
              {infoData.description}
            </p>
            <p className="mb-1">
              <a
                className="text-decoration-none small"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/${infoData.name}/@${infoData.lat},${infoData.lng}`}
              >
                🗺️ 看 Goolge 地圖</a>
            </p>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm p-3">
          <div className="text-center text-muted py-5">
            {
              noSpot ?
                <p>此電影沒有景點</p>
                :
                <>
                  <p>點選景點</p>
                  <p>了解更多資訊</p>
                </>
            }
          </div>
        </div>
      )}
    </>
  )
}