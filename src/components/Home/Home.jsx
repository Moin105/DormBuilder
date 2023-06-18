import React, { useEffect, useState,useMemo } from 'react';
import "./Home.css"
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link,useNavigate,useLocation } from 'react-router-dom';
import Footer from '../utils/Footer/Footer';
import { FiArrowRight } from "react-icons/fi";

// IMAGES

import star from './assets/star.png';
import map from './assets/map.png';
import creditCard from './assets/creditCard.png';
import crown from './assets/crown.png';
import why1 from './assets/why1.jpg';
import why2 from './assets/why2.jpg';
import why3 from './assets/why3.jpg';
import heart from './assets/heart.png';
import dormer from './assets/sad.avif';
import whatsapp from './assets/whatsapp.svg'
import why4 from './assets/why4.jpg';
import Slider from 'react-slick';
import axios from 'axios';

import Header from '../Header/Header';
import { useSelector } from 'react-redux';



const Home = () => {
    const navigate = useNavigate();  
    const location = useLocation();

    useEffect(() => {
        console.log("location",location.pathname);
      }, [location]);
    const token = useSelector((state) => state.token);
    const role = useSelector((state) => state.role);
    const handleWhatsAppClick = () => {
        // Replace the placeholders with your actual phone number and message
        const phoneNumber = "+9212451251";
        const message = "Hello, I'm contacting you via WhatsApp.";
    
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
        window.open(whatsappUrl, "_blank");
      };

    let settings_3 = {
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://backend.uni-hive.net/api/get_all_blogs', {

                headers: {
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDNlMTFjNjUxZWNiOWNjMDFlZjVlZTlhODM5NzRkMTMyM2ZhMjIwNTI2ODdmMzhlNWM2MzU2YThhZmQyMGI5Njk2YWZiZWJkZTVjMjAyMDciLCJpYXQiOjE2ODQxNjkzNDIuNDEyODgyLCJuYmYiOjE2ODQxNjkzNDIuNDEyODg0LCJleHAiOjE3MTU3OTE3NDIuNDA4NTQ3LCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.KySFMAiTJLPF9bRiUewzkjs4aiKHvU2CSskS0qOBMbbRFMqVA9oP9u3qzCF5UrXQfbCGipRmn_mZRHzt8bm3mIHOZ6fZn4FbmJfKLyHWrazMdcoRTH8vEsx2euey5dJ0N65ZzkKsjHgq1Hf7u3HuD0zXmEnHjFEnCw_ScvP0eO6hK2SpBUqffbcry0MrJ_2tHOaPrYEhgNiON6jnPvwD40xpFXMzhJxKJHID9n7OhJJxlwVkb3BKyxtW0BGuByUu1XwelZIUQW8QdgJ5UMvkvAO3f5oojbq_lMgy6mHlopt9OjbgnAh4Di4jE_qagaSjUMjNknwzrxVbir7I2zgFyHN7wq14O_s3zbNyhz1k2ddXpCPfzx3KzrGU16PgyZ3MSKwhE5aKbYCGpBFwKYaX3zTtTp9ApoumcBakvqbdf22x9wbc-sCgzOal_HLktjeVe3d_I5pb03kIbBTHgVAd-PfuphTUPM-7VCDxr3w9_7nhNNjNzPiW94VAJw9yhSg7EA1cmfuQG2KjyEKf3MJs60XteCMuiffyhkuwXCcBUEzIvK-6pv2AhAkmPhwDls5s-4_sJoHuPr6Lf0OguLPBe9KVCgTVmaCNCvVfocu2g0VPreempYv6YK16_Le5ICMNvqfllnCNpHVCVqBIeW-ugvNV2w-BLbuQUERT1OR31EE"
                },
            });
            await setData(response.data.blog.slice(0, 3));
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

    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };

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
                            <Nav.Link className="navLink active"><Link className="navText" to="/">Home</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/gallery">Gallery</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/">Testimonials</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/">About</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/blogs">Blogs</Link></Nav.Link>
                            <Nav.Link className="navLink"><Link className="navText" to="/student-dashboard">Profile</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
             <Header />

            {/* HERO SECTION */}
            <section className='hero'>
                <div className="container">

                    <h5><span className="heroText">United</span> Dorms</h5>
                    <p>Are you a student or a young traveler seeking affordable and convenient accommodation? Look no further! DormBooker is your ultimate destination for hassle-free dormitory bookings. We understand the importance of comfortable and budget-friendly accommodations, and our platform is designed to make your dormitory search a breeze.</p>

                    <div className="heroBtn">
                        <button style={{margin:"10px 30px 0px 0px"}} onClick={handleWhatsAppClick} className='heroButtonOne'>Book Now</button>
                       <Link to="/about"> <button style={{margin:"10px 30px 0px 0px"}} className='heroButtonTwo'>Learn More</button></Link>
                    </div>                      

                </div>
            </section>
    

            {/* FEATURE SECTION */}

            <section className="feature">
                <div className="container">
                    <h1>The Comfort of your <span className='link'>Home</span></h1>
                    <div className="featureBadge">
                        <h6>Features</h6>
                    </div>


                    <div className="row">


                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="featureCard">
                                <div className="featureCardImg">
                                    <img src={dormer} alt="" />
                                </div>

                                <div className="featureCardContent">
                                    <h5>Look at the dorms</h5>
                                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p> */}
                                </div>

                            </div>
                        </div>


                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="featureCard">
                                <div className="featureCardImg">
                                    <img src={heart} alt="" />
                                </div>

                                <div className="featureCardContent">
                                    <h5>Find which one you like </h5>
                                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p> */}
                                </div>

                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="featureCard">
                                <div className="featureCardImg">
                                    <img src={whatsapp} alt="" />
                                </div>

                                <div className="featureCardContent">
                                    <h5>Contact Us to secure a spot </h5>
                                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p> */}
                                </div>

                            </div>
                        </div>

                        {/* <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="featureCard">
                                <div className="featureCardImg">
                                    <img src={crown} alt="" />
                                </div>

                                <div className="featureCardContent">
                                    <h5>Otel Konspeti</h5>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p>
                                </div>

                            </div>
                        </div> */}




                    </div>


                    {/* <div className="row">


<div className="col-sm-12 col-md-6 col-lg-3">
    <div className="featureCard">
        <div className="featureCardImg">
            <img src={star} alt="" />
        </div>

        <div className="featureCardContent">
            <h5>Otel Konspeti</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p>
        </div>

    </div>
</div>


<div className="col-sm-12 col-md-6 col-lg-3">
    <div className="featureCard">
        <div className="featureCardImg">
            <img src={map} alt="" />
        </div>

        <div className="featureCardContent">
            <h5>Otel Konspeti</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p>
        </div>

    </div>
</div>

<div className="col-sm-12 col-md-6 col-lg-3">
    <div className="featureCard">
        <div className="featureCardImg">
            <img src={creditCard} alt="" />
        </div>

        <div className="featureCardContent">
            <h5>Otel Konspeti</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p>
        </div>

    </div>
</div>

<div className="col-sm-12 col-md-6 col-lg-3">
    <div className="featureCard">
        <div className="featureCardImg">
            <img src={crown} alt="" />
        </div>

        <div className="featureCardContent">
            <h5>Otel Konspeti</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ab error voluptatem porro animi optio dolor sit.</p>
        </div>

    </div>
</div>




</div> */}

                </div>
            </section>

  {/* BLOGS */}



            {/* What We Do Section */}

            <section className="whatWeDo">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <div className="whatWeDoContent">
                                <h1>Why use United Dorms ? </h1>
                                <br />
                                <br />
                                <ul>
                                    <li><p>You can ask us any worries you have about the campus or dorms </p></li>
                                    <li><p>our articles will help you figure out what is important as a new student </p></li>
                                    <li><p>We can pick you up from the airport if you reserve through us to feel assured coming to an unknown country</p></li>
                                </ul>
                                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat officia deleniti delectus obcaecati in, consequuntur, similique, commodi sed dicta aspernatur voluptas veritatis beatae odit magnam molestias exercitationem veniam consectetur nostrum!</p> */}

                                <button onClick={handleWhatsAppClick} className='heroButtonOne mt-5'>Book Now</button>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6">
                            <div className="row">

                                <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                    <div className="why1">
                                        <img src={why1} className="img-fluid" alt="" />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                    <div className="why2">
                                        <img src={why2} className="img-fluid" alt="" />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                    <div className="why3">
                                        <img src={why3} className="img-fluid" alt="" />
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 col-lg-6 mt-3">
                                    <div className="why4">
                                        <img src={why4} className="img-fluid" alt="" />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Testimonials */}
  <section className="blogs">

