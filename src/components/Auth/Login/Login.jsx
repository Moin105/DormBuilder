import React, { useState,useContext } from 'react'
import './Login.css';
import UserContext from '../../../Context';
import { RiLockFill, RiMailFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../utils/Footer/Footer';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';




const Login = () => {

    const [responseData, setResponseData] = useState([]);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const getEmail = (e) => {
        setEmail(e.target.value);

    }
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    const [password, setPassword] = useState('');
    const getPassword = (e) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate()
    // const { user, setUser } = useContext(UserContext);
    // const updateUser = (user) => {
    //     setUser(user);
    //   };


    const handleLogin = async () => {
      
        let data = {
            email,
            password
        }
   if(data.email == ""){

       toast.error("Please enter email")
   }else if (data.password == ""){
    toast.error("Please enter password")
   }else if (email !== "" && password !== ""){
        try {
            const response = await axios.post('http://backend.uni-hive.net/api/user_login', data);
            const responseData = response.data;
       console.log(responseData)
            if(responseData.status == 200){
                console.log("helllooo gee")
                const  {token,role,user} = responseData;
                console.log("role",role)
                console.log("user",user)
                console.log("token",token)
                if(token){
                    // Dispatch login action to update token and role in redux store
                    dispatch(login({ token, role,user }));
    
                    // let userStr = JSON.stringify(user);
    
                    // Set the cookie
                    // Cookies.set('user', userStr);
    
                    if(role === "student"){
                        handleRouteChange('/student-dashboard',user)
                    }else if (role === "admin"){
                        handleRouteChange('/admin/dashboard')
                    }
                }
            }
        } catch (error) {
            window.alert(error.message);
        }}
    }
    const handleforget = async () => {

        let data = {
            email:email
        }

            await axios.post('http://backend.uni-hive.net/api/forgot_password', data)
                .then(response => {
                    setResponseData(response.data);
                    if(response.data.status == 200){
                        console.log("forget gee",response.data)
                        // const  {token,role} = response.data;
                        // if(token){
                        //   Cookies.set("token",token)
                        //   Cookies.set("role",role)
                        //   localStorage.setItem("token",token)
                        //   localStorage.setItem("role",role)
                        //   updateUser(response.data)
                          
                              handleRouteChange('/forget-password',email)
          
                        //   // handleRouteChange('/')
                        // }
              
                         }
                    // navigate('/admin/dashboard')

                })
                .catch(error => {
                    window.alert(error.message);
                });
        


    }
    return (
        <>

            <div className="LoginNavbar">
                <h5>United Dorms</h5>
            </div>
       <ToastContainer />

            <div className="loginForm">
                <h5>Sign in to continue</h5>

                <div className="loginField">
                    <span><RiMailFill /></span>
                    <input type="email" placeholder="Email Address" onChange={getEmail} />
                </div>

                <div className="loginField">
                    <span><RiLockFill /></span>
                    <input type="password" placeholder="Password" onChange={getPassword} />
                </div>

                
                <span className="forgotLink" onClick={()=>{handleforget()}}>Forgot Password?</span>
            

                <div className="loginBtn">
                    <button onClick={handleLogin} className="signInBtn">Sign In</button>
                </div>

                <h6>New To United Dorms? <Link className='link' to="/register">Sign Up</Link></h6>

            </div>


            <Footer />

        </>
    )
}

export default Login