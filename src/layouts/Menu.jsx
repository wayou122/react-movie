import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { getLogout } from '../services/LoginRegisterService';

function Menu() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const { isDarkMode, toggleColorMode } = useContext(ThemeContext)

  async function handleLogout() {
    try {
      await getLogout()
    } catch (err) {
      console.error(err.message)
    } finally {
      setUser(null)
      navigate("/")
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="sm" className="bg-body-tertiary mb-3 menu">
        <Container>
          <div className="d-flex justify-content-start align-items-center">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className='me-3' />
            <Navbar.Brand as={Link} to='/'>鼎電影</Navbar.Brand>
          </div>
          <Navbar.Collapse id="responsive-navbar-nav" className='p-2'>
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/movie'>電影</Nav.Link>
              <Nav.Link as={Link} to='/review'>影評</Nav.Link>
              {/* <Nav.Link as={Link} to='/reviewer'>影評人</Nav.Link> */}
              <Nav.Link as={Link} to='/chat'>聊聊</Nav.Link>
              <Nav.Link as={Link} to='/map'>地圖</Nav.Link>
            </Nav>
            {user ? (
              <Nav>
                <Nav.Link as={Link} to={`/reviewer/${user.username}`} >
                  <div className="d-flex align-items-center">
                    <span>我的影評</span>
                  </div>
                </Nav.Link>
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