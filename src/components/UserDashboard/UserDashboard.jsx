import React,{useEffect,useState} from 'react'
import './UserDashboard.css'
import {GrFormClose} from 'react-icons/gr'
import logouts from './assets/logout.png'
import profile from './assets/profile.png'
import { BiEdit } from 'react-icons/bi'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import Header from '../Header/Header';
import {FaUser} from 'react-icons/fa'
import axios from 'axios'
import { logout,login } from '../../redux/slices/authSlice'
import imageCompression from 'browser-image-compression';
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { useSelector,useDispatch } from 'react-redux'

import Cookies from 'js-cookie'
import { ToastContainer,toast } from 'react-toastify'
const UserDashboard = () => {
    const navigate = useNavigate();
    const student = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Clear auth state in Redux
        dispatch(logout());
      };
 
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
      const user = useSelector((state) => state.user);
      const token = useSelector((state)=> state.token)
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
    const formattedDate = new Date(user?.created_at).toLocaleDateString('en-US', {
     year: 'numeric',
     month: 'short',
     day: '2-digit',
   });

  const [editMode, setEditMode] = useState(false);
  const [name ,setName ] = useState(null) 
  const [image,setImage] = useState(null)
const [formData, setFormData] = useState({
  username: user?.username,
  email: user?.email,
  college_university: user?.college_university,
  bio:user.bio,  
  name: user?.username,
  phone_number: user?.phone_number,
  student_id:user.id,
  image:user.profile_image
});
// const handleImageChange = (e) => {
//   // if (e.target.files && e.target.files[0]) {
//   //   let img = URL.createObjectURL(e.target.files[0]);
    
//   //   setFormData({ ...formData, image: img})
//   // }
//   if (e.target.files && e.target.files[0]) {
//     let reader = new FileReader();
    
//     reader.onloadend = () => {
//       setFormData({ ...formData, image: reader.result})
//       // setImage(reader.result);
//     }

//     reader.readAsDataURL(e.target.files[0]);
//   }
//   // if (e.target.files && e.target.files[0]) {
//   //   let reader = new FileReader();
    
//   //   reader.onloadend = () => {
//   //     setFormData({ ...formData, image: reader.result})
//   //   }

//   //   reader.readAsDataURL(e.target.files[0]);
//   // }
// };
const  handleImageChange =async (event, name) => {
  
  const imageFile = event.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedImage = await imageCompression(imageFile, options);
    console.log(`Compressed  image:`, compressedImage);
    if(name==='image'){
      // setFormData({ ...formData, image: compressedImage});
      // setFormData(prevState => {
      //   let updatedState = { ...prevState, image: compressedImage };
      //   console.log("updated state",updatedState); // Now you can see the updated state
      //   return updatedState;
      // });
      setImage(prevState =>{prevState =  compressedImage; return prevState})
      // setFormData(prevState =>{prevState.image =  compressedImage; return prevState})
      console.log(formData)
    }
    // Upload the compressed image to the server or save it to the state
    // ...
  } catch (error) {
    console.error(`Error compressing ${name} image:`, error);
  }

}
useEffect(() => {

  console.log("qweffewefewfwe",student)
}, [])

