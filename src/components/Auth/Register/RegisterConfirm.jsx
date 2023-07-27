import React, { useState,useContext, useEffect } from 'react'
import './../Login/Login.css'
import UserContext from '../../../Context';
import { RiLockFill, RiMailFill } from "react-icons/ri";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import Footer from '../../utils/Footer/Footer';
import { login } from '../../../redux/slices/authSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
// import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
// import { useDispatch } from 'react';

const RegisterConfirm = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [responseData, setResponseData] = useState([]);
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [code ,setCode ] = useState('');
     const getEmail = (e) => {
        setEmail(e.target.value);

    }
    const getCode= (e) => {
        setCode(e.target.value);

    }
    useEffect(() => {
        console.log(data)
        if(data){
            setEmail(data)
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
            email:email,
            code:code

        }
if(email == ""){
    console.log("sa")
    toast.error("Please enter email", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      })
}else
if(code == ""){
    console.log("sa")
    toast.error("Please enter code", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      })
}
    else {
            try {
                await axios.post('https://backend.uni-hive.net/api/match_register_otp', data)
                    .then(response => {
                        setResponseData(response.data);
                        console.log(responseData);
                        if(response.data.status == 200 && response.data.message === "invalid otp"){
                            console.log("qwdqwdqwdwdqw")
                            toast.error(response.data.message, {
                                position: toast.POSITION.TOP_CENTER,
                                toastClassName: "custom-toast",
                              });
                                // if (response.message === "invalid otp") {
                                // toast.error(response.message, {
                                //     position: toast.POSITION.TOP_CENTER,
                                //     // toastClassName: "custom-toast",
                                //   })
                            // }
                        }
                        if(response.data.status == 200){ 
                            const  {token,role,user} = response.data;
                            handleRouteChange('/verify-otp',{email:email})
                        if(response.status == 200){
                        
                            console.log("helllooo gee")
                            // const  {token,role,user} = responseData;
                            console.log("role",role)
                            console.log("user",user)
                            console.log("token",token)
                            if(token){
                                // Dispatch login action to update token and role in redux store
                                dispatch(login({ token, role,user }));
                
                                // let userStr = JSON.stringify(user);
                
                                // Set the cookie
                                // Cookies.set('user', userStr);
                                toast.success('Form submitted successfully!', {
                                  position: toast.POSITION.TOP_CENTER,
                                  toastClassName: "custom-toast",
                                });
                                setIsLoading(false);
                                if(role === "student"){
                                    handleRouteChange('/blogs',user)
                                }else if (role === "admin"){
                                    handleRouteChange('/admin/dashboard')
                                }
                            }
                        }
                
                  
                             }else{
                                handleRouteChange('/verify-otp',{email:email})
                                // toast.error(response.data.message)  
                             }
                        // navigate('/')
                        

                    })
                    .catch(error => {
                        
                        toast.error(error.message, {
                            position: toast.POSITION.TOP_CENTER,
                            toastClassName: "custom-toast",
                          })
                        // window.alert(error.message);
                    });
            } catch (error) {console.log(error)
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
                <h5>Verfy Your Account</h5>

                {/* <div className="loginField">
                    <span><RiMailFill /></span>
                    <input type="email" placeholder="Email Address" onChange={getEmail} />
                </div> */}
  <div className="loginField">
                    <span><RiLockFill /></span>
                    <input type="email" placeholder="Code" onChange={getCode} />
                </div>

                <div className="loginBtn">
                    <button onClick={handleLogin} className="signInBtn">Confirm</button>
                </div>

                <h6>New To <span className="heroText">Uni</span>-Hive <Link className='link' to="/register">Sign Up</Link></h6>

            </div>

            <ToastContainer />
            <Footer />

        </>
    )
}

export default RegisterConfirm