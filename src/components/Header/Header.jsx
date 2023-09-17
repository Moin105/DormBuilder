import React from 'react'
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar,Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useLocation ,useNavigate} from 'react-router-dom';
import logouts from '../UserDashboard/assets/logout.png'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import './Header.css'
import Cookies from 'js-cookie';
function Header() {
    // const token =  Cookies.get("token");
    const token = useSelector((state) => state.token)
    const location = useLocation();
    const navigate = useNavigate();
   const role = useSelector((state) => state.role)
       const dispatch = useDispatch();
    const handleLogout = () => {
        // Clear auth state in Redux
        dispatch(logout());
      };
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
        return (
    <>
               <Navbar expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand><Link className='navLogo' to="/"> Uni<span style={{color:"black"}}>-Hive</span> </Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navLinks" style={{marginRight:"0px !important"}}>
                        {!token &&  <Nav.Link className={location.pathname === "/" ? "navLink active": "navLink"}><Link className="navText" to="/">Home</Link></Nav.Link>}   
                        {token  && role == "admin"   &&  <Nav.Link className={location.pathname === "/" ? "navLink active": "navLink"}><Link className="navText" to="/">Home</Link></Nav.Link>}
                        {token  && role == "student"   &&  <Nav.Link className={location.pathname === "/" ? "navLink active": "navLink"}><Link className="navText" to="/">Home</Link></Nav.Link>}
                            <Nav.Link className={location.pathname === "/dorm" ? "navLink active": "navLink" }><Link className="navText" to="/dorm">Dorms</Link></Nav.Link>
                            <Nav.Link className={location.pathname === "/faqs" ? "navLink active": "navLink" }><Link className="navText" to="/faqs">FAQs</Link></Nav.Link>
                            <Nav.Link className={location.pathname === "/about" ? "navLink active": "navLink" }><Link className="navText" to="/about">About</Link></Nav.Link>
                            <Nav.Link className={location.pathname === "/blogs" ? "navLink active": "navLink" }><Link className="navText" to="/blogs">Blogs</Link></Nav.Link> 
                            <Nav.Link className={location.pathname === "/study-in-cyprus" ? "navLink active": "navLink" }><Link className="navText" to="/study-in-cyprus">Study in Cyprus</Link></Nav.Link> 
                          
                            {/* admin/dashboard */}
                        {token  && role == "admin"   &&  <Nav.Link className={location.pathname === "/admin/dashboard" ? "navLink active": "navLink"}><Link className="navText" to="/admin/dashboard">Profile</Link></Nav.Link>}
                        {token  && role == "student"   &&  <Nav.Link className={location.pathname === "/student-dashboard" ? "navLink active": "navLink"}><Link className="navText" to="/student-dashboard">Profile</Link></Nav.Link>}
                        
                            {/* <Nav.Link className={"navLink"}><Link className="navText" to="/student-dashboard">Profile</Link></Nav.Link> */}
                 {!token ?  <Nav.Link className={location.pathname == ("/login"|| "/register") ? "active navLink":"navLink"}><Link  to="/login" className="navText">Login/Signup</Link></Nav.Link>  :
                <div className="logoutButton" style={{transform:" translateY(0rem) rotate(180deg)",width:"40px"}} onClick={()=>{handleLogout();handleRouteChange("/")}}>
                    <img src={logouts} alt="" />
                </div>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    </>
  )
}

export default Header