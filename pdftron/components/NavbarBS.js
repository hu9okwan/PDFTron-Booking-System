import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { signOut } from "next-auth/react"
import { useSession } from 'next-auth/react';
import {isAdmin as getAdminPriv } from "../database/databaseCRUD"
import {useState , useEffect} from 'react';

export const NavbarBS = () => {
    const { data: session } = useSession()

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [name, setName] = useState("")
    
    useEffect(() => {    
        let active = true;
        load()
        return () => { active = false }
    
        async function load() {
            if (session) {
                setIsLoggedin(true)
                setName(session.user.name)
                const res = await Promise.resolve(getAdminPriv(session.user.email));
                if (!active) { return }
                setIsAdmin(res);
            }
        }
    }, [])


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
