import React, { useEffect, useState,useMemo } from 'react';
import './Blogs.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../utils/Footer/Footer';


import why4 from './assets/why4.jpg';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';

const Blogs = () => {
    const navigate = useNavigate();
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    const [data, setData] = useState([]);
    // const token = localStorage.getItem("token");
    const role = useSelector((state) => state.role);
    const token = useSelector((state) => state.token);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://backend.uni-hive.net/api/get_all_blogs', {

                headers: {
                    "Authorization": `Bearer ${token}`},
            });
             setData(response.data.blog);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);
    const memoizedData = useMemo(() => data, [data]);


    // useEffect(() => {

    // }, []);
    console.log("memoizedData", memoizedData);

const handleBlogDetails = (id)=>{
    if (!token){
   return     handleRouteChange(`/blog-detail/${id}`,id)
    }else if(token){
        if (role == "student"){
       return     handleRouteChange(`/student/blog-detail/${id}`,id)
        }
        else if (role == "admin"){
         return   handleRouteChange(`/admin/blog-detail/${id}`,id)
        }
    }
}

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

                            <Nav.Link className="navLink"><Link className="navText" to="/dorm">Dorms</Link></Nav.Link>

                            <Nav.Link className="navLink"><Link className="navText" to="/">Testimonials</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/">About</Link></Nav.Link>
                            <Nav.Link className="navLink active"><Link className="navText" to="/blogs">Blogs</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/student-dashboard">Profile</Link></Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}


<Header/>

            {/* BLOGS */}


            <section className="blogs">

                <div className="container">
                    <h1><span className='heading'>The Knowledge</span> Hub</h1>

                    <div className="row">
      {memoizedData.map((item, index) => {
   return      <div key={index} onClick={()=>{handleBlogDetails(item.id)}}  className="col-sm-12 col-md-6 col-lg-4" >
         <div className="blogCard">
             <div className="blogCardImg">
                 {/* <span className="blogCardBadge">Student</span> */}
                 <img src={item.featured_image_url == null ? why4 :    ` https://backend.uni-hive.net/storage/${item.featured_image_url}`}className="img-fluid" alt="" />
             </div>
             <div className="blogCardContent">
                 <Link className="cardLink" > <h5>{item.title}</h5></Link>

                 { !token &&   <div className="contentBottom" onClick={() => handleRouteChange(`/blog-detail/${item.id}`,item.id) }>
                                                {/* <p>7 mins read - September 20</p> */}
                                                <div className="cardIcon">
                                                    <span >
                                                        <FiArrowRight className="icon" />
                                                    </span>
                                                </div>
                                            </div>}
                                            { token && role == "admin"   &&   <div className="contentBottom" onClick={() => handleRouteChange(`/admin/blog-detail/${item.id}`,item.id)}>
                                                {/* <p>7 mins read - September 20</p> */}
                                                <div className="cardIcon">
                                                    <span >
                                                        <FiArrowRight className="icon" />
                                                    </span>
                                                </div>
                                            </div>}
                                            {token && role=="student"   && <div className="contentBottom" onClick={() => handleRouteChange(`/student/blog-detail/${item.id}`,item.id) }>
                                                {/* <p>7 mins read - September 20</p> */}
                                                <div className="cardIcon">
                                                    <span >
                                                        <FiArrowRight className="icon" />
                                                    </span>
                                                </div>
                                            </div>}
             </div>


         </div>
     </div>
      })}
                        {/* <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="blogCard">
                                <div className="blogCardImg">
                                    <span className="blogCardBadge">Student</span>
                                    <img src={why4} className="img-fluid" alt="" />
                                </div>
                                <div className="blogCardContent">
                                    <Link className="cardLink" to="/blog-detail"> <h5>Put a simple title here in this space</h5></Link>

                                    <div className="contentBottom">
                                        <p>7 mins read - September 20</p>
                                        <div className="cardIcon">
                                            <span >
                                                <FiArrowRight className="icon" />
                                            </span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="blogCard">
                                <div className="blogCardImg">
                                    <span className="blogCardBadge">Student</span>
                                    <img src={why4} className="img-fluid" alt="" />
                                </div>
                                <div className="blogCardContent">
                                    <Link className="cardLink" to="/blog-detail"> <h5>Put a simple title here in this space</h5></Link>

                                    <div className="contentBottom">
                                        <p>7 mins read - September 20</p>
                                        <div className="cardIcon">
                                            <span >
                                                <FiArrowRight className="icon" />
                                            </span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="blogCard">
                                <div className="blogCardImg">
                                    <span className="blogCardBadge">Student</span>
                                    <img src={why4} className="img-fluid" alt="" />
                                </div>
                                <div className="blogCardContent">
                                    <Link className="cardLink" to="/blog-detail"> <h5>Put a simple title here in this space</h5></Link>

                                    <div className="contentBottom">
                                        <p>7 mins read - September 20</p>
                                        <div className="cardIcon">
                                            <span >
                                                <FiArrowRight className="icon" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> */}

                    </div>
                    
             {memoizedData.length> 12  &&     <div className="customButton">
                    <button className="btn btn-custom">View More</button>
                    </div>}

                </div>
            </section>


            {/* Main Blog */}
            {/* <section className="mainBlog">
                <div className="container">
                    <div className="mainBlogsCards">

                        <div className="mainBlogsCard">
                            <div className="mainBlogsCardContent">
                                <h6>Students</h6>
                                <h1>Meet New Faces</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium facilis harum adipisci doloremque beatae nam obcaecati consequuntur illum, autem voluptatibus est esse vitae aut reprehenderit soluta quod molestiae asperiores facere. <span><Link className="link" to='/blog-detail'>Read More</Link></span> </p>
                            </div>
                            <div className="mainBlogsCardImg">
                                <img src={why4} alt="" />
                            </div>
                        </div>
                        <hr />

                        <div className="mainBlogsCard">
                            <div className="mainBlogsCardContent">
                                <h6>Students</h6>
                                <h1>Meet New Faces</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium facilis harum adipisci doloremque beatae nam obcaecati consequuntur illum, autem voluptatibus est esse vitae aut reprehenderit soluta quod molestiae asperiores facere. <span><Link className="link" to='/blog-detail'>Read More</Link></span> </p>
                            </div>
                            <div className="mainBlogsCardImg">
                                <img src={why4} alt="" />
                            </div>
                        </div>
                        <hr />

                        <div className="mainBlogsCard">
                            <div className="mainBlogsCardContent">
                                <h6>Students</h6>
                                <h1>Meet New Faces</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium facilis harum adipisci doloremque beatae nam obcaecati consequuntur illum, autem voluptatibus est esse vitae aut reprehenderit soluta quod molestiae asperiores facere. <span><Link className="link" to='/blog-detail'>Read More</Link></span> </p>
                            </div>
                            <div className="mainBlogsCardImg">
                                <img src={why4} alt="" />
                            </div>
                        </div>
                        <hr />


                    </div>

                    
                    <div className="customButton">
                    <button className="btn btn-custom">View More</button>
                    </div>

                </div>
            </section> */}




            {/* Footer */}

            <Footer />

        </>
    )
}

export default Blogs