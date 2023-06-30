import React, { useState,useEffect } from 'react';
import './AddBlog.css'
import { Spinner,Button, Modal } from "react-bootstrap";
import logouts from './assets/logout.png'
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link,useNavigate } from 'react-router-dom';
import image from './assets/image.png';
import { FaPlus, FaImage, FaVideo } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Cookies from 'js-cookie';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';

const AddBlog = () => {
    // let YOUR_ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmYxYWNiOTVmMjRjNzFkMGI5NTlmZjRmZGUwNmI1MTNmYjc3ZDMyYzFiYTIwZTEwYTVmNTc2MDNkMTFmOWYyZDljNGNmM2RiNDFmMjc4MjUiLCJpYXQiOjE2ODQwNzk5MjUuMDMwMDczLCJuYmYiOjE2ODQwNzk5MjUuMDMwMDc1LCJleHAiOjE3MTU3MDIzMjUuMDI1NDg0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lCFyKORnlLCOnwEFXNkdGitwZCQ4M8q48tiaU_EgwOPhNGXqq2B-q06bCWFLAIlkqGv5qGI2Wc8S8tpJTRvvoQSX28AXWKy6govP0fMA0lalij8p7TGuPJT4glGS8gJHwjY0hm52w7R6tlZC9grsGZBpOiHaSxfmhPcdBYopQNFZbIrUfx_erS1knuwgETvuyhG-9IzrjzoqTre3t5b-XZiMw2134UQ1Nsaif_pm4HIArKrLKm4ViSqP0jRXF2WES3g-HIeiK_IVKSzCLuZLW-OG_gF53kndc2M9G_VjNRnQfmx5X0DB6t8Pq5Ow0nidnrYjjtheekR0P8pXGrrBloKroVP77gTeq8OitQYfOiiHmIreXYWY19j6tPi0xKOLn4mVcs3drtvDqfvlVsgeuEgSLm7sUOFCrjAYBVb3jreUiXYMpaAH20fjQA8CbkSdv4YlpHPzDnLCxcdxsBZ8c-hlZq4ZrH_L5xoLNO7yZh8ZCmjxRV-ewqLMEE2zCtC6_R-5Lu6h6N4yXIvdNXWEdJItcpKDHtYpvmACCzIW12OiZTtkkbL3uB2fuR6hNMQJbeyibspqayGMXh0uQ93lRa2HNK4a-HLgp7wG_nTk8S9SI3o4QJDHvgJiAW6OaeDNPEsII-ty4DIxuNUB1utlVT1_qSRDk_AYc5tZG-F9ADA';
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [save,setSaved] = useState("Save")
    const [status ,setStatus] = useState({});
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const handleLogout = () => {
        // Clear auth state in Redux
        dispatch(logout());
      };
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };


//     const [title, setTitle] = useState("");
//     const handleTitle = (e) => {
//         setTitle(e.target.value)
//         console.log(title);
//     }

//     const [description, setDescription] = useState("")
//     const handleDescription = (e) => {
//         setDescription(e.target.value)
//         console.log(description);
//     }
//     const [file, setFile] = useState(null)
//     const handleImage = (e) => {
//         setFile(e.target.files[0]);
//         console.log(file);

//     }

//     let data = {
//         title,
//         body: description,
//         image: file
//     }
//     const formData = new FormData();
//     formData.append('image', file);

//    const token = localStorage.getItem("token")
//     const addBlog = (e) => {
//         e.preventDefault();
//         axios.post('http://backend.uni-hive.net/api/add_new_blog_post', data,{
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             },
//         })
//             .then((response) => {
//                 console.log(response.data);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
const [value ,setValue] = useState("")
  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const [image,setImage]= useState(null)
