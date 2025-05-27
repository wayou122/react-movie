
function MovieBanner() {
  const movieData = useContext(MovieContext)
  const bannerUrl = movieData.bannerUrl
  //const bannerUrl = 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/11663.jpg?202505051419035691034'
  return (
    <div >
      <img src={bannerUrl} className='movie-banner' />
    </div>
  )
}
export default MovieBanner