import React,{useEffect,useState,useContext} from 'react'
import './Register.css';

import { RiLockFill, RiMailFill, RiUser3Fill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
// import { / } from 'react';
import UserContext from '../../../Context';
import { Spinner } from 'react-bootstrap';
import Footer from '../../utils/Footer/Footer';

import { ToastContainer, toast } from 'react-toastify';
import Header from '../../Header/Header';

// import { useDispatch } from 'react-redux'; 

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [save,setSaved] = useState("Sign In")
    const [isLoading, setIsLoading] = useState(false);
    // const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword:""
      });
    
      const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
      const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    //   const postData = (credentials) => async (dispatch) => {
    //     // const { email, password } = credentials;
    //       try {
    //         const response = await fetch('http://backend.uni-hive.net/api/user_register', {
    //           method: 'POST',
    //           body: JSON.stringify(credentials),
    //           headers: { 'Content-Type': 'application/json' },
    //         });
    //         const data = await response.json();
    //         console.log("after register",data)
    //         // dispatch(setToken(data.token));
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    const postData = async (url, data) => {
        try {
          const response = await axios.post(url, data);
          console.log('API response:', response.data);
           if(response.data.status == 200){
          const  {token,role,user} = response.data;
          // const id = response.data;
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

                if(role === "student"){
                    handleRouteChange('/blogs',user)
                }else if (role === "admin"){
                    handleRouteChange('/admin/dashboard')
                }
            }
        }

           }
          // Handle success response here
        } catch (error) {
          console.error('API error:', error);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            toastClassName: "custom-toast",
          });
          setIsLoading(false);
          // Handle error response here
        }
      };
      function validateEmail(email) {
        var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return re.test(String(email).toLowerCase());
    }
const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
  const data = {
    password: formData.password,
    email: formData.email,
    name: formData.name,
    username: formData.username,
  };
  if (!formData.email || !formData.password || !formData.name || !formData.username) {
    toast.error('Please fill in all the required fields.', {
      position: toast.POSITION.TOP_CENTER,
      toastClassName: "custom-toast",
    });
  
    setIsLoading(false);
    return;
  }else if(!validateEmail(formData.email)){
    toast.error('Please enter a valid email address.', {
      position: toast.POSITION.TOP_CENTER,
      toastClassName: "custom-toast",
    });
    setIsLoading(false);
    return;

  } else{
  console.log("data",formData)  
 postData("https://backend.uni-hive.net/api/user_register",data)
}
 
  };    return (
        <>
        
        {/* <div className="LoginNavbar">
            <h5>United Dorms</h5>
        </div> */}
        
<Header/>
        <div className="loginForm">
            <h5>Sign in to continue</h5>

            <div className="loginField">
                <span><RiUser3Fill/></span>
                <input onChange={(e)=>{handleInputChange(e)}} name="username" type="text" placeholder="Choose a username" />
            </div>

            <div className="loginField">
                <span><RiUser3Fill/></span>
                <input onChange={(e)=>{handleInputChange(e)}} name="name" type="text" placeholder="Enter your full name" />
            </div>
            <div className="loginField">
                <span><RiMailFill/></span>
                <input onChange={(e)=>{handleInputChange(e)}} name="email" type="email" placeholder="Enter Your Email Address" />
            </div>

            <div className="loginField">
                <span><RiLockFill /></span>
                <input onChange={(e)=>{handleInputChange(e)}} name="password" type="password" placeholder="Password" />
            </div>


            {/* <div className="loginField">
                <span><RiLockFill/></span>
                <input onChange={(e)=>{handleInputChange(e)}} name="name" type="password" placeholder="Password" />
            </div> */}
                <small className='small-text'>Passwords must have at least 8 characters and contain at least two of the following: uppercase letters, lowercase letters, numbers, and symbols.</small>


            <div className="loginBtn">
            <button onClick={handleSubmit}  className="signInBtn"> { isLoading ? (
        <Spinner animation="border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      ) : (
        <> {save}</>
      )}</button>
                {/* <Link to="/student-dashboard" className="signInBtn">Sign In</Link> */}
            </div>

            <h6>Already Have an Account? <Link className='link' to="/login">Sign in</Link></h6>

        </div>

        <ToastContainer />

        <Footer/>
        
        </>
    )
}

export default Register 