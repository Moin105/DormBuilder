import React, { useEffect, useState,useMemo } from 'react';
import { Carousel, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../utils/Footer/Footer';
import './Gallery.css';
import { BiEdit, BiSearch } from "react-icons/bi";
import { FaLaptop, FaStar, FaWifi, FaWindowMaximize } from 'react-icons/fa';
import axios from 'axios';
import Header from '../Header/Header';
import { useSelector } from 'react-redux';


const Gallery = () => {
    const navigate = useNavigate();
const role = useSelector((state) => state.role);
    const  handleDormDetails = (id)=>{
        if(token !== null ){
            if(role === "admin"){
              return  handleRouteChange(`/admin/dorm-show/${id}`,id)
            }
             if(role === "student"){
        return       handleRouteChange(`/student/dorm-show/${id}`,id)
                }
        }else{
     return       handleRouteChange(`/dorm-show/${id}`,id)
        }
    }
      const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
    const [data, setData] = useState([]);
    // const token = localStorage.getItem("token")
    const token = useSelector((state) => state.token);
    const fetchData = async () => {
        try {
           const response = await  axios.post('https://backend.uni-hive.net/api/get_all_dorms', {

                headers: {
                    "Authorization":`Bearer ${token}`  },
            });
            await setData(response.data.dorms);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    const memoizedData = useMemo(() => data, [data]);

 console.log(memoizedData)
 const [searchTerm, setSearchTerm] = useState("");
 const [selectedBedrooms, setSelectedBedrooms] = useState('');

 const handleBedroomsChange = (event) => {
    setSelectedBedrooms(event.target.value);
  };
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedBedrooms('');
  };

  const filteredData = useMemo(
    () =>
      memoizedData.filter((item) =>
        item.dorm_id?.toString().includes(searchTerm) &&
        (selectedBedrooms == '' ||
          item.rooms == parseInt(selectedBedrooms))
      ),
    [searchTerm, selectedBedrooms, memoizedData]
  );
  console.log("filteredData", filteredData);
    return (
        <>
        
            <Header/>
            {/* GALLERY MAIN */}

            <section className="galleryMain">
                <div className="carousalContent">

                    <h1 className='link'>Dorm Gallery</h1>
                    <h2>The Comfort of your <span className='link'>Home</span></h2>

                    <div className="row d-flex align-items-center" style={{justifyContent:"center"}}>
               
                        <div className="col-lg-4">
                        <Form.Check
            inline
            label="One Room"
            type="radio"
            name="bedrooms"
            value="1"
            checked={selectedBedrooms === '1'}
            onChange={handleBedroomsChange}
          />

                        </div>
                        <div className="col-lg-4">
                        <Form.Check
            inline
            label="Double Rooms"
            type="radio"
            name="bedrooms"
            value="2"
            checked={selectedBedrooms === '2'}
            onChange={handleBedroomsChange}
          />

                        </div>
                        <div className="col-lg-4">
                        <Form.Check
            inline
            label="Apartments"
            type="radio"
            name="bedrooms"
            value="3"
            checked={selectedBedrooms === '3'}
            onChange={handleBedroomsChange}
          />

                        </div>             
                    </div>
                {selectedBedrooms  !== "" && <button className='signuma' variant="primary" onClick={handleClearFilters}>
        Clear Filters
      </button>}
                </div>
                <Carousel fade className='carouselMain'>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./homeBg.jpg"
                            alt="First slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./homeBg.jpg"
                            alt="Second slide"
                        />


                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./homeBg.jpg"
                            alt="Third slide"
                        />


                    </Carousel.Item>
                </Carousel>

            </section>


            {/* Gallery Images */}
            <section className="gallerySecondary">
                <div className="container">

                    <div className="dormSearchs">
                        <div className="dormSearch">
                            <span>
                                <BiSearch />
                            </span>

                            <input type="text" onChange={handleInputChange}  className="searchInput" placeholder="Search" />
                        </div>
                    </div>

                    <div className="dormfilters">
   
                    </div>


                    <div className="row ">
                    {filteredData.length > 0  ?filteredData.map((dorm) => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4 dormGalleryCards" style={{display:"flex"}} >
                            <div className="card text-left" style={{display:"flex",flexDirection:"column",width:"100%"}}>

                                <div className="galleryCardImg">
                                    <span className="editIcon">
                                      {role =="admin" && < BiEdit  onClick={() => handleRouteChange(`/admin/edit-dorm/${dorm.id}`,dorm.id) }/>}
                                    </span>
                                 {dorm?.dorm_images[0]?.image_url ?   <img className="card-img-top" src={`https://backend.uni-hive.net/storage/${dorm?.dorm_images[0]?.image_url}`} alt="" />:<img className="card-img-top" src="./homeBg.jpg" alt="" />
}
                                    <div className="rating">

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>

                                        <div className="ratingStar">
                                            <FaStar />
                                        </div>


                                    </div>
                                </div>


                                <div className="card-body" style={{cursor:"pointer"}} onClick={() => handleDormDetails(dorm.id) }>
                                    <div  className="card-title" dangerouslySetInnerHTML={{ __html: dorm?.dorm_id}}>
                                        {/* {dorm?.dorm_id} */}
                                        </div>
                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: dorm?.description}}>
                                        {/* {dorm?.description} */}
                                        </p>

                                    <div className="cardBottom">
                                        <div className="bottomIcons">
                                            <span>
                                                <FaWifi />

                                            </span>
                                            <span>
                                                <FaWindowMaximize />

                                            </span>
                                            <span>
                                                <FaLaptop />

                                            </span>
                                        </div>
                                        <div className="cardBottomPrice">
                                            <h5>${dorm.rent_details}</h5>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                        )
                    }):   <p className="sigmerrr">No Data found</p> }
                 
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Gallery