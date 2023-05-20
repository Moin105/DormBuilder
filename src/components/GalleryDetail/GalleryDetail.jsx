import React, { useEffect, useState } from 'react';
import './GalleryDetail.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link,useLocation } from 'react-router-dom';
import Footer from '../utils/Footer/Footer';
import axios from 'axios';
import whatsapp from './assets/whatsapp.png'
import { useSelector } from 'react-redux';
import AddReview from '../Admin/AddDorm/AddReview';

const GalleryDetail = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [dormData,setDormData] = useState(null)
    const user = useSelector((state) => state.user);
    const [toggleButton, setToggleButton] = useState('hide')
//    const token = localStorage.getItem("token")
   const token = useSelector((state) => state.token);
    const handleButton = () => {
        console.log('as');
        setToggleButton('show')
    }
    const getUser = async (id) => {
        try {
          // Make a POST request with axios
          const response = await axios.post(
            "http://backend.uni-hive.net/api/get_specific_dorm",
            {
                dorm_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          console.log("wert", response.data);
          setDormData(response.data.dorms)

    
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

                            <Nav.Link className="navLink active"><Link className="navText" to="/gallery">Gallery</Link></Nav.Link>

                            <Nav.Link className="navLink"><Link className="navText" to="/">Testimonials</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/">About</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/blogs">Blogs</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/student-dashboard">Profile</Link></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



            {/* GALLERY DETAIL MAIN */}
            <section className="galleryDetailMain">
                <div className="container">
                    <h6 className='link text-center'>Gallery</h6>
                    <h1 className='title text-center'>Dorm Id {dormData?.id}</h1>

                    <div className="row">
                { dormData.dorm_images ? <> {dormData?.dorm_images?.map((image, index) => {
        if (image.image_url.endsWith('.mp4')) {
          // Render video
          return (
            <div key={index}>
                <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
              <video controls  style={{width:"512px",height:"512px"}}>
                <source src={`http://backend.uni-hive.net/storage/${image.image_url}`} type="video/mp4" />
              </video>
                </div>  </div>
          );
        } else {
          // Render image
          return (
            <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
              <img style={{width:"512px",height:"512px",objectFit:"contain"}} src={`http://backend.uni-hive.net/storage/${image.image_url}`} alt={`Image ${index + 1}`} />
            </div>
          );
        }
      })}</>
                :    <>    <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                            <img src="/homeBg.jpg" className='img-fluid' alt="" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                            <img src="/homeBg.jpg" className='img-fluid' alt="" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                            <img src="/homeBg.jpg" className='img-fluid' alt="" />
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 mt-5">
                            <img src="/homeBg.jpg" className='img-fluid' alt="" />
                        </div></>}
                    </div>

                    <div className="container mt-5">
                  {dormData?.description ? <p>{dormData?.description}</p>:    <>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta atque voluptatum autem ut maiores. Officiis reiciendis quas accusamus similique aliquam, laborum voluptatum repudiandae illo fugiat aperiam unde labore nisi quasi!</p>
                        <br />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p>
                        <br />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p>


                        <br />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta atque voluptatum autem ut maiores. Officiis reiciendis quas accusamus similique aliquam, laborum voluptatum repudiandae illo fugiat aperiam unde labore nisi quasi!</p>
                        <br />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p>
                        <br />
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p>

                      </>} 
                      <AddReview dorm_id={data}user_id={user}/>
                    
                        {/* <p className="text-center"><button className='heroButtonOne' onClick={handleButton}>Book Now</button></p> */}


                        <div className={`numberDetails ${toggleButton}`}>
                            <div className="numberIcon">
                                <img src={whatsapp} alt="" />
                            </div>
                            <div className="numberDetail">
                                <h5>+92 12451251</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <Footer />
        </>
    )
}

export default GalleryDetail