const postData = async (url,data,token,image,value) => {
  setIsLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('body', value);
    formData.append('image', image);
    // formData.append('rent_details', data.rent_details);
    console.log(data,formData,image,)
      try {
       
        const response = await axios.post(url,formData,{
          headers: {
            //   "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${token}`
          }});
        console.log('API response:', response);
        if(response.status == 200){
          setStatus(response.data);
          // handleOpenModal();
          setSaved("Saved")
          setTimeout(() => {
              handleRouteChange('/admin/dashboard')
          }, 2000);
        }else{
            // console.log("eror",error)
        }
        // Handle success response heres
      } catch (error) {
        handleOpenModal()

        setStatus(prevState =>{prevState.message =  error.response.data.message;return prevState});
        console.error('API error:', error.response.data.message);
        // Handle error response here
      }finally{
        setIsLoading(false);
      }
    };


    function validateForm(formData, image) {
      const allerrors = [];
       console.log(formData)
      // check for empty fields
      if (formData.title =="") {allerrors.push(" Title is required")};
      if (value =="") {allerrors.push("Body is required");}
      // if (formData.rent_details =="") allerrors.push("Rent details are required");
  
      // check if email is valid
      // if (formData.id && !formData.id.includes("@")) allerrors.push("Dorm ID must be a valid email");
    
      // check if image is present
      if (image == []) allerrors.push("Image is required");
      console.log(allerrors)
       setErrors(prevState => {prevState =allerrors; return prevState})
      return allerrors;
  }
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
const token = useSelector((state) => state.token);   
const handleSubmit = (event) => {
        event.preventDefault();
       console.log(formData)
       event.preventDefault();
       const formDatas = new FormData();
    formDatas.append('title', formData.title);
    formDatas.append('body', value);
    formDatas.append('image', image);
       console.log( formDatas, image);
       console.log(formData);
       const newErrors = validateForm(formData, image);
       console.log(newErrors)
       if (formData.title == "" || value == "" || image == []) {
         toast.error("Please fill all fields", {
          position: toast.POSITION.TOP_CENTER,
          toastClassName: "custom-toast",
        });
        setErrors(prevState => {prevState =newErrors; return prevState})
        // handleOpenModal();
        console.log("first error", errors)
          // setErrors(newErrors);
      } else {
        postData("https://backend.uni-hive.net/api/add_new_blog_post",formData,token,image,value)
      
          setErrors([]); // clear errors after successful submission
      }
          // Call the POST API with finalFormData heres
      };

    return (
        <>
            <div className="LoginNavbar">
                <div className="backBtn float-start" >
                    <span ><Link className="backIcon" to="/admin/dashboard"><MdKeyboardBackspace /></Link></span>
                </div>
                <h5 onClick={()=>{handleRouteChange("/")}}>Unihive Dorms</h5>

                <div className="logoutButton" onClick={()=>{handleLogout();handleRouteChange("/login")}}>
                    <img src={logouts} alt="" />
                </div>
            </div>


            <div className="addBlogMain">
                <div className="container">
                    <h1>Add New Blog Post</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id='dormId' name='title'  onChange={(e) => {
                                handleInputChange(e, "title");
                              }} placeholder="Add a title" />

                        <div className="input">
                            {/* <textarea name="body" onChange={(e) => {
            handleInputChange(e, "body");
          }} id=""  cols="30" rows="10" placeholder="Enter Blog Description"></textarea> */}
                             <ReactQuill theme="snow" value={value} onChange={setValue} style={{margin:"20px auto 10px",borderRadius:"0px 0px 20px 20px",border:"1px solid black",maxWidth:"370px"}}/>

                        </div>

                        <div className="input inputFile">
                            <input type="file" onChange={(e) => {
        handleImageChange(e, "image");
    }}name='image'  className="hiddenInput" />
                            <div className="overflowText">
                                <p>Add Image Or Video</p>
                                <div style={{color:"#7eb168",fontSize:"25px",position:"absolute",right:"20px",marginTop:"-6px"}}><FaImage /></div>
                                {/* <img className="placeholderImage" src={image} alt="" /> */}

                            </div>
                        </div>
                        <div className="input">
                            <button onClick={handleSubmit} className='addDorm' type='submit'>   { isLoading ? (
        <Spinner animation="border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      ) : (
        <> {save}</>
      )} </button>
                        </div>
                    </form>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          {/* <Modal.Title>{status?.message}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <Modal.Title style={{textTransform:"capitalize"}}>{status?.message} </Modal.Title>
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Ok
          </Button>
        </Modal.Footer>
        </Modal>
        <ToastContainer />
            </div>

        </>
    )
}

export default AddBlog