const handleSubmit = async () => {
    try {
      const formDatas = new FormData();

formDatas.append("bio", formData.bio);
formDatas.append("college_university", formData.college_university);
formDatas.append("email", formData.email);
formDatas.append("id", formData.id);
formDatas.append("name", formData.name);
formDatas.append("phone_number", null);
formDatas.append("image", image);  // Assuming you have an image file, replace "" with the file
formDatas.append("username", formData.username);
      // Make a POST request with axios to update the user details
      const response =     await axios.post("https://backend.uni-hive.net/api/edit_student",   formDatas,
{
headers: {
  Authorization: `Bearer ${token}`,
},
})
      setFormData(response.data.student)
      dispatch(login(response.data));
      // Exit the edit mode and fetch the updated user data
      setEditMode(false);
      // getUser(user?.id);
      // Fetch updated user data
      // ...
      
      // Show a success message to the user
      toast.success('Details updated successfully!', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
    } catch (error) {
      console.error('Failed to update details:', error);
      toast.error('Failed to update details. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
    }
  };
  const [fileName, setFileName] = useState("Edit Profile Picture");

  const handleFileChange =async (event) => {
    setFileName(event.target.files[0] ? event.target.files[0].name : "Edit Profile Picture");
    const imageFile = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
  
    try {
      const compressedImage = await imageCompression(imageFile, options);
      console.log(`Compressed  image:`, compressedImage);
     
        // setFormData({ ...formData, image: compressedImage});
        // setFormData(prevState => {
        //   let updatedState = { ...prevState, image: compressedImage };
        //   console.log("updated state",updatedState); // Now you can see the updated state
        //   return updatedState;
        // });
        setImage(prevState =>{prevState =  compressedImage; return prevState})
        
        // setFormData(prevState =>{prevState.image =  compressedImage; return prevState})
        console.log(formData)
      
      // Upload the compressed image to the server or save it to the state
      // ...
    } catch (error) {
      console.error(`Error compressing ${name} image:`, error);
    }
  };
    return (
        <>
            {/* <div className="LoginNavbar">
              <Link to="/Home">  <h5>UniHive Dorms</h5></Link>

                <div className="logoutButton" onClick={()=>{handleLogout();handleRouteChange("/")}}>
                    <img src={logouts} alt="" />
                </div>
                  
            </div> */}
<Header/>
            <div className="userDashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-7">
                            <div className="userDashboardContent">
                                <h5>Hello</h5>
                                <h1 style={{textAlign:"left"}}>{user?.username}!</h1>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-5" style={{display:"flex",alignItems:"center",justifyContent:"center",}}>
                          {image ?<img src={URL.createObjectURL(image) } alt=""  style={{width:"200px",height:"60%",objectFit:"contain",borderRadius:"160px"}}/> :   <img src={user.profile_image ? `https://backend.uni-hive.net/storage/${user?.profile_image}`: profile } alt=""  style={{width:"200px",height:"60%",objectFit:"contain",borderRadius:"160px"}}/>
}                        </div>
                    </div>


                    <div className="studentInfoTable">
                        <div className="studentTableTop">
                            <span onClick={() => {setEditMode(!editMode)}} className='editIcon' style={editMode ?{color:"#7eb168"} :{color:"black"}}>{!editMode ?<><p>Edit</p><BiEdit /></> :< ><p onClick={handleSubmit} >Submit</p><AiOutlineCheckCircle/></>}</span>
        
                            <h5>My Details</h5>
                        </div>

                     {editMode ? (
  // Editable form fields
  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <input
      type="text"
      placeholder='username'
      value={formData?.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    />
      <input
      type="text"
      readOnly
      placeholder="email"
      value={user?.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
      <input
      type="text"
      value={formData?.college_university}
      placeholder='university name'
      onChange={(e) => setFormData({ ...formData, college_university: e.target.value })}
    />
     <input
      type="text"
      value={formData?.bio}
      placeholder='edit bio'
      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
    />
      {/* <input
      type="file"
      placeholder='profile image'
      onChange={(e)=>{handleImageChange(e, "image")}}
    /> */}
  <div className="file-upload-wrapper">
      <p style={{position:"absolute",right:"10px"}} onClick={()=>{setImage(null)}}>
    {image &&    <GrFormClose/>}
    {!image && <FaUser color='#7BB564' style={{margin:"-5px 10px 0px 0px"}}/>}
      </p>
      <label htmlFor="profile-picture" className="file-upload-button">
        {fileName}
      </label>
      <input
        type="file"
        id="profile-picture"
        className="file-upload-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
      {/* <input
      type="text"
      value={formData?.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    /> */}
     {/* <input
      type="text"
      value={formData?.phone_number}
      style={{marginBottom:"20px"}}
      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
    /> */}
    {editMode && <button style={{float:"right",margin:"20px 0px"}} onClick={handleSubmit}  className='heroButtonOne'>Save</button>}
                         
    {/* Render other editable fields similarly */}
  </div>
) : 
<>   <div className="studentInfoName">
                            <h6>{formData?.username}</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>{user?.email}</h6>
                        </div>

                        <div className="studentInfoName">
                            <h6>{formData?.college_university || "University Pending"}</h6>
                        </div>

                        {/* <div className="studentInfoName">
                            <h6>{formData?.name }</h6>
                        </div> */}

                        {/* <div className="studentInfoName">
                            <h6>{formData?.phone_number || "no phone number"}</h6>
                        </div> */}

                        <div className="studentInfoName">
                            <h6>Joined On {formattedDate}</h6>
                        </div>

                        {/* <div className="studentInfoName">
                            <h6>Membership Ending on {updatedFormattedDate}. <span className='ml-5 '><Link to="/" className='renewLink'>Renew It</Link></span></h6>
                        </div> */}

</>}
                    </div>
                    
<ToastContainer/>

                </div>
            </div>


        </>

    )
}

export default UserDashboard