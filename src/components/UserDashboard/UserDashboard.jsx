import React,{useEffect,useState} from 'react'
import './UserDashboard.css'



import logouts from './assets/logout.png'
import profile from './assets/profile.png'
import { BiEdit } from 'react-icons/bi'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import { logout } from '../../redux/slices/authSlice'
import { useSelector,useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Clear auth state in Redux
        dispatch(logout());
      };
    // const [formData, setFormData] = useState({
    //     // first_name: "",
    //     // last_name: "",
    //     username:'',
    //     college_university: "",
    //     phone_number: "",
    //     id:""
    //   });
    
    //   let userStr = Cookies.get('user');

      // Parse the string back into an object
    //   let user = JSON.parse(userStr);
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
      const user = useSelector((state) => state.user);

    //   const getUser = async (id) => {
    //     try {
    //       // Make a POST request with axios
    //       const response = await axios.post(
    //         "http://backend.uni-hive.net/api/get_student",
    //         {
    //           id: id,
    //         },
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    
    //       console.log("wert", response.data.student);
    //       let name = "Moin Latif";
    // let parts = response.data.student.name.split(' ');
    
    // let first_name = parts[0];
    // let last_name = parts[1];
    //       setFormData({
    //         username: response.data.student.username,
    //         // last_name: last_name,
    //         college_university: response.data.student.college_university,
    //         phone_number: response.data.student.phone_number,
    //         id:response.data.student.id
    //       });
    
    //     } catch (error) {
    //       console.error("Failed to update student:", error);
    //     }
    //   };
    function removeKeys() {
        // Array of keys to remove
        const keys = ['token', 'role'];
    
        keys.forEach((key) => {
            // Remove key from localStorage
            localStorage.removeItem(key);
    
            // Remove key from cookies
            Cookies.remove(key);
        });
        // if(
        //     !localStorage.getItem("token") && !Cookies.get("token")){
        //         window.location.reload();
        //         handleRouteChange("/");
        //     } 
    }
    // const  savedUser = JSON.parse(localStorage.getItem('user'));

    // console.log(savedUser);  
    useEffect(() => {
       console.log(user)    
    
      }, []);
    return (
        <>
            <div className="LoginNavbar">
                <h5>United Dorms</h5>

                <div className="logoutButton" onClick={()=>{handleLogout();handleRouteChange("/")}}>
                    <img src={logouts} alt="" />
                </div>
                  
            </div>

            <div className="userDashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-7">
                            <div className="userDashboardContent">
                                <h5>Hello</h5>
                                <h1>{user?.username}!</h1>
                                <p>Copy your bio link & paste it in your profile, <br /> to let people find you</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-5">
                            <img src={profile} alt="" />
                        </div>
                    </div>


                    <div className="studentInfoTable">
                        <div className="studentTableTop">
                            <span className='editIcon'><BiEdit /></span>
                            <h5>My Details</h5>
                        </div>

                        <div className="studentInfoName">
                            <h6>{user?.username}</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>{user?.email}</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>{user?.college_university || "University Pending"}</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>{user?.name }</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>{user?.phone_number || "no phone number"}</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>Joined On 02 Feb 2022</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>Membership Ending on 20 june 2023. <span className='ml-5 '><Link to="/" className='renewLink'>Renew It</Link></span></h6>
                        </div>


                    </div>



                </div>
            </div>


        </>

    )
}

export default UserDashboard