<div className="container">
    <div className="featuredBlog">
        <h5>Featured Blog</h5>
    </div>

    <div className="row">

        
        {
            memoizedData?.map((item) => (
                <div className="col-sm-12 col-md-6 col-lg-4" onClick={()=>{handleBlogDetails(item.id)}} >
                    <div className="blogCard">
                        <div className="blogCardImg">
                            {/* <span className="blogCardBadge">Student</span> */}
                            <img src={item.featured_image_url == null ? why4 :` https://backend.uni-hive.net/storage/${item.featured_image_url}`} className="img-fluid" alt="" />
                        </div>
                        <div className="blogCardContent">
                            <div className="cardLink"> <h5>{item.title}</h5></div>

                        { !token &&   <div className="contentBottom" onClick={() => handleRouteChange(`/blog-detail/${item.id}`,item.id) }>
                                {/* <p>7 mins read - September 20</p> */}
                                <div className="cardIcon">
                                    <span >
                                        <FiArrowRight className="icon" />
                                    </span>
                                </div>
                            </div>}
                            { token && role == "admin"   &&   <div className="contentBottom" onClick={() => handleRouteChange(`/admin/blog-detail/${item.id}`,item.id) }>
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
            ))
        }




    </div>

</div>
</section>
            {/* <section className="testimonials">

                <div className="testimonialsBadge">
                   <Link to="/testimonials"> <h6>Testimonials</h6></Link>
                </div>
                <h1 className='text-center'><span className='heading'>Trusted</span> By 100's <br /> Of Users
                    <span className='userImg_1'> <img src="https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=g_ZmKDpK9VEEzWw4vJ6O577ENGLTOcrvYeiLxi8mVuo=" width="30px" height="30px" alt="" /></span>
                    <span className='userImg_2'> <img src="https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=g_ZmKDpK9VEEzWw4vJ6O577ENGLTOcrvYeiLxi8mVuo=" width="30px" height="30px" alt="" /></span>
                    <span className='userImg_3'> <img src="https://media.istockphoto.com/id/1200677760/photo/portrait-of-handsome-smiling-young-man-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=g_ZmKDpK9VEEzWw4vJ6O577ENGLTOcrvYeiLxi8mVuo=" width="30px" height="30px" alt="" /></span>

                </h1>

                <Slider {...settings_3}>

                    <div className='testimonialCard'>
                        <h5>Super Helpful !!!!</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam deserunt perferendis obcaecati veritatis consectetur aliquid alias, veniam cum! Quam veritatis repellat hic quas dolorem incidunt harum fuga obcaecati autem cum!</p>

                        <div className="testimonialBottom">
                            <div className="clientImg">
                                <img src={why3} width="40px" height="40px" alt="client Img" />
                            </div>
                            <div className="clientInfo">
                                <h6>Anna Gates</h6>
                                <p>Web Designer</p>
                            </div>
                        </div>
                    </div>

                    <div className='testimonialCard'>
                        <h5>Super Helpful !!!!</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam deserunt perferendis obcaecati veritatis consectetur aliquid alias, veniam cum! Quam veritatis repellat hic quas dolorem incidunt harum fuga obcaecati autem cum!</p>

                        <div className="testimonialBottom">
                            <div className="clientImg">
                                <img src={why3} width="40px" height="40px" alt="client Img" />
                            </div>
                            <div className="clientInfo">
                                <h6>Anna Gates</h6>
                                <p>Web Designer</p>
                            </div>
                        </div>
                    </div>

                    <div className='testimonialCard'>
                        <h5>Super Helpful !!!!</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam deserunt perferendis obcaecati veritatis consectetur aliquid alias, veniam cum! Quam veritatis repellat hic quas dolorem incidunt harum fuga obcaecati autem cum!</p>

                        <div className="testimonialBottom">
                            <div className="clientImg">
                                <img src={why3} width="40px" height="40px" alt="client Img" />
                            </div>
                            <div className="clientInfo">
                                <h6>Anna Gates</h6>
                                <p>Web Designer</p>
                            </div>
                        </div>
                    </div>

                    <div className='testimonialCard'>
                        <h5>Super Helpful !!!!</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam deserunt perferendis obcaecati veritatis consectetur aliquid alias, veniam cum! Quam veritatis repellat hic quas dolorem incidunt harum fuga obcaecati autem cum!</p>

                        <div className="testimonialBottom">
                            <div className="clientImg">
                                <img src={why3} width="40px" height="40px" alt="client Img" />
                            </div>
                            <div className="clientInfo">
                                <h6>Anna Gates</h6>
                                <p>Web Designer</p>
                            </div>
                        </div>
                    </div>


                </Slider>


            </section> */}

   

            {/* Footer */}

            <Footer />
        </>
    )
}

export default Home