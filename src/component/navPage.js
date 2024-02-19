import { Box } from "@chakra-ui/react";
import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

const NavPage = () => {
  return (
    <Box>
      <Navbar expand="lg" className="text-white body bg-success">
        <Container>
          <Navbar.Brand
            href="#home"
            className="title text-white"
            style={{ "font-size": "30px", fontFamily: " verdana" }}
          >
            TokGen.in
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto text-white">
              <Nav.Link className="text-white" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="text-white" href="/login">
                Login
              </Nav.Link>
              <Nav.Link className="text-white" href="/signup">
                signup
              </Nav.Link>
              <NavDropdown
                className="text-white"
                title="Foods"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/foodmenu">Food-lists</NavDropdown.Item>
                <NavDropdown.Item href="/addfood">
                  Add-new-foods
                </NavDropdown.Item>
                <NavDropdown.Item href="/manage">
                  Manage Food List
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Box>
  );
};

export default NavPage;
