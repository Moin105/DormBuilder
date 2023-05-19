import React, { useEffect, useState,useMemo } from 'react';
import { Carousel, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../utils/Footer/Footer';
import './Gallery.css';
import { BiEdit, BiSearch } from "react-icons/bi";
import { FaLaptop, FaStar, FaWifi, FaWindowMaximize } from 'react-icons/fa';
import axios from 'axios';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';


const Gallery = () => {
    const navigate = useNavigate();
      const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    const [data, setData] = useState([]);
    // const token = localStorage.getItem("token")
    const token = useSelector((state) => state.token);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://backend.uni-hive.net/api/get_all_dorms', {

                headers: {
                    "Authorization":`Bearer ${token}`  },
            });
            await setData(response.data.dorms);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    const memoizedData = useMemo(() => data, [data]);

 console.log(memoizedData)
 const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(
    () =>
      memoizedData.filter((item) =>
      item.dorm_id?.toString().includes(searchTerm)
  
      // item?.id?.includes(searchTerm.toLowerCase())
      ),
    [searchTerm, memoizedData]
  );
  console.log("filteredData", filteredData);
    return (
        <>
            {/* NAVBAR */}
            {/* <Navbar expand="lg" className="navbar">
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
            </Navbar> */}
            <Header/>
            {/* GALLERY MAIN */}

            <section className="galleryMain">
                <div className="carousalContent">

                    <h1 className='link'>Gallery</h1>
                    <h2>The Comfort of your <span className='link'>Home</span></h2>

                    <div className="row d-flex align-items-center">
                        <div className="col-lg-4">
                            <Form.Check
                                inline
                                label="Single Room"
                                type="radio"
                            />

                        </div>
                        <div className="col-lg-4">
                            <Form.Check
                                inline
                                label="Double Room"
                                type="radio"
                            />

                        </div>
                        <div className="col-lg-4">
                            <Form.Check
                                inline
                                label="Suit"
                                type="radio"
                            />

                        </div>
                    </div>

                </div>
                <Carousel fade className='carouselMain'>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./homeBg.jpg"
                            alt="First slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./homeBg.jpg"
                            alt="Second slide"
                        />


                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./homeBg.jpg"
                            alt="Third slide"
                        />


                    </Carousel.Item>
                </Carousel>

            </section>


            {/* Gallery Images */}
            <section className="gallerySecondary">
                <div className="container">

                    <div className="dormSearchs">
                        <div className="dormSearch">
                            <span>
                                <BiSearch />
                            </span>

                            <input type="text" onChange={handleInputChange}  className="searchInput" placeholder="Search" />
                        </div>
                    </div>

                    <div className="dormfilters">
                        <div className="dormfilter">
                            <Form.Select className='filterSelect' aria-label="Default select example">
                                <option>Filter</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>
                    </div>


                    <div className="row ">
                    {filteredData.length > 0  ?filteredData.map((dorm) => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4 dormGalleryCards" style={{display:"flex"}} onClick={() => handleRouteChange(`/student/dorm-show/${dorm.dorm_id}`,dorm.dorm_id) }>
                            <div className="card text-left">

                                <div className="galleryCardImg">
                                    <span className="editIcon">
                                        <BiEdit />
                                    </span>
                                    <img className="card-img-top" src="./homeBg.jpg" alt="" />
                                    <div className="rating">

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>


                                    </div>
                                </div>


                                <div className="card-body">
                                    <div  className="card-title">{dorm?.user_dorm[0]?.username}DORM</div>
                                    <p className="card-text">{dorm?.description}</p>

                                    <div className="cardBottom">
                                        <div className="bottomIcons">
                                            <span>
                                                <FaWifi />

                                            </span>
                                            <span>
                                                <FaWindowMaximize />

                                            </span>
                                            <span>
                                                <FaLaptop />

                                            </span>
                                        </div>
                                        <div className="cardBottomPrice">
                                            <h5>${dorm.rent_details}</h5>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                        )
                    }): "" }
                        <div className="col-sm-12 col-md-6 col-lg-4 dormGalleryCards">
                            <div className="card text-left">

                                <div className="galleryCardImg">
                                    <span className="editIcon">
                                        <BiEdit />
                                    </span>
                                    <img className="card-img-top" src="./homeBg.jpg" alt="" />
                                    <div className="rating">

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>


                                    </div>
                                </div>


                                <div className="card-body">
                                    <Link to="/gallery-detail" className="card-title">NURAL DORM</Link>
                                    <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste laboriosam laborum iure rerum modi architecto repellat quos eum voluptatibus. At dolorem aut odio explicabo mollitia quae illum dignissimos veritatis omnis.</p>

                                    <div className="cardBottom">
                                        <div className="bottomIcons">
                                            <span>
                                                <FaWifi />

                                            </span>
                                            <span>
                                                <FaWindowMaximize />

                                            </span>
                                            <span>
                                                <FaLaptop />

                                            </span>
                                        </div>
                                        <div className="cardBottomPrice">
                                            <h5>$400</h5>
                                        </div>


                                    </div>

                                </div>
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

export default Gallery