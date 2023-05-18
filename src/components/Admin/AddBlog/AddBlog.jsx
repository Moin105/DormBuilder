import React, { useState,useEffect } from 'react';
import './AddBlog.css'

import logout from './assets/logout.png'
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link,useNavigate } from 'react-router-dom';
import image from './assets/image.png';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Cookies from 'js-cookie';

const AddBlog = () => {
    // let YOUR_ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmYxYWNiOTVmMjRjNzFkMGI5NTlmZjRmZGUwNmI1MTNmYjc3ZDMyYzFiYTIwZTEwYTVmNTc2MDNkMTFmOWYyZDljNGNmM2RiNDFmMjc4MjUiLCJpYXQiOjE2ODQwNzk5MjUuMDMwMDczLCJuYmYiOjE2ODQwNzk5MjUuMDMwMDc1LCJleHAiOjE3MTU3MDIzMjUuMDI1NDg0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.lCFyKORnlLCOnwEFXNkdGitwZCQ4M8q48tiaU_EgwOPhNGXqq2B-q06bCWFLAIlkqGv5qGI2Wc8S8tpJTRvvoQSX28AXWKy6govP0fMA0lalij8p7TGuPJT4glGS8gJHwjY0hm52w7R6tlZC9grsGZBpOiHaSxfmhPcdBYopQNFZbIrUfx_erS1knuwgETvuyhG-9IzrjzoqTre3t5b-XZiMw2134UQ1Nsaif_pm4HIArKrLKm4ViSqP0jRXF2WES3g-HIeiK_IVKSzCLuZLW-OG_gF53kndc2M9G_VjNRnQfmx5X0DB6t8Pq5Ow0nidnrYjjtheekR0P8pXGrrBloKroVP77gTeq8OitQYfOiiHmIreXYWY19j6tPi0xKOLn4mVcs3drtvDqfvlVsgeuEgSLm7sUOFCrjAYBVb3jreUiXYMpaAH20fjQA8CbkSdv4YlpHPzDnLCxcdxsBZ8c-hlZq4ZrH_L5xoLNO7yZh8ZCmjxRV-ewqLMEE2zCtC6_R-5Lu6h6N4yXIvdNXWEdJItcpKDHtYpvmACCzIW12OiZTtkkbL3uB2fuR6hNMQJbeyibspqayGMXh0uQ93lRa2HNK4a-HLgp7wG_nTk8S9SI3o4QJDHvgJiAW6OaeDNPEsII-ty4DIxuNUB1utlVT1_qSRDk_AYc5tZG-F9ADA';
    const navigate = useNavigate();
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
  const handleInputChange = (event, fieldName) => {
    setFormData({ ...formData, [fieldName]: event.target.value });
  };
  
  const [image,setImage]= useState(null)
const postData = async (url,data,token,image) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('body', data.body);
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
        postData("http://backend.uni-hive.net/api/add_new_blog_post",formData,token,image)
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
                    <h1>Add New Blog Post</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" id='dormId' name='title'  onChange={(e) => {
                                handleInputChange(e, "title");
                              }} placeholder="Add a title" />

                        <div className="input">
                            <textarea name="body" onChange={(e) => {
            handleInputChange(e, "body");
          }} id=""  cols="30" rows="10" placeholder="Enter Dorm Detail"></textarea>
                        </div>

                        <div className="input inputFile">
                            <input type="file" onChange={(e) => {
        handleImageChange(e, "image");
    }}name='image'  className="hiddenInput" />
                            <div className="overflowText">
                                <p>Add Image Or Video</p>

                                <img className="placeholderImage" src={image} alt="" />

                            </div>
                        </div>
                        <div className="input">
                            <button onClick={handleSubmit} className='addDorm' type='submit'>Save</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default AddBlog