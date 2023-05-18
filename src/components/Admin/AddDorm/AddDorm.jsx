import React,{useContext, useEffect,useState} from 'react';
import logout from './assets/logout.png';
import images from './assets/image.png';
import imageCompression from 'browser-image-compression';
import './AddDorm.css'
import axios from 'axios';
import { MdKeyboardBackspace, MdVerticalAlignBottom } from "react-icons/md";
import { Link ,useNavigate} from 'react-router-dom';
import Footer from '../../utils/Footer/Footer';
import Form from 'react-bootstrap/Form';
import UserContext from '../../../Context';
import Cookies from 'js-cookie';
const AddDorm = () => {
    const { user, setUser } = useContext(UserContext);
    const updateUser = (user) => {
        setUser(user);
      };
      const [formData, setFormData] = useState({
        id: "",
        description: "",
        rent_details: "",
      });
      useEffect(() => {
        console.log(user)
      }, [])
      const navigate = useNavigate();
      const handleRouteChange = (url, datas) => {
          navigate(url, { state: { data: datas } });
        };
      const handleInputChange = (event, fieldName) => {
        setFormData({ ...formData, [fieldName]: event.target.value });
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
      const [image,setImage]= useState(null)
    const postData = async (url,data,token,image) => {
        const formData = new FormData();
        formData.append('id', data.id);
        formData.append('description', data.description);
        formData.append('image', image);
        formData.append('rent_details', data.rent_details);
        console.log(data,formData,image,)
          try {
           
            const response = await axios.post(url,data,{
              headers: {
                //   "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
              }});
            console.log('API response:', response);
            if(response.status == 200){
              
            }else{

            }
            // Handle success response heres
          } catch (error) {
            console.error('API error:', error);
            // Handle error response here
          }
        };
        const  handleImageChange =async (event, name) => {
      
            const imageFile = event.target.files[0];
    
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };
          
            try {
              const compressedImage = await imageCompression(imageFile, options);
              console.log(`Compressed ${name} image:`, compressedImage);
              if(name==='image'){
                setImage(prevState =>{prevState =  compressedImage; return prevState})
              }
              // Upload the compressed image to the server or save it to the state
              // ...
            } catch (error) {
              console.error(`Error compressing ${name} image:`, error);
            }

        }
        const token = localStorage.getItem("token")
        const handleSubmit = (event) => {
            event.preventDefault();
           console.log(formData)
            postData("http://backend.uni-hive.net/api/add_new_dorm",formData,token,image)
            // Call the POST API with finalFormData heres
          };
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
                    <h1>Add New Dorm</h1>
                    <div className="inputs">

                        <div className="input">
                            <input type="text" id='dormId' name='id' placeholder="Enter Dorm ID" 
                              onChange={(e) => {
                                handleInputChange(e, "id");
                              }}/>
                        </div>

                        <div className="input">
                            <textarea    onChange={(e) => {
            handleInputChange(e, "description");
          }} id="" cols="30" name="description" rows="10" placeholder="Enter Dorm Detail"></textarea>
                        </div>

                        <div className="input">
                            <button className='btn btn-map'>Select Location Via Maps</button>

                        </div>



                        <div className="input inputFile">
                            <input  onChange={(e) => {
        handleImageChange(e, "image");
    }}name='image' type="file" className="hiddenInput" />
                            <div className="overflowText">
                                <p>Add Image Or Video</p>

                                <img className="placeholderImage" src={images} alt="" />

                            </div>
                        </div>

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
                            <input    onChange={(e) => {
            handleInputChange(e, "rent_details");
          }} type="text" id='dormId' name="rent_details" placeholder="Enter Rent Details $$$" />
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

export default AddDorm