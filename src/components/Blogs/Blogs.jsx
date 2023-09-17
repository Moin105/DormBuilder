import React, { useEffect, useState } from "react";
import "./Blogs.css";
import { FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../utils/Footer/Footer";
import why4 from "./assets/why4.jpg";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../Header/Header";

const Blogs = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.role);
  const token = useSelector((state) => state.token);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://backend.uni-hive.net/api/get_all_blogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.blog);
      console.log("bilo",response.data.blog)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
    };
  }, []);

  const handleBlogDetails = (id) => {
    const roleUrl = role ? `/${role}/blog-detail/${id}` : `/blog-detail/${id}`;
    navigate(roleUrl, { state: { data: id } });
  };

  return (
    <>
      <Header />
      <section className="blogs">
        <div className="container">
          <h1>
            <span className="heading">The Knowledge</span> Hub
          </h1>
          <div className="row">
            {data.map((item, index) => (
              <BlogCard
                key={index}
                item={item}
                handleBlogDetails={handleBlogDetails}
                role={role}
                token={token}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

const BlogCard = ({ item, handleBlogDetails, role, token }) => {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => {
      setLoaded(true);
    };
  const handleClick = () => handleBlogDetails(item.id);
  return (
    <div onClick={handleClick} className="col-sm-12 col-md-6 col-lg-4">
      <div className="blogCard">
      <div className="blogCardImg">
          {!loaded && (
            <div className="img-placeholder skeleton-loader">
              {/* Here you can place your placeholder or loader */}
            </div>
          )}
          <img
            src={
              item.featured_image_url == null
                          ? why4
                          : ` https://backend.uni-hive.net/storage/${item.featured_image_url}`  }
            className={`img-fluid ${loaded ? '' : 'hidden'}`}
            onLoad={handleLoad}
            alt=""
          />
        </div>
        <div className="blogCardContent">
          <Link className="cardLink">
            {" "}
            <h5>{item.title}</h5>
          </Link>

          {!token && (
            <div
              className="contentBottom"
              onClick={() => handleBlogDetails(item.id)}
            >
              <div className="cardIcon">
                <span>
                  <FiArrowRight className="icon" />
                </span>
              </div>
            </div>
          )}
          {token && role == "admin" && (
            <div
              className="contentBottom"
              onClick={() => handleBlogDetails(item.id)}
            >
              <div className="cardIcon">
                <span>
                  <FiArrowRight className="icon" />
                </span>
              </div>
            </div>
          )}
          {token && role == "student" && (
            <div
              className="contentBottom"
              onClick={() => handleBlogDetails(item.id)}
            >
              <div className="cardIcon">
                <span>
                  <FiArrowRight className="icon" />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
