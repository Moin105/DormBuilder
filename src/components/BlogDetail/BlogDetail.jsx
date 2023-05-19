import React ,{useEffect,useState}from 'react';
import './BlogDetail.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link,useLocation } from 'react-router-dom'
import why4 from './assets/why4.jpg';
import Footer from '../utils/Footer/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
const BlogDetail = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [blogData,setBlogData] = useState(null)
    const [toggleButton, setToggleButton] = useState('hide')
//    const token = localStorage.getItem("token")
const token = useSelector((state) => state.token);
    // const handleButton = () => {
    //     console.log('as');
    //     setToggleButton('show')
    // }
    const getUser = async (id) => {
        try {
          // Make a POST request with axios
          const response = await axios.post(
            "http://backend.uni-hive.net/api/get_specific_blog",
            {
                blog_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          console.log("wert", response.data.blog);
          setBlogData(response.data.blog)

    
        } catch (error) {
          console.error("Failed to update student:", error);
        }
      };
    useEffect(() => {
        getUser(data);
     console.log(data)

    }, [])
    return (
        <>
            {/* NAVBAR */}
            <Navbar expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand><Link className='navLogo'>United Dorms</Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto navLinks">
                            <Nav.Link className="navLink "><Link className="navText" to="/">Home</Link></Nav.Link>

                            <Nav.Link className="navLink"><Link className="navText" to="/gallery">Gallery</Link></Nav.Link>

                            <Nav.Link className="navLink"><Link className="navText" to="/">Testimonials</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/">About</Link></Nav.Link>
                            <Nav.Link className="navLink active"><Link className="navText" to="/blogs">Blogs</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/student-dashboard">Profile</Link></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            {/* BLOG DETAIL MAIN */}
            <section className="blogDetailMain" style={{ position: 'relative', backgroundImage: `linear-gradient(to bottom, #ffffff84 , #ffffff41) ,url(${why4})`, height: "60vh", backgroundRepeat: "no-repeat", width: "100%", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="blogDetailMainTitle">
                        <h1>{blogData?.title}</h1>
                    </div>
                </div>
            </section>

            {/* BLOG DETAIL */}
            <section className="blogDetail mt-5">

                <div className="container">
                    {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta atque voluptatum autem ut maiores. Officiis reiciendis quas accusamus similique aliquam, laborum voluptatum repudiandae illo fugiat aperiam unde labore nisi quasi!</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p> */}
                    <div className="blogSecondImage">
                        <img src={`http://backend.uni-hive.net/storage/${blogData?.featured_image_url}`} width="100%" height="400px" alt="blogSecondImage" />
                    </div>
<br></br>
                   <p>
                     {blogData?.body}
                    </p>
                    <br />
                    {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta atque voluptatum autem ut maiores. Officiis reiciendis quas accusamus similique aliquam, laborum voluptatum repudiandae illo fugiat aperiam unde labore nisi quasi!</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p> */}

                </div>



            </section>




            {/* FOOTER */}
            <Footer />
        </>
    )
}

export default BlogDetail