
export function Footer() {
  return (
    // <div style={{ marginBottom: '100px' }}>
    //   <p className="mt-5 text-center small">本網站電影資訊及圖片取自 <a href='https://taiwancinema.bamid.gov.tw/'>台灣電影網</a></p>
    // </div>
    <footer
      className="small"
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        padding: '30px',
      }}>
      本網站電影資訊及圖片取自 <a href='https://taiwancinema.bamid.gov.tw/' target="_blank">台灣電影網</a>
    </footer>
  )
}