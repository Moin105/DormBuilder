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
import { ToastContainer,toast } from 'react-toastify'
const UserDashboard = () => {
    const student = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
      };
      const user = useSelector((state) => state.user);
      const token = useSelector((state)=> state.token)

  
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
formDatas.append("image", image);
formDatas.append("username", formData.username);
      const response =     await axios.post("https://backend.uni-hive.net/api/edit_student",   formDatas,
{
headers: {
  Authorization: `Bearer ${token}`,
},
})
      setFormData(response.data.student)
      dispatch(login(response.data));
      setEditMode(false);
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
        setImage(prevState =>{prevState =  compressedImage; return prevState})
        console.log(formData)

    } catch (error) {
      console.error(`Error compressing ${name} image:`, error);
    }
  };
    return (
        <>

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

    {editMode && <button style={{float:"right",margin:"20px 0px"}} onClick={handleSubmit}  className='heroButtonOne'>Save</button>}
  
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
                        <div className="studentInfoName">
                            <h6>Joined On {formattedDate}</h6>
                        </div>

</>}
                    </div>
                    
<ToastContainer/>

                </div>
            </div>


        </>

    )
}

export default UserDashboard