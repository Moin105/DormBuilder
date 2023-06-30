import React from 'react';
import './Footer.css';


import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import {SiTiktok} from 'react-icons/si'
import { Link } from 'react-router-dom';


const Footer = () => {
    const handleWhatsAppClick = () => {
        // Replace the placeholders with your actual phone number and message
        const phoneNumber = "+9212451251";
        const message = "Hello, I'm contacting you via WhatsApp.";
    
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
        window.open(whatsappUrl, "_blank");
      };
    return (
        <>
        
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-5 col-sm-5">
                        <div className="contactBtn">
                            <button onClick={handleWhatsAppClick}>Contact Us</button>
                        </div>

                        <h3>Contact@uniteddorms.com</h3>

                        <div className="socialMedia">
                            <p>Social Media</p>
                            <div className="socialMediaIcons">

                                {/* <span className="socialMediaIcon">
                                  <a href=''>  <FaFacebookF className='fIcon'/></a>
                                </span> */}

                                <span className="socialMediaIcon">
                                   <a href='https://www.instagram.com/study_abode_/?igshid=NTc4MTIwNjQ2YQ'> <FaInstagram className='fIcon'/></a>
                                </span>

                                <span className="socialMediaIcon">
                                   <a href='https://www.tiktok.com/@infoqcciyu'> <SiTiktok className='fIcon'/></a>
                                </span>


                            </div>
                        </div>

                    </div>
                    <div className="col-sm-12 col-md-7 col-sm-7 pt-4">
                    <div className="row" style={{textAlign:"center"}}>
                        <div className="col-sm-12 col-md-6 col-lg-4">
                    <p className="quickLinkText">Quick Links</p>

                            <ul className="quickLinks">
                                <Link to="/home"><li>Home</li></Link>   
                                <Link to="/dorm"><li>Dorm</li></Link>   
                                {/* <Link><li>Staff</li></Link>    */}
                                <Link to="/blogs"><li>Blog</li></Link>
                                <Link to="/faqs"><li>FAQs</li></Link>  
                            </ul>
                        </div>
                        {/* <div className="col-sm-12 col-md-6 col-lg-4 mt-5">
                        <ul className="quickLinks">
                                <li>Vision</li>
                                <li>Mission</li>
                                <li>Join Us</li>
                                <li onClick={handleWhatsAppClick}>Contact</li>
                            </ul>
                        </div> */}
                        {/* <div className="col-sm-12 col-md-6 col-lg-4 mt-5">
                        <ul className="quickLinks">
                                <li>Privacy & Terms</li>
                                <li>Google</li>
                                <li>Alphabet</li>
                                
                            </ul>
                        </div> */}
                    </div>

                    </div>
                </div>
                <hr />
                <p className="copyright">Copyright 2023 Unihive Dorms. All rights reserved.</p>
            </div>
        </div>
        
        </>
    )
}

export default Footer