import React ,{useEffect,useState}from 'react';
import './BlogDetail.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link,useLocation } from 'react-router-dom'
import why4 from './assets/why4.jpg';
import Footer from '../utils/Footer/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import AddComments from '../Admin/AddDorm/AddComments';
const BlogDetail = () => {
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [blogData,setBlogData] = useState(null)
    const [toggleButton, setToggleButton] = useState('hide')
//    const token = localStorage.getItem("token")
const token = useSelector((state) => state.token);
    // const handleButton = () => {
    //     console.log('as');
    //     setToggleButton('show')
    // }
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
          setBlogData(response.data.blog)

    
        } catch (error) {
          console.error("Failed to update student:", error);
        }
      };
    useEffect(() => {
        getUser(data);
     console.log(data)

    }, [])
  
    const formatContent = (content) => {
        if (!content || typeof content !== 'string') return [];
      
        return content.split(/\r?\n/).map((line, i) => {
          if (line.trim().startsWith(`${i+1}.`)) {
            return <li key={i}>{line}</li>;
          } else {
            return <p key={i}>{line}</p>;
          }
        });
      }
    return (
        <>
          
                <Header/>

            {/* BLOG DETAIL MAIN */}
            <div className="blogSecondImage">
                      {blogData?.featured_image_url ?  <img src={`https://backend.uni-hive.net/storage/${blogData?.featured_image_url}`} width="100%" height="400px" alt="blogSecondImage" />:<img src={why4} width="100%" height="400px" alt="blogSecondImage" />
                }    </div>
            {/* <section className="blogDetailMain" > */}
            {/* <section className="blogDetailMain" style={{ position: 'relative', backgroundImage: `linear-gradient(to bottom, #ffffff84 , #ffffff41) ,url(${why4})`, height: "60vh", backgroundRepeat: "no-repeat", width: "100%", backgroundSize: 'cover', backgroundPosition: 'center' }}> */}

                <div className="container">
                    <div className="blogDetailMainTitle">
                        <h1>{blogData?.title}</h1>
                    </div>
                </div>
            {/* </section> */}

            {/* BLOG DETAIL */}
            <section className="blogDetail mt-5">

                <div className="container">
                    {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta atque voluptatum autem ut maiores. Officiis reiciendis quas accusamus similique aliquam, laborum voluptatum repudiandae illo fugiat aperiam unde labore nisi quasi!</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p>
                    <br />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus laboriosam atque amet porro facere perferendis cupiditate obcaecati recusandae maiores architecto minima, quos aperiam, incidunt similique modi dolore quibusdam ullam itaque.</p> */}
                   
<br></br>
<p dangerouslySetInnerHTML={{ __html: blogData?.body }}></p>
                   {/* <p dangerouslySetInnerHTML={{ __html: blogData?.body }} > */}

                     {/* {blogData?.body} */}
                    {/* </p> */}
                    <br />
                </div>
            <AddComments dorm_id={data}user_id={blogData}/>


            </section>




            {/* FOOTER */}
            <Footer />
        </>
    )
}

export default BlogDetail