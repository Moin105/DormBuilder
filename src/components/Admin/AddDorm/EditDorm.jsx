import React,{useContext, useEffect,useState} from 'react';
import logout from './assets/logout.png';
import images from './assets/image.png';
import imageCompression from 'browser-image-compression';
import './AddDorm.css'
import axios from 'axios';
import { MdKeyboardBackspace, MdVerticalAlignBottom } from "react-icons/md";
import { Link ,useNavigate,useLocation} from 'react-router-dom';
import Footer from '../../utils/Footer/Footer';
import Form from 'react-bootstrap/Form';
import UserContext from '../../../Context';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
const EditDorm = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    // const { user, setUser } = useContext(UserContext);
    // const updateUser = (user) => {
    //     setUser(user);
    //   };
      const [formData, setFormData] = useState({
        id: "",
        description: "",
        rent_details: "",
      });
      useEffect(() => {
        // console.log(user)
      }, [])
      const navigate = useNavigate();
      const handleRouteChange = (url, datas) => {
          navigate(url, { state: { data: datas } });
        };
      
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
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

        const handleSubmit =async (event) => {
            event.preventDefault();
            console.log(formData);
            // Here you can make a post request with the form data
            const response = await axios.post(
                `http://backend.uni-hive.net/api/edit_dorm/${data}`,
                {
                    id:formData.id,
                    description: formData.description,
                    rent_details: formData.rent_details,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            if(response.status == 200){
              handleRouteChange("/admin/manage-dorms");
            }
              console.log("wert", response.data);
          };
          const getUser = async (id) => {
            try {
              // Make a POST request with axios
              const response = await axios.post(
                "http://backend.uni-hive.net/api/get_specific_dorm",
                {
                    dorm_id: id,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
        
              console.log("wert", response.data.dorms);
        
              setFormData({
                id:response.data.dorms.id,
                description: response.data.dorms.description,
                rent_details: response.data.dorms.rent_details,
              });
        
            } catch (error) {
              console.error("Failed to update student:", error);
            }
          };
          useEffect(() => {
            getUser(data);
            console.log("qwertyu", data);
          }, []);
        // const token = localStorage.getItem("token")
        const token =  useSelector((state) => state.token);
        // const handleSubmit = (event) => {
        //     event.preventDefault();
        //    console.log(formData)
        //     postData(`http://backend.uni-hive.net/api/edit_dorm/${data}`,formData,token,image)
        //     // Call the POST API with finalFormData heres
        //   };
    return (
        <>
            <div className="LoginNavbar">
                <div className="backBtn float-start" >
                    <span ><Link className="backIcon" to="/admin/dashboard"><MdKeyboardBackspace /></Link></span>
                </div>
                <h5>United Dorms</h5>

                <div className="logoutButton">
                    <img src={logout} alt="" />
                </div>
            </div>

            <div className="addBlogMain">
                <div className="container">
                    <h1>Edit  Dorm</h1>
                    <div className="inputs">

                        <div className="input">
                            <input type="text" id='dormId' name='id' placeholder="Enter Dorm ID" 
                               value={formData.id}
                               onChange={handleInputChange}/>
                        </div>

                        <div className="input">
                            <textarea      value={formData.description}
            onChange={handleInputChange} id="" cols="30" name="description" rows="10" placeholder="Enter Dorm Detail"></textarea>
                        </div>

                        <div className="input">
                            <button className='btn btn-map'>Select Location Via Maps</button>

                        </div>



                        {/* <div className="input inputFile">
                            <input  onChange={(e) => {
        handleImageChange(e, "image");
    }}name='image' type="file" className="hiddenInput" />
                            <div className="overflowText">
                                <p>Add Image Or Video</p>

                                <img className="placeholderImage" src={images} alt="" />

                            </div>
                        </div> */}

                        <div className="radioSelect">
                            <h5>Choose The Type Of Room</h5>

                            <div className="row">
                                <div className="col-lg-6">
                                    <Form.Check
                                        inline
                                        label="Single Room"
                                        type="radio"
                                    />

                                </div>
                                <div className="col">
                                    <Form.Check
                                        inline
                                        label="Double Room"
                                        type="radio"
                                    />

                                </div>
                                <div className="col">
                                    <Form.Check
                                        inline
                                        label="Single Room"
                                        type="radio"
                                    />

                                </div>
                            </div>


                        </div>



                        <div className="input">
                            <input     value={formData.rent_details}
            onChange={handleInputChange} type="text" id='dormId' name="rent_details" placeholder="Enter Rent Details $$$" />
                        </div>

                        <div className="input">
                            <button onClick={handleSubmit} className='addDorm'>Save</button>
                        </div>

                    </div>
                </div>
            </div>

            {/* FOOTER */}
            <Footer />
        </>
    )
}

export default EditDorm