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
import Header from '../../Header/Header';
import { Spinner } from 'react-bootstrap';




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
    const [save,setSaved] = useState("Sign In")
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()
    // const { user, setUser } = useContext(UserContext);
    // const updateUser = (user) => {
    //     setUser(user);
    //   };


    const handleLogin = async () => {
        setIsLoading(true);
        let data = {
            email,
            password
        }
   if(data.email == ""){

       toast.error("Please enter email", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      })
   }else if (data.password == ""){
    toast.error("Please enter password", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      })
   }else if (email !== "" && password !== ""){
        try {
            const response = await axios.post('https://backend.uni-hive.net/api/user_login', data);
            const responseData = response.data;
       console.log(responseData)
       if(responseData.status == 401 && responseData.message == "please verify your account first") {
        handleRouteChange('/verify-otp',email)
       }
            if(responseData.status == 200){     
                console.log("helllooo gee")
                const  {token,role,user} = responseData;
                console.log("role",role)
                console.log("user",user)
                console.log("token",token)
                if(responseData.status == 200 && responseData.message == "invalid password") {
                    toast.error("Invalid Password", {
                        position: toast.POSITION.TOP_CENTER,
                        toastClassName: "custom-toast",
                      })
                    setIsLoading(false);
                }
                if(responseData.status == 200 && responseData.message == 'user not found please enter the correct credentials') {
                    toast.error("User not found", {
                        position: toast.POSITION.TOP_CENTER,
                        toastClassName: "custom-toast",
                      })
                    setIsLoading(false);
                }
                if(token){
                    // Dispatch login action to update token and role in redux store
                    toast.success("Login Successfully", {
                        position: toast.POSITION.TOP_CENTER,
                        toastClassName: "custom-toast",
                      })
                    dispatch(login({ token, role,user }));
    
                    // let userStr = JSON.stringify(user);
    
                    // Set the cookie
                    // Cookies.set('user', userStr);
    
                    if(role === "student"){
                        handleRouteChange('/blogs',user)
                    }else if (role === "admin"){
                        handleRouteChange('/admin/dashboard')
                    }
                }
            }
        } catch (error) {
            // console.log(error);
            window.alert(error.message);
        }}
    }
    const handleforget = async () => {

        let data = {
            email:email
        }
        handleRouteChange('/forget-password')
            // await axios.post('https://backend.uni-hive.net/api/forgot_password', data)
            //     .then(response => {
            //         setResponseData(response.data);
            //         if(response.data.status == 200){
            //             console.log("forget gee",response.data)
            //             // const  {token,role} = response.data;
            //             // if(token){
            //             //   Cookies.set("token",token)
            //             //   Cookies.set("role",role)
            //             //   localStorage.setItem("token",token)
            //             //   localStorage.setItem("role",role)
            //             //   updateUser(response.data)
                          
                              
          
            //             //   // handleRouteChange('/')
            //             // }
              
            //              }
            //         // navigate('/admin/dashboard')

            //     })
            //     .catch(error => {
            //         window.alert(error.message);
            //     });
        


    }
    return (
        <>

            {/* <div className="LoginNavbar">
                <h5>Unihive Dorms</h5>
            </div> */}
            <Header/>
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
                    <button onClick={handleLogin} className="signInBtn">  { isLoading ? (
        <Spinner animation="border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      ) : (
        <> {save}</>
      )}</button>
                </div>

                <h6>New To <span className="heroText">Uni</span>-Hive? <Link className='link' to="/register">Sign Up</Link></h6>

            </div>


            <Footer />

        </>
    )
}

export default Login