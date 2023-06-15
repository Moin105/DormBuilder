import React, { useContext, useEffect, useState } from "react";
import logouts from "./assets/logout.png";
import images from "./assets/image.png";
import imageCompression from "browser-image-compression";
import "./AddDorm.css";
import { Spinner,Button, Modal } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { MdKeyboardBackspace, MdVerticalAlignBottom } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../utils/Footer/Footer";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';

import UserContext from "../../../Context";
// import { Toast } from "react-toastify/dist/components";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import Cookies from "js-cookie";
const AddDorm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [save,setSaved] = useState("Save")
  const [status ,setStatus] = useState({});
  const [selectedOption, setSelectedOption] = useState('1');
  
  const [errors, setErrors] = useState([]);
  const token = useSelector((state) => state.token);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    lat:"",
    long:"",
    rent_details: "",
  });
  // useEffect(() => {}, []);
  const dispatch = useDispatch();
  const handleLogout = () => {
      // Clear auth state in Redux
      dispatch(logout());
    };
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleRouteChange = (url, datas) => {
    navigate(url, { state: { data: datas } });
  };
  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };
  function validateForm(formData, image) {
    const allerrors = [];
     console.log(formData)
    // check for empty fields
    if (formData.id =="") allerrors.push("Dorm ID is required");
    if (formData.description =="") allerrors.push("Description is required");
    if (formData.rent_details =="") allerrors.push("Rent details are required");
    if (formData.lat =="") allerrors.push("Latitude is required");  
    if (formData.long =="") allerrors.push("Longitude is required");  

    // check if email is valid
    // if (formData.id && !formData.id.includes("@")) allerrors.push("Dorm ID must be a valid email");
  
    // check if image is present
    if (image == []) allerrors.push("Image is required");
    console.log(allerrors)
     setErrors(prevState => {prevState =allerrors; return prevState})
    return allerrors;
}

