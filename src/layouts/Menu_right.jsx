import Container from 'react-bootstrap/Container';
import { Form, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap'

function Menu() {
  const expand = "md";
  return (
    <>
      <Navbar expand={expand} className="bg-body-tertiary mb-3">
        <Container >
          <div className="d-flex justify-content-start align-items-center">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="me-3" />
            <Navbar.Brand href="#">電影評</Navbar.Brand>
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
            style={{ width: "200px" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>

              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 gap-3">
                <Nav.Link href="#action2">
                  <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined me-2">movie</span>
                    <span>電影</span>
                  </div>
                </Nav.Link>

                <Nav.Link href="#action2">
                  <div className="d-flex align-items-center">
                    <span className="material-symbols-outlined me-2">rate_review </span>
                    <span>影評</span>
                  </div>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <Button variant="outline-secondary">登入</Button>
        </Container>
      </Navbar>
    </>
  );
}

export default Menu;