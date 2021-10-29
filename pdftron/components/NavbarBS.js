import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

export const NavbarBS = ({isLoggedin}) => {

    // should pass in user object ^ as a prop
    // isLoggedin is just a T/F value rn to disable some links on index.js

    // if (user) {
    //     // checks if user is logged in
    //     let name = user.name
    //     let adminPriv = user.admin
    // } 
    let name = "Williard"

    return (

        <Navbar collapseOnSelect expand="lg">
        <Container>
        <Navbar.Brand href="#home">
            <img src="pdftron-icons/pdftron-logo-blue.png" className="d-inline-block align-top" alt="PDFTron Icon"/> 
        </Navbar.Brand>

        {isLoggedin && <Navbar.Toggle aria-controls="responsive-navbar-nav" /> }
        {isLoggedin && <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
                {isLoggedin && <Nav.Link href="/book">Book</Nav.Link> }
                {isLoggedin && <Nav.Link href="#link">My Bookings</Nav.Link>}
                {isLoggedin && <NavDropdown title={name} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/edit">Admin Dashboard</NavDropdown.Item>
                    <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                </NavDropdown>}
            </Nav>
        </Navbar.Collapse> }
        </Container>
        </Navbar>

    );
};