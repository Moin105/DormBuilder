import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar,Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import './Header.css'
import Cookies from 'js-cookie';
function Header() {
    // const token =  Cookies.get("token");
    const token = useSelector((state) => state.token)

    const role = Cookies.get("role");
  return (
    <>
               <Navbar expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand><Link className='navLogo'>United Dorms</Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navLinks">
                        {!token &&  <Nav.Link className="navLink active"><Link className="navText" to="/">Dashboard</Link></Nav.Link>}   
                        {token  && role == "admin"   &&  <Nav.Link className="navLink active"><Link className="navText" to="/admin-dashboard">Home</Link></Nav.Link>}
                        {token  && role == "student"   &&  <Nav.Link className="navLink active"><Link className="navText" to="/student-dashboard">Home</Link></Nav.Link>}
                            <Nav.Link className="navLink"><Link className="navText" to="/gallery">Gallery</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/">Testimonials</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/">About</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/blogs">Blogs</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/student-dashboard">Profile</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                 {!token ?   <button className='navButton'><Link  to="/login">Login/Signup</Link> </button> :null}
                </Container>
            </Navbar>

    </>
  )
}

export default Header