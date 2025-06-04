import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { checkLoginAPI, logoutAPI } from '../api/api';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';

function Menu() {
  const navigate = useNavigate()
  //const [isLogin, setIsLogin] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const { isDarkMode, toggleColorMode } = useContext(ThemeContext)

  // useEffect(() => {
  //   checkLogin()
  // }, [])

  // async function checkLogin() {
  //   try {
  //     const res = await fetch(checkLoginAPI, {
  //       method: 'GET',
  //       credentials: 'include'
  //     })
  //     const resData = await res.json()
  //     setIsLogin(resData.data)
  //   } catch (err) {
  //     setIsLogin(false)
  //   }
  // }

  async function handleLogout() {
    try {
      await fetch(logoutAPI, {
        method: 'GET',
        credentials: 'include'
      })
    } catch (err) {
      console.error('登出錯誤: ' + err.message)
    } finally {
      setUser(null)
      navigate("/")
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary mb-3">
        <Container>
          <div className="d-flex justify-content-start align-items-center">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className='me-3' />
            <Navbar.Brand as={Link} to='/'>鼎電影</Navbar.Brand>
          </div>
          <Navbar.Collapse id="responsive-navbar-nav" className='p-2'>
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/movie'>電影</Nav.Link>
              <Nav.Link as={Link} to='/review'>影評</Nav.Link>
              <Nav.Link as={Link} to='/reviewer'>影評人</Nav.Link>
            </Nav>
            {user ? (
              <Nav>
                <Nav.Link as={Link} to='/user/watchlist' >
                  <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined me-1">bookmark</span>
                    <span>收藏</span>
                  </div>
                </Nav.Link>
                <Nav.Link as={Link} to='/user/account' >
                  <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined me-1">account_circle</span>
                    <span>帳戶</span>
                  </div>
                </Nav.Link>
                <Nav.Link onClick={handleLogout} >
                  <div className="d-flex align-items-center">
                    {/* <span className="material-symbols-outlined me-1">account_circle</span> */}
                    <span>登出</span>
                  </div>
                </Nav.Link>
              </Nav>
            ) : (<Nav>
              <Nav.Link as={Link} to='/login'>
                <div className="d-flex align-items-center">
                  <span className="material-symbols-outlined me-1">account_circle</span>
                  <span>登入｜註冊</span>
                </div>
              </Nav.Link>
            </Nav>
            )}
            <Nav>
              <Nav.Link onClick={toggleColorMode} as={Link}>
                <div className="d-flex align-items-center">
                  <span className="material-symbols-outlined me-1 fs-5">{isDarkMode ? 'dark_mode' : 'light_mode'}</span>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;