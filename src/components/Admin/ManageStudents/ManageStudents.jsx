// import React from 'react'
import React,{useMemo, useContext, useEffect,useState} from 'react';
import logouts from '../AddDorm/assets/logout.png';
// import images from '../AddDorm/assets/image.png';
import images from '../AddDorm/assets/image.png'
import imageCompression from 'browser-image-compression';
import './ManageStudents.css'
import axios from 'axios';
import { MdKeyboardBackspace, MdVerticalAlignBottom } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../utils/Footer/Footer';
import Form from 'react-bootstrap/Form';
import UserContext from '../../../Context';
import Cookies from 'js-cookie';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
function ManageStudents() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Clear auth state in Redux
        dispatch(logout());
      };
    const openModal = (userId,role) => {
        setUserToDelete(userId)
        setRole(role);
        setModalOpen(true);
    };

    const closeModal = () => {
        setUserToDelete(null);
        setRole(null);
        setModalOpen(false);
    };

    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    const [data,setData]=useState(null)
    const token = useSelector((state) => state.token);
    // const token = localStorage.getItem("token");
    const getData = async () => {
        try {
          const response = await axios.get(
            "https://backend.uni-hive.net/api/all_students",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return setData(response.data.students);
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      };
      function removeKeys() {
        // Array of keys to remove
        const keys = ['token', 'role'];
    
        keys.forEach((key) => {
            // Remove key from localStorage
            localStorage.removeItem(key);
    
            // Remove key from cookies
            Cookies.remove(key);
            if(
                !localStorage.getItem("token") && !Cookies.get("token")){
        
                    handleRouteChange("/login");
                } 
        });
    }
      useEffect(() => {
       getData()
       console.log(data)
      }, [])
      const memoizedData = useMemo(() => data, [data]);
      const deleteUser = async (id) => {
       
        try {
            // Make a POST request with axios
            const response = await axios.post('https://backend.uni-hive.net/api/delete_student', {

                id: id
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
       console.log("wert",response)
       if(response.status == 200){
        getData();
        closeModal();   
       }
        } catch (error) {
            console.error('Failed to update student:', error);
        }
   
    };
      
    const [datas, setDatas] = useState([]);
    // const navigate = useNavigate();
    // const handleRouteChange = (url, datas) => {
    //     navigate(url, { state: { data: datas } });
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
        if(
            !localStorage.getItem("token") && !Cookies.get("token")){
                window.location.reload();
                handleRouteChange("/");
            } 
    }


  return (
    <>
       <div className="LoginNavbar">
                <div className="backBtn float-start" >
                    <span ><Link className="backIcon" to="/admin/dashboard"><MdKeyboardBackspace /></Link></span>
                </div>
                <Link  to="/"> 
        <h5>Unihive Dorms</h5>
        </Link>
                <div className="logoutButton" onClick={()=>{handleLogout();handleRouteChange("/login")}}>
                    <img src={logouts} alt="" />
                </div>
            </div>
            <div className="addBlogMain">
                <div className="container">
                    <h1>Manage Students</h1>
                    <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Student Name</th>
                    {/* <th>Dorm Details</th>
                    <th>Subscription</th> */}
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {memoizedData?.map((student,index) => (
                    <tr key={student.id}>
                        <td>{index+1}</td>
                        <td>{student.name}</td>
                        {/* <td></td>
                        <td></td> */}
                        <td>
                            <button onClick={() => handleRouteChange(`/admin/student-edit/${student.id}`,student.id) }>Edit</button>
                            {/* <button onClick={() =>  deleteUser(student.id)}>Delete</button> */}
                            <button onClick={() => openModal(student.id,"student")}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>   
        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
                <h1>Delete</h1>
                <p>Are you sure you want to delete this user?</p>
                <div>
                <button onClick={()=>deleteUser(userToDelete)}>Confirm</button>
                <button onClick={closeModal}>Cancel</button>
                </div>
               
            </CustomModal>
                </div>
            </div>    
    </>
  )
}

export default ManageStudents


const CustomModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close-button" onClick={onClose}>X</button>
          {children}
        </div>
      </div>
    );
  };