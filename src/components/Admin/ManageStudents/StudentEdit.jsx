import React, { useMemo, useContext, useEffect, useState } from "react";
import logout from "../AddDorm/assets/logout.png";
// import images from '../AddDorm/assets/image.png';
import images from "../AddDorm/assets/image.png";
import imageCompression from "browser-image-compression";
import "./ManageStudents.css";
import axios from "axios";
import { MdKeyboardBackspace, MdVerticalAlignBottom } from "react-icons/md";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Footer from "../../utils/Footer/Footer";
import Form from "react-bootstrap/Form";
import UserContext from "../../../Context";
function StudentEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const data = location.state ? location.state.data : null;
  const [student, setStudent] = useState(null);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    // first_name: "",
    // last_name: "",
    username:'',
    college_university: "",
    phone_number: "",
    id:""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    console.log(formData);
    // Here you can make a post request with the form data
    const response = await axios.post(
        "http://backend.uni-hive.net/api/edit_student",
        {
            
                username: formData.username,
                // last_name: formData.last_name,
                college_university: formData.college_university,
                phone_number: formData.phone_number,
                student_id:formData.id
              
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    if(response.status == 200){
      handleRouteChange("/admin/manage-students");
    }
      console.log("wert", response.data);
  };
  const getUser = async (id) => {
    try {
      // Make a POST request with axios
      const response = await axios.post(
        "http://backend.uni-hive.net/api/get_student",
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("wert", response.data.student);
      let name = "Moin Latif";
let parts = response.data.student.name.split(' ');

let first_name = parts[0];
let last_name = parts[1];
      setFormData({
        username: response.data.student.username,
        // last_name: last_name,
        college_university: response.data.student.college_university,
        phone_number: response.data.student.phone_number,
        id:response.data.student.id
      });

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
            <Link className="backIcon" to="/admin/dashboard">
              <MdKeyboardBackspace />
            </Link>
          </span>
        </div>
        <h5>United Dorms</h5>

        <div className="logoutButton">
          <img src={logout} alt="" />
        </div>
      </div>
      <div className="addBlogMain">
         <div className="container">
                  <h1>Edit Student</h1>
         </div>
        <div className="inputs">
        <div className="input">
        <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="username"
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

          <input
            type="text"
            name="college_university"
            value={formData.college_university}
            onChange={handleInputChange}
            placeholder="College or University"
          />  
          </div>
          
          <div className="input">

          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          </div>
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

export default StudentEdit;

{
  /* <form onSubmit={handleSubmit}>
<input
  type="text"
  name="first_name"
  value={formData.first_name}
  onChange={handleInputChange}
  placeholder="First Name"
/>
<input
  type="text"
  name="last_name"
  value={formData.last_name}
  onChange={handleInputChange}
  placeholder="Last Name"
/>
<input
  type="text"
  name="college_university"
  value={formData.college_university}
  onChange={handleInputChange}
  placeholder="College or University"
/>
<input
  type="text"
  name="phone_number"
  value={formData.phone_number}
  onChange={handleInputChange}
  placeholder="Phone Number"
/>
<button type="submit">Submit</button>
</form> */
}
