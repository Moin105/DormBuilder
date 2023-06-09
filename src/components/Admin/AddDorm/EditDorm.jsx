import React, { useContext, useEffect, useState } from "react";
import logouts from "./assets/logout.png";
import images from "./assets/image.png";
import imageCompression from "browser-image-compression";
import "./AddDorm.css";
import axios from "axios";
import { MdKeyboardBackspace, MdVerticalAlignBottom } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../utils/Footer/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import UserContext from "../../../Context";
import Cookies from "js-cookie";
import { logout } from "../../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
const EditDorm = () => {
  const location = useLocation();
  const data = location.state ? location.state.data : null;
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(false);
  const handleLogout = () => {
    // Clear auth state in Redux
    dispatch(logout());
  };
  // const { user, setUser } = useContext(UserContext);
  // const updateUser = (user) => {
  //     setUser(user);
  //   };
  const [formData, setFormData] = useState({
    id: "",
    value: "",
    rent_details: "",
    lat:"",
    lng:"",
  });
  useEffect(() => {
    console.log(data);
  }, []);
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
    const keys = ["token", "role"];

    keys.forEach((key) => {
      // Remove key from localStorage
      localStorage.removeItem(key);

      // Remove key from cookies
      Cookies.remove(key);
    });
    if (!localStorage.getItem("token") && !Cookies.get("token")) {
      window.location.reload();
      handleRouteChange("/");
    }
  }
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button

      ["link", "image", "video"], // link and image, video
    ],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // Here you can make a post request with the form data
    const response = await axios.post(
      `https://backend.uni-hive.net/api/edit_dorm/${data}`,
      {
        id: formData.id,
        dorm_id: formData.dorm_id,
        description: value,
        rent_details: formData.rent_details,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status == 200) {
      handleRouteChange("/admin/manage-dorms");
    }
    console.log("wert", response.data);
  };
  const getUser = async (id) => {
    try {
      // Make a POST request with axios
      const response = await axios.post(
        "https://backend.uni-hive.net/api/get_specific_dorm",
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
        id: response.data.dorms.id,
        dorm_id: response.data.dorms.dorm_id,
        description: response.data.dorms.description,
        rent_details: response.data.dorms.rent_details,
        lat:response.data.dorms.lat,
        lng:response.data.dorms.lng,
      });
      setValue(response.data.dorms.description);
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };
  useEffect(() => {
    getUser(data);
    console.log("qwertyu", data);
  }, []);
  // const token = localStorage.getItem("token")
  const token = useSelector((state) => state.token);
  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //    console.log(formData)
  //     postData(`http://backend.uni-hive.net/api/edit_dorm/${data}`,formData,token,image)
  //     // Call the POST API with finalFormData heres
  //   };
  const handleMapRedirect = () => {
  
    // Replace the placeholders with the desired map coordinates or address
    if (formData.lat == (""|| null || undefined)){
         toast.error("Please add Latitude ", {
          position: toast.POSITION.TOP_CENTER,
          toastClassName: "custom-toast",
        });
    } 
    if (formData.lng == (""|| null || undefined)) 
    {
      toast.error("Please add Longitude ", {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
    }else{
      const latitude = formData.lat;
      const longitude = formData.lng;
      // console.log(formData)
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
        <Link to="/">
          <h5>Unihive Dorms</h5>
        </Link>
        <div
          className="logoutButton"
          onClick={() => {
            handleLogout();
            handleRouteChange("/login");
          }}
        >
          <img src={logouts} alt="" />
        </div>
      </div>

      <div className="addBlogMain">
        <div className="container">
          <h1>Edit Dorm</h1>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                id="dormId"
                name="dorm_id"
                placeholder="Enter Dorm ID"
                value={formData.dorm_id}
                onChange={handleInputChange}
              />
            </div>

            <div className="input">
              {/* <textarea      value={formData.description}
            onChange={handleInputChange} id="" cols="30" name="description" rows="10" placeholder="Enter Dorm Detail"></textarea> */}
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                style={{
                  margin: "20px 0px 0px 0px",
                  borderRadius: "0px 0px 20px 20px",
                  border: "1px solid black",
                  maxWidth: "370px",
                }}
              />
            </div>
        {showBtn  ?  <>
              <div className="input inputFile">
                <input
                  type="text"
                  id="lat"
                  name="lat"
                  value={formData.lat}
                  placeholder="Enter Latitude"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>
              <div className="input">
                <input
                  type="text"
                  id="lng"
                  name="lng"
                  placeholder="Enter Longitude"
                  value={formData.lng}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                />
              </div>
              <div className="input">
                {
                  <button
                    className="btn addDorm"
                    style={{ backgroundColor: "#7eb168 !important" }}
                    onClick={handleMapRedirect}
                  >
                    Select Location Via Maps
                  </button>
                }
              </div>
            </>:
            <div className="input">
              <button className="btn btn-map" onClick={()=>{setShowBtn(true)}}>Select Location Via Maps</button>
            </div>}

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
                  <Form.Check inline label="Single Room" type="radio" />
                </div>
                <div className="col">
                  <Form.Check inline label="Double Room" type="radio" />
                </div>
                {/* <div className="col">
                                    <Form.Check
                                        inline
                                        label="Apartment"
                                        type="radio"
                                    />

                                </div> */}
              </div>
            </div>

            <div className="input">
              <input
                value={formData.rent_details}
                onChange={handleInputChange}
                type="text"
                id="dormId"
                name="rent_details"
                placeholder="Enter Rent Details $$$"
              />
            </div>

            <div className="input">
              <button onClick={handleSubmit} className="addDorm">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
<ToastContainer/>
      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default EditDorm;
