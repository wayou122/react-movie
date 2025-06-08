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
import TestPage from './pages/TestPage.jsx'
import { UserProvider } from './contexts/UserContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import EmailConfirm from './pages/EmailConfirm.jsx';
import { Watchlist } from './pages/Watchlist.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Movies />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/test',
      element: <TestPage />
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
      element: <Watchlist />
    },
    {
      path: '/user/review',
      element: <Reviews />
    }, {
      path: '/reset-password',
      element: <ResetPassword />
    }, {
      path: '/forget-password',
      element: <ForgetPassword />
    }, {
      path: '/email-confirm',
      element: <EmailConfirm />
    }
  ])

  return (
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
