import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react';

export const NavbarBS = ({isLoggedin, username}) => {
    const { data: session } = useSession()

    // should pass in user object ^ as a prop
    // isLoggedin is just a T/F value rn to disable some links on index.js

    //default values
    let isAdmin = false
    // if (user) {
    //     // checks if user is logged in and their role
    //     let name = user.name
    //     let isAdmin = user.admin
    // }


    // placeholder tests
    let name = username
    if (session) {
        isAdmin = session.user.adminpriv
    }

    return (

        <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="/">
            <img src="pdftron-icons/pdftron-logo-blue.png" className="d-inline-block align-top ms-5" alt="PDFTron Icon"/>
        </Navbar.Brand>
        {isLoggedin && <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-5" /> }
        {isLoggedin && <Navbar.Collapse id="responsive-navbar-nav" className="me-5">
            <Nav className="ms-auto">
                {isLoggedin && <Nav.Link href="/book">Book</Nav.Link> }
                {isLoggedin && <Nav.Link href="/my-bookings">My Bookings</Nav.Link>}

                {isLoggedin && isAdmin && <NavDropdown href="/admindashboard" title="Admin Settings">
                    <NavDropdown.Item href="/user-settings">User Settings</NavDropdown.Item>
                    <NavDropdown.Item href="/all-bookings">See All Bookings</NavDropdown.Item>
                    <NavDropdown.Item href="/edit">Edit Map</NavDropdown.Item>
                    </NavDropdown>}
                {isLoggedin && <NavDropdown title={name} align="end" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}>Logout</NavDropdown.Item>
                </NavDropdown>}
            </Nav>
        </Navbar.Collapse> }
        </Navbar>
    );
};
