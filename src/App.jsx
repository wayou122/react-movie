import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Movie from './pages/Movie.jsx'
import Reviews from './pages/Reviews.jsx'
import Movies from './pages/Movies.jsx'
import RankingReviewer from './pages/RankingReviewer.jsx'
import Account from './pages/Account.jsx'
import Login from './pages/Login.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { UserProvider } from './contexts/UserContext.jsx';

function App() {
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

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