// Then, before submitting the form, you can call this function and handle the errors:
// const errors = validateFormData(formData, images);
// if (errors.length > 0) {
// } else {
//     // If no errors, continue with form submission...
// }

  // const [image, setImage] = useState(null);
  const postData = async (url, data, token, image,bedrooms) => {

    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("description", data.description);
    formData.append("bedrooms", bedrooms);
    formData.append("lat", data.lat);
    formData.append("long", data.long);
    // formData.append("images", image);
    images.forEach((item, index) => {
      formData.append(`images[${index}]`, item.file);
    });
    formData.append("rent_details", data.rent_details);
    console.log(data, formData, image);



    try {
      const response = await axios.post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("API response:", response);
      if (response.status == 200) {
        setStatus(response.data);
        // handleOpenModal();
        setSaved("Saved")
        setTimeout(() => {
            handleRouteChange('/admin/dashboard')
        }, 2000);
      } else {
      }
      // Handle success response heres
    } catch (error) {
      console.error("API error:", error);
      // Handle error response here
    }finally{
      setIsLoading(false);
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageChange = async (event, name) => {
  const file = event.target.files[0];

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    let compressedFile = null;

    if (file.type.startsWith('image/')) {
      // Compress image files
      compressedFile = await imageCompression(file, options);
    } else if (file.type.startsWith('video/')) {
      // Handle video files (no compression needed)
      compressedFile = file;
    } else {
      console.error('Invalid file type');
      return;
    }

    console.log(`Compressed ${name}:`, compressedFile);

    // Upload the compressed file to the server or save it to the state
    // ...

    setImages((prevImages) => [...prevImages, { name, file: compressedFile }]);
  } catch (error) {
    console.error(`Error compressing ${name}:`, error);
  }
};

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index)); 
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formDatas = new FormData();
    formDatas.append("id", formData.id);
    formDatas.append("description", formData.description);
    formDatas.append("image", images);
    formDatas.append("rent_details", formData.rent_details);
    formDatas.append("lat", formData.lat);
    formDatas.append("long", formData.long);
    // formData.append("bedrooms", selectedOption);
    console.log( formDatas, images);
    console.log(formData);
    const newErrors = validateForm(formData, images);
    console.log(newErrors)
    if (formData.id == "" || formData.description == "" || formData.rent_details == "" || images == []) {
      toast.error("Please fill all fields", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
      setErrors(prevState => {prevState =newErrors; return prevState})
      // handleOpenModal();
      console.log("first error", errors)
        // setErrors(newErrors);
    } else {
        postData("https://backend.uni-hive.net/api/add_new_dorm",formData,token,images,selectedOption);
        setErrors([]); // clear errors after successful submission
    }
    // postData(
    //   "http://backend.uni-hive.net/api/add_new_dorm",
    //   formData,
    //   token,
    //   images
    // );
  };
  const handleMapRedirect = () => {
  
    // Replace the placeholders with the desired map coordinates or address
    if (formData.lat == ""){
         toast.error("Please add Latitude ", {
          position: toast.POSITION.TOP_CENTER,
          toastClassName: "custom-toast",
        });
    }else if ( formData.long == "") 
    {
      toast.error("Please add Longitude ", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
    }else{
      const latitude = formData.lat;
      const longitude = formData.long;
      const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}`;

      window.location.href = mapUrl;
    }
  };
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
        <Link  to="/"> 
        <h5>United Dorms</h5>
        </Link>
        <div className="logoutButton" onClick={()=>{handleLogout();handleRouteChange("/login")}}>
          <img src={logouts} alt="" />
        </div>
      </div>

      <div className="addBlogMain">
        <div className="container">
          <h1>Add New Dorm</h1>
         <div className="inputs">
            <div className="input">
              <input
                type="text"
                id="dormId"
                name="id"
                placeholder="Enter Dorm ID"
                onChange={(e) => {
                  handleInputChange(e, "id");
                }}
              />
            </div>

            <div className="input">
              <textarea
                onChange={(e) => {
                  handleInputChange(e, "description");
                }}
                id=""
                cols="30"
                name="description"
                rows="10"
                placeholder="Enter Dorm Detail"
              ></textarea>
            </div>
            <div className="input inputFile">
            
            <input
                type="text"
                id="lat"
                name="lat"
                placeholder="Enter Latitude"
                onChange={(e) => {
                  handleInputChange(e, "lat");
                }}
              /> 
             </div>
             <div className="input">
              <input
              type="text"
              id="long"
              name="long"
              placeholder="Enter Longitude"
              onChange={(e) => {
                handleInputChange(e, "long");
              }}
            />
            </div>
            <div className="input">
          {    <button className="btn addDorm" style={{backgroundColor:"#7eb168 !important"}} onClick={handleMapRedirect}>Select Location Via Maps</button>}
          
            </div>

            <div className="input inputFile">
              <input
                onChange={(e) => {
                  handleImageChange(e, "image");
                }}
                name="image"
                type="file"
                className="hiddenInput"
              />
              <div className="overflowText">
                <p>Add  Image</p>

                <img className="placeholderImage" src={images} alt="" />
              </div>
            </div>
            
            <div className="input inputFile">
              <input
                onChange={(e) => {
                  handleImageChange(e, "video");
                }}
                name="image"
                type="file"
                className="hiddenInput"
              />
              <div className="overflowText">
                <p>Add Video</p>

                <img className="placeholderImage" src={images} alt="" />
              </div>
            </div>
           <div className="images-gallery">
            {/* {images?.map((img, index) => (
      <div key={index}  className="figure">
        <img src={URL.createObjectURL(img?.image|| img?.video)} alt="" />
        <button className="remove" onClick={() => handleRemoveImage(index)}><MdClose/></button>
      </div>
    ))} */}
              {images?.map((item, index) => (
      <div key={index} className="figure">
        {item.name === 'image' && (
          <img src={URL.createObjectURL(item.file)} alt={`Image ${index}`} />
        )}
        {item.name === 'video' && (
          <video controls >
            <source src={URL.createObjectURL(item.file)} type={item.file.type} />
          </video>
        )}
        </div>
        ))}
            </div> 
            <div className="radioSelect">
              <h5>Choose The Type Of Room</h5>

              <div className="row" style={{display:"flex"}}>
           <div className="col-lg-6" style={{width:"45%"}}>
          <input
            type="radio"
            value="1"
            checked={selectedOption == '1'}
            onChange={handleOptionChange}
          />
          One Room:
        </div>
        <div className="col-lg-6" style={{width:"45%"}}>
          <input
            type="radio"
            value="2"
            checked={selectedOption == '2'}
            onChange={handleOptionChange}
          />
          Double Room :
        </div>
     {/* <div className="col-lg-6">
:
          <input
            type="radio"
            value="3"
            checked={selectedOption === 'option3'}
            onChange={handleOptionChange}
          />
        </div> */}
        {/* <input type="submit" value="Submit" /> */}
      
                {/* <div className="col-lg-6">
                  <Form.Check inline label="Single Room" type="radio" />
                </div>
                <div className="col">
                  <Form.Check inline label="Double Room" type="radio" />
                </div>
                <div className="col">
                  <Form.Check inline label="Single Room" type="radio" />
                </div> */}
              </div>
            </div>

            <div className="input">
              <input
                onChange={(e) => {
                  handleInputChange(e, "rent_details");
                }}
                type="text"
                id="dormId"
                name="rent_details"
                placeholder="Enter Rent Details $$$"
              />
            </div>

            <div className="input">
              <button onClick={handleSubmit} className="addDorm">
              { isLoading ? (
        <Spinner animation="border" role="status">
          {/* <span className="sr-only">Loading...</span> */}
        </Spinner>
      ) : (
        <> {save}</>
      )} 
               
              </button>
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
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default AddDorm;
