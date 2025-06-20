import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Menu from '../layouts/Menu';
import CreatableSelect from 'react-select/creatable';
import ReactMarkdown from 'react-markdown';
import { AIrecommendAPI, findMovieByTitleAPI } from '../api/api';
import { MovieProvider } from '../contexts/MovieContext';
import MovieCard from '../layouts/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

function Recommend() {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [responseText, setResponseText] = useState('')
  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(false)

  const options = [
    { value: '動作', label: '動作片' },
    { value: '劇情', label: '劇情片' },
    { value: '紀錄', label: '紀錄片' },
    { value: '鬼', label: '鬼片' },
    { value: '開心', label: '開心' },
    { value: '感動', label: '感動' },
    { value: '悲傷', label: '悲傷' },
    { value: '有趣', label: '有趣' },
  ]

  const maxKeywords = 3; // 最多選擇三個關鍵字

  function handleChange(selected) {
    setSelectedOptions(selected)
  }

  // 處理送出按鈕
  async function handleSubmit() {
    setResponseText('')
    if (selectedOptions.length < 1) return
    setLoading(true)
    setMovieData(null)

    const selectedValues = selectedOptions.map(option =>
      'keywords=' + encodeURIComponent(option.value)).join('&')

    let fullText = ''
    const eventSource = new EventSource(AIrecommendAPI(selectedValues))
    eventSource.onmessage = (e) => {
      if (e.data === '[[END]]') {
        eventSource.close()
        findMovie(fullText)
      } else {
        fullText += e.data
        setResponseText(prev => prev + e.data)
      }
    }

    eventSource.onerror = (err) => {
      console.error('SSE Error', err)
      eventSource.close()
    }

  };

  async function findMovie(fullText) {
    const movieTitle1 = fullText.slice(fullText.indexOf('《') + 1, fullText.indexOf('》'))

    try {
      const res = await fetch(findMovieByTitleAPI(movieTitle1))
      const resData = await res.json()
      if (resData.code === 200) {
        setMovieData(resData.data)
      } else {
        setMovieData(null)
      }
    } catch (err) {
      console.error(err.message)
      setMovieData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Menu />
      <Container>
        <h2 className="text-center mb-4">🎬 想看什麼電影?</h2>
        <Row className='d-flex justify-content-center mb-3'>
          <Col xs={12} sm={10} md={7} lg={6}>
            <Card className="p-4 shadow-sm">
              <p>請輸入或選擇關鍵字 ( 1 ~ {maxKeywords} 個)</p>
              <CreatableSelect
                isMulti
                placeholder={'你的關鍵字'}
                options={options}
                isOptionDisabled={() => selectedOptions.length >= 3}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"
              />
              <button type="button"
                className="btn btn-sm btn-primary mt-3"
                onClick={handleSubmit}
                disabled={selectedOptions < 1 || loading}>
                請 AI 推薦電影！
              </button>
            </Card>
          </Col>
        </Row>
        {loading && <LoadingSpinner />}
        {
          responseText ?
            (
              <Row className='justify-content-center mb-4'>
                <Col xs={12} sm={10} md={7} lg={6}  >
                  <Card className='p-3'>
                    <p className='text-center mt-3 fw-bold'>AI 推薦電影</p>
                    <ReactMarkdown>{responseText}</ReactMarkdown>
                    <p className='text-center small text-secondary'>AI 資訊可能可能有誤，請注意正確性</p>

                    {
                      !loading && movieData ?
                        (
                          <MovieProvider value={{ movieData, loading, link: true }}>
                            <Card className="mb-1" >
                              <MovieCard />
                            </Card>
                          </MovieProvider>
                        ) : (''
                        )
                    }
                  </Card>
                </Col>
              </Row>

            ) :
            ''
        }

      </Container>
    </>
  )
}

export default Recommend;