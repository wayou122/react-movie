import { useState, useEffect, createContext } from "react"
import Menu from "../layouts/Menu"
import Searchbar from "../components/Searchbar"
import MoviesFilter from '../components/MoviesFilter'
import MovieCard from "../layouts/MovieCard"
import { Container, Row, Col, Card } from 'react-bootstrap'
import { movieAPI, watchlistAPI } from "../api/api"
import { MovieContext } from "../contexts/MovieContext"
import { useLocation } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"

export const MoviesFilterContext = createContext()

function Movies() {
  const [moviesData, setMoviesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [moviesFilter, setMoviesFilter]
    = useState({ sort: '最新上映', type: '全部類型', watchlist: false })

  const location = useLocation()
  const isWatchlist = location.pathname.includes('watchlist')

  useEffect(() => {
    setLoading(true)
    fetchMovieData()
    //setMoviesData(testMovieData)
  }, [moviesFilter, isWatchlist])

  function testMovieData() {
    const movieData = [{
      movieId: 5,
      title: '一家子兒咕咕叫',
      director: '魏德聖'
      , actor: '李安平、游採安、朱裕鈞、王彩英、陳淑貞、張志華、黃芳宜'
      , releaseDate: '2022/02/19'
      , genre: '劇情片'
      , length: 120
      , posterUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354'
      , bannerUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/11663.jpg?202505051419035691034'
      , score: 4
      , reviewCount: 3
      , bookmark: true
    }, {
      movieId: 10,
      title: '海角七號',
      director: '王小棣'
      , actor: '王彩英、陳淑貞、張志華、黃芳宜'
      , releaseDate: '2023/06/31'
      , genre: '紀錄片'
      , length: 98
      , posterUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/t_93359.jpg?v=202505051034265221354'
      , bannerUrl: 'https://taiwancinema.bamid.gov.tw/ImageData/60/2025/93359/11663.jpg?202505051419035691034'
      , score: 5
      , reviewCount: 3
      , bookmark: false
    }]
    return movieData.sort((a, b) => moviesFilter.sort == '評價最高' ? b.score - a.score : a.score - b.score)
      .filter(a => a.genre == moviesFilter.type)
  }

  async function fetchMovieData() {
    const API = isWatchlist ? watchlistAPI : movieAPI
    try {
      const res = await fetch(API, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(moviesFilter)
      })
      //const res = await fetch(API, { method: 'GET' })
      const resData = await res.json()
      if (res.ok && resData.code == 200) {
        setMoviesData(resData.data)
      } else {
        console.error('載入失敗: ' + resData.message)
      }
    } catch (err) {
      console.error('載入錯誤: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      <Menu />
      <Container>
        <Searchbar />
        <h2 className="h2-title">電影列表</h2>
        <Row className='justify-content-center'>
          <Col xs={12} sm={9} lg={6}>
            <MoviesFilterContext.Provider value={[moviesFilter, setMoviesFilter]}>
              <MoviesFilter />
            </MoviesFilterContext.Provider >
          </Col>
        </Row>
        {moviesData ? moviesData.map((movieData) => (
          <MovieContext.Provider
            key={movieData.movieId}
            value={{ movieData, loading }}>
            <Row className='justify-content-center'>
              <Col xs={12} sm={9} lg={6}>
                <Card className="mb-1" >
                  <MovieCard />
                </Card>
              </Col>
            </Row>
          </MovieContext.Provider>
        )) : (
          <div>無符合電影</div>
        )}
      </Container>
    </>
  )
}
export default Movies