import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

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
        <Navbar.Brand href="#home">
            <img src="pdftron-icons/pdftron-logo-blue.png" className="d-inline-block align-top ms-5" alt="PDFTron Icon"/>
        </Navbar.Brand>

        {isLoggedin && <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-5" /> }
        {isLoggedin && <Navbar.Collapse id="responsive-navbar-nav" className="me-5">
            <Nav className="ms-auto">
                {isLoggedin && <Nav.Link href="/book">Book</Nav.Link> }
                {isLoggedin && <Nav.Link href="/mybookings">My Bookings</Nav.Link>}

                {isLoggedin && isAdmin && <NavDropdown href="/admindashboard" title="Admin Settings">
                    <NavDropdown.Item href="/usersettings">User Settings</NavDropdown.Item>
                    <NavDropdown.Item href="/allbookings">See All Bookings</NavDropdown.Item>
                    <NavDropdown.Item href="/edit">Edit Map</NavDropdown.Item>
                    </NavDropdown>}
                {isLoggedin && <NavDropdown title={name} align="end" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                </NavDropdown>}
            </Nav>
        </Navbar.Collapse> }
        </Navbar>
    );
};
