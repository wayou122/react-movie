import Container from 'react-bootstrap/Container';
import { Form, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';

const API = 'http://localhost:8085/tiann'
function Menu() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkLogin()
  }, [])

  async function checkLogin() {
    try {
      const res = await fetch(`${API}/check-login`, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await res.json()
      setIsLogin(resData.data)
    } catch (err) {
      setIsLogin(false)
    }
  }

  async function handleLogout() {
    const res = await fetch(`${API}/logout`, {
      method: 'GET',
      credentials: 'include'
    })
    const resData = await res.json()
    setIsLogin(false)
    alert(resData.message)
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
            {isLogin ? (
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;