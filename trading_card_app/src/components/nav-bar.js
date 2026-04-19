import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import CreateCard from "./create_card";

function AppNavbar() {
  const [seen, setSeen] = useState(false);
  function togglePop() {
    setSeen(!seen);
  }
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/card_page">
            Card Shop
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/card_page">
              Cards For Sale
            </Nav.Link>
            <Nav.Link as={Link} to="/my_cards">
              My Cards
            </Nav.Link>
            <Nav.Link onClick={togglePop} style={{ cursor: "pointer" }}>
               Post a Card For Sale
          </Nav.Link>
          {seen ? <CreateCard toggle={togglePop} /> : null}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default AppNavbar;
