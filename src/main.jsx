import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Account from './pages/Account.jsx'
import Reviews from './pages/Reviews.jsx'
import Movies from './pages/Movies.jsx'
import Movie from './pages/Movie.jsx'
import RankingReviewer from './pages/RankingReviewer.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Movies />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/movie',
    element: <Movies />
  },
  {
    path: '/movie/:id',
    element: <Movie />
  },
  {
    path: '/review',
    element: <Reviews />
  },
  {
    path: '/reviewer',
    element: <RankingReviewer />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/user/account',
    element: <Account />
  },
  {
    path: '/user/watchlist',
    element: <Movies />
  },
  {
    path: '/user/review',
    element: <Reviews />
  },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
