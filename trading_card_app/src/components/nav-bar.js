import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to = "/card_page">Card Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to= "/card_page">Cards For Sale</Nav.Link>
            <Nav.Link as={Link} to= "/my_cards">My Cards</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;