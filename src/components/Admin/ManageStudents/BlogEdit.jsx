import React, { useMemo, useContext, useEffect, useState } from "react";
import logouts from "../AddDorm/assets/logout.png";
// import images from '../AddDorm/assets/image.png';
import images from "../AddDorm/assets/image.png";
import imageCompression from "browser-image-compression";
import "./ManageStudents.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { MdKeyboardBackspace, MdVerticalAlignBottom } from "react-icons/md";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Footer from "../../utils/Footer/Footer";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Form from "react-bootstrap/Form";
import UserContext from "../../../Context";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
function BlogEdit() {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const dispatch = useDispatch();
  const handleLogout = () => {
      // Clear auth state in Redux
      dispatch(logout());
    };
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  // const token = localStorage.getItem("token");
  const token = useSelector((state) => state.token);
  const [value,setValue] = useState('')
  const [formData, setFormData] = useState({
    // first_name: "",
    // last_name: "",
    // username:'',
    // college_university: "",
    // phone_number: "",
    // id:""
    body: "",
    title: "",
    blog_id:""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log(formData);
    // Here you can make a post request with the form data
    const response = await axios.post(
        "https://backend.uni-hive.net/api/edit_blog_post",
        {
                blog_id: formData.blog_id,
                title: formData.title,  
                body: value,    
                // username: formData.username,
                // // last_name: formData.last_name,
                // college_university: formData.college_university,
                // phone_number: formData.phone_number,
                // student_id:formData.id
              
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    if(response.status == 200){
      handleRouteChange("/admin/manage-blogs");
    }
      console.log("wert", response.data);
  };
  const getUser = async (id) => {
    try {
      // Make a POST request with axios
      const response = await axios.post(
        "https://backend.uni-hive.net/api/get_specific_blog",
        {
            blog_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("wert", response.data.blog);

      setFormData({
        // username: response.data.blog.username,
        // last_name: last_name,
        body: response.data.blog.body,
        title: response.data.blog.title,
        blog_id:response.data.blog.id
      });
      setValue(response.data.blog.body) 
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };
  useEffect(() => {
    getUser(data);
    console.log("qwertyu", data);
  }, []);
  return (
    <>
      <div className="LoginNavbar">
        <div className="backBtn float-start">
          <span>
            <Link className="backIcon" to="admin/manage-blogs">
              <MdKeyboardBackspace />
            </Link>
          </span>
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
                  <h1>Edit Blog</h1>
         </div>
        <div className="inputs">
        <div className="input">
        <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="title"
          />
        </div>
         {/* <div className="input">
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
         </div> */}
          <div className="input">

          {/* <textarea
            type="text"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            placeholder="Body"
          />   */}
          <ReactQuill theme="snow" value={value} onChange={setValue} style={{margin:"20px 0px 0px 0px",borderRadius:"0px 0px 20px 20px",border:"1px solid black",maxWidth:"370px"}}/>

          </div>
          
          {/* <div className="input">

          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          </div> */}
          {/* <div className="input">
            <input
              type="text"
              id="dormId"
              name="id"
              placeholder="Enter Dorm ID"
              onChange={(e) => {
                handleInputChange(e, "id");
              }}
            />
          </div> */}

          <div className="input">
            <button onClick={handleSubmit} className="addDorm">
              Save
            </button>
          </div>
        </div>
       </div> 
    </>
  );
}

export default BlogEdit;

