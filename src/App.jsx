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
import ForgetPassword from './pages/ForgetPassword.jsx';
import EmailConfirm from './pages/EmailConfirm.jsx';
import { Watchlist } from './pages/Watchlist.jsx';
import Chat from './pages/Chat.jsx';
import ChatRoom from './pages/ChatRoom.jsx';
import Reviewer from './pages/Reviewer.jsx';
import Map from './pages/Map.jsx';
import Recommend from './pages/Recommend.jsx';

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
      element: <Movies />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/movie/:id',
      element: <Movie />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/review',
      element: <Reviews />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/map',
      element: <Map />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/map/:id',
      element: <Map />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/reviewer/:reviewerName',
      element: <Reviewer />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/reviewer',
      element: <RankingReviewer />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/recommend',
      element: <Recommend />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/user/account',
      element: <Account />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/user/watchlist',
      element: <Watchlist />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/user/review',
      element: <Reviews />,
      errorElement: <NotFoundPage />,
    }, {
      path: '/forget-password',
      element: <ForgetPassword />,
      errorElement: <NotFoundPage />,
    }, {
      path: '/email-confirm',
      element: <EmailConfirm />,
      errorElement: <NotFoundPage />,
    }, {
      path: '/chat',
      element: <Chat />,
      errorElement: <NotFoundPage />,
    },
    {
      path: '/chat/chatRoom/:roomName',
      element: <ChatRoom />,
      errorElement: <NotFoundPage />,
    },
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
