import React, { useEffect, useState,useMemo } from 'react';
import "./Home.css"
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
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
import why4 from './assets/why4.jpg';
import Slider from 'react-slick';
import axios from 'axios';
import Header from '../Header/Header';

function Testimonials() {
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
    return (
    <>
         <Header />
           <section className="testimonials">

<div className="testimonialsBadge">
    <h6>Testimonials</h6>
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


</section>
<Footer />
    </>
  )
}

export default Testimonials