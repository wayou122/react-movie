import { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Register from './pages/Register.jsx'
import Test from './pages/test.jsx'
import Menu from './layouts/Menu.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewMovieCard from './layouts/ReviewMovieCard.jsx'
import WriteReview from './layouts/WriteReview.jsx'
import Review from './layouts/Review.jsx'
import MovieCard from './layouts/MovieCard.jsx'
import MovieCardSmall from './layouts/MovieCardSmall.jsx'
import SortButton from './components/SortButton.jsx'
import Searchbar from './components/Searchbar.jsx'
import Movie from './pages/Movie.jsx'
import Reviews from './pages/Reviews.jsx'
import Movies from './pages/Movies.jsx'
import RankingReviewer from './pages/RankingReviewer.jsx'
import Account from './pages/Account.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
    <>
      <Login />
    </>
  )
}

export default App
