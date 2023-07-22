import React, { useState,useContext, useEffect } from 'react'
import './Login.css';
import UserContext from '../../../Context';
import { RiLockFill, RiMailFill } from "react-icons/ri";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import Footer from '../../utils/Footer/Footer';
import axios from 'axios';
import Cookies from 'js-cookie';
import Header from '../../Header/Header';
import { toast, ToastContainer } from 'react-toastify';



const ConfirmOTP = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [responseData, setResponseData] = useState([]);
const [show,setShow] = useState(false);
    const [email, setEmail] = useState('');
    const getEmail = (e) => {
        setEmail(e.target.value);

    }
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
      const [otp, setOtp] = useState('');
      const [showForm, setShowForm] = useState(false);
      const getOtp = (e) => {
          setOtp(e.target.value);
  
      }

    const navigate = useNavigate()
  
useEffect(() => {
    // console.log("maa ka bharosa",data)
 if(data){
        setEmail(data.email)
 }
}, [])
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const resetPassword = async (e,email, password, confirmPassword) => {
     e.preventDefault();
     if(confirmPassword !== password){
      toast.error("Password and Confirm Password does not match", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      })
     }
     else{

       try {
         const response = await axios.post('https://backend.uni-hive.net/api/reset_password', {
           email: email,
           password: password,
           confirm_password: confirmPassword
         });
     
         // Handle success
         console.log(response.data);
         if(response.data.status == 200){
           handleRouteChange('/login')
         }
       } catch (error) {
         // Handle error
         console.error(error);
       }
     }
  };

      const handleLogin = async () => {

        let data = {
            email:email,
            code:otp
        }

    
            try {
                await axios.post('https://backend.uni-hive.net/api/match_otp', data)
                    .then(response => {
                        setResponseData(response.data);
                        console.log(response);
                        if(response.data.status == 200 && response.data.message === "otp verified successfully"){
                           setShowForm(true)                        
                             } else{
                                setShowForm(false)
                                    setShow(true)
                             }
                        // navigate('/')
                        

                    })
                    .catch(error => {
                        window.alert(error.message);
                    });
            } catch (error) {
                window.alert(error.message);
        }


    }

    return (
        <>

          <Header/>
{showForm ? <>
    <form  className="loginForm">
    <div className="loginField">
                    <span><RiMailFill /></span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="loginField">
                    <span><RiLockFill /></span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>

      <div className="loginField">
                    <span><RiLockFill /></span>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <div className="loginBtn">
      <button className="signInBtn" onClick={(e)=>{
            resetPassword(e,email,password,confirmPassword)
      }}> Reset Password</button>
      </div>
    </form>
</>
            :<div className="loginForm">
                <h5>Reset Account Password</h5>
                {/* <p></p> */}

                <div className="loginField">
                    <span><RiMailFill /></span>
                    <input type="otp" name="otp"  placeholder="Enter Code" onChange={getOtp} />
                </div>


                <div className="loginBtn">
                    <button onClick={()=>handleLogin()} className="signInBtn">Submit</button>
                </div>

            {show   &&  <h6>OTP didnt match</h6>}

            </div>}

<ToastContainer />
            <Footer />

        </>
    )
}

export default ConfirmOTP