import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'

const NavPage = () => {
    return (
        <Navbar expand="lg" className="body bg-success">
            <Container>
                <Navbar.Brand href="#home" className='title text-dark'
                    style={{ "font-size": "30px", "fontFamily": " verdana" }}>TokGen.in</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">signup</Nav.Link>
                        <NavDropdown title="Foods" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/addfood">Add-new-foods</NavDropdown.Item>
                            <NavDropdown.Item href="/editfood">
                                Edit-foods
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/foodmenu">Food-lists</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Delete-foods
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavPage