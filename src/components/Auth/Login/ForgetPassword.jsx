import React, { useState,useContext, useEffect } from 'react'
import './Login.css';
import UserContext from '../../../Context';
import { RiLockFill, RiMailFill } from "react-icons/ri";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import Footer from '../../utils/Footer/Footer';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';

import { ToastContainer, toast } from 'react-toastify';


const ForgetPassword = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [responseData, setResponseData] = useState([]);

    const [email, setEmail] = useState('');
    const getEmail = (e) => {
        setEmail(e.target.value);

    }
    useEffect(() => {
        if(data){
            setEmail(data.email)
        }
    }, [])
    
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    const [password, setPassword] = useState('');
    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate()
     


    const handleLogin = async () => {

        let data = {
            email:email
        }
if(email == ""){
    console.log("sa")
    toast.error("Please enter email", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      })
}
    else {
            try {
                await axios.post('https://backend.uni-hive.net/api/forgot_password', data)
                    .then(response => {
                        setResponseData(response.data);
                        console.log(responseData);
                        if(response.data.status == 200){ 
                            const  {token,role} = response.data;
                            handleRouteChange('/otp',{email:email})
                        
                  
                             }else{
                                handleRouteChange('/otp',{email:email})
                                // toast.error(response.data.message)  
                             }
                        // navigate('/')
                        

                    })
                    .catch(error => {
                        toast.error("Please enter email", {
                            position: toast.POSITION.TOP_CENTER,
                            toastClassName: "custom-toast",
                          })
                        // window.alert(error.message);
                    });
            } catch (error) {
                window.alert(error.message);
        }

    }
    }

    return (
        <>

            <div className="LoginNavbar">
            <Link  to="/"> 
            <h5 style={{color:"black"}} ><span className="heroText">Uni</span>-Hive </h5>
        </Link>
            </div>


            <div className="loginForm">
                <h5>Forgot Password?</h5>

                <div className="loginField">
                    <span><RiMailFill /></span>
                    <input type="email" placeholder="Email Address" onChange={getEmail} />
                </div>


                <div className="loginBtn">
                    <button onClick={handleLogin} className="signInBtn">Reset Password</button>
                </div>

                <h6>New To <span className="heroText">Uni</span>-Hive? <Link className='link' to="/register">Sign Up</Link></h6>

            </div>

            <ToastContainer />
            <Footer />

        </>
    )
}

export default ForgetPassword