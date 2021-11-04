import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

export const NavbarBS = ({isLoggedin}) => {

    // should pass in user object ^ as a prop
    // isLoggedin is just a T/F value rn to disable some links on index.js

    //default values
    let name = "Profile" 
    let isAdmin = false
    // if (user) {
    //     // checks if user is logged in and their role
    //     let name = user.name
    //     let isAdmin = user.admin
    // }

    // placeholder tests
    name = "Williard"
    isAdmin = true

    return (

        <Navbar collapseOnSelect expand="lg">
        <Container style={{justifyContent: "space-between"}}>
        <Navbar.Brand href="#home">
            <img src="pdftron-icons/pdftron-logo-blue.png" className="d-inline-block align-top" alt="PDFTron Icon"/>
        </Navbar.Brand>

        {isLoggedin && <Navbar.Toggle aria-controls="responsive-navbar-nav" /> }
        {isLoggedin && <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
                {isLoggedin && <Nav.Link href="/book">Book</Nav.Link> }
                {isLoggedin && <Nav.Link href="/mybookings">My Bookings</Nav.Link>}
                {isLoggedin && <Nav.Link href="/usersettings">User Settings</Nav.Link>}
                {isLoggedin && <Nav.Link href="/allbookings">See All Bookings</Nav.Link>}
                {isLoggedin && isAdmin && <Nav.Link href="/admindashboard">Admin Dashboard</Nav.Link>}
                {isLoggedin && <NavDropdown title={name} id="basic-nav-dropdown">
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
