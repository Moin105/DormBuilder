import React,{useEffect,useState,useMemo} from 'react';
import './Dashboard.css';
import { FiArrowRight } from 'react-icons/fi';
import why4 from '../../Home/assets/why4.jpg'
import logouts from './assets/logout.png'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { useSelector,useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import Cookies from 'js-cookie';
import { Button, Container, Card } from 'react-bootstrap';
const Dashboard = () => {
    // const token = localStorage.getItem("token");
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token);
    const [datas, setDatas] = useState([]);
    const navigate = useNavigate();
    const handleRouteChange = (url, datas) => {
        navigate(url, { state: { data: datas } });
      };
      const handleLogout = () => {
        // Clear auth state in Redux
        dispatch(logout());
      };
    const fetchDatas = async () => {
        try {
            const response = await axios.get('http://backend.uni-hive.net/api/get_all_blogs', {

                headers: {
                    "Authorization": `Bearer ${token}` }
            });
             setDatas(response.data);
            console.log(datas);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
    
        fetchDatas();
    }, []);
    const memoizedDatas = useMemo(() => datas, [datas]);


    // useEffect(() => {

    // }, []);
    // console.log("memoizedData", memoizedData);

    return (
        <>
            <div className="LoginNavbar">
                <h5>United Dorms</h5>

                <div className="logoutButton" onClick={()=>{handleLogout();handleRouteChange("/login")}}>
                    <img src={logouts} alt="" />
                </div>
            </div>


            {/* Dashboard  */}

            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        {/* <div className="col-sm-12 col-md-6 col-lg-6 p-5">

                            <h1>Dashobard</h1>
                            <h5 className="link">Welcome Back</h5>

                        </div> */}
                        <Card className="mb-4 p-3 text-center">
                <Card.Title className="display-4"><h1>Welcome Back!</h1></Card.Title>
                <Card.Text><p className="link">This is your Dashboard, you can navigate from here.</p></Card.Text>
            </Card>
                        <div className="col-sm-12 col-md-6 col-lg-6 p-5 dashboardButtons d-flex flex-column justify-content-around">
{/* /admin/manage-blogs */}
         
                            <Link style={{margin:"0 auto"}} to='/admin/add-dorm'><Button className="dashboardBtn"> Add New Dorm</Button></Link> <br />
                            <Link style={{margin:"0 auto"}} to='/admin/manage-dorms'><Button className="dashboardBtn"> Manage Dorms</Button></Link> <br />
                            <Link style={{margin:"0 auto"}} to='/admin/manage-blogs'><Button className="dashboardBtn"> Manage Blogs</Button></Link> <br />
                            <Link style={{margin:"0 auto"}} to='/admin/add-blog'><Button className="dashboardBtn"> Add New Blog</Button></Link> <br />
                            <Link style={{margin:"0 auto"}} to='/admin/manage-students'><Button className="dashboardBtn"> Manage Students</Button></Link>

                        </div>


                    </div>
                </div>
            </div>

            {/* Dashboard Stats */}

            {/* <section className="dashboardStats">
                <div className="container">
                    <h5>Quick Stats</h5>

                    <div className="row mt-5">

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="statsCard">
                                <h6>Total Bookings</h6>
                                <h1>28,523</h1>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="statsCard">
                                <h6>Pending Approval</h6>
                                <h1 className="colorDanger">12</h1>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="statsCard">
                                <h6>New Students This Month</h6>
                                <h1>89 <span className="link statsGraph"> <BiTrendingUp /></span></h1>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="statsCard">
                                <h6>Returning Students</h6>
                                <h1>47% <span className="colorDanger statsGraph"> <BiTrendingDown /></span></h1>
                            </div>
                        </div>



                    </div>
                </div>
            </section> */}


            {/* Dashboard Cards */}

            <section className="dashboardCards">
                <div className="container p-5">
                    {/* <div className="row">

                        
                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="dashboardCard">
                                <h5>Amanda Chavez</h5>

                                <small>Service</small>
                                <p>Physiotherapy</p>

                                <div className="dashboardCardTime d-flex justify-content-between">
                                    <div className="timeCard">
                                        <small className="date">Date</small>
                                        <p>12/12/2024</p>
                                    </div>
                                    <div className="timeCard">
                                        <small className="date">Time</small>
                                        <p>11:00 - 12:00</p>
                                    </div>
                                </div>
                                <hr />

                                <div className="dashboardCardBottom d-flex gap-4">
                                <div className="acceptBtn">
                                    <p className='accrpt'>Accept Booking</p>
                                </div>

                                <div className="acceptBtn">
                                    <p>Decline</p>
                                </div>
                                </div>


                            </div>
                        </div>


                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="dashboardCard">
                                <h5>Amanda Chavez</h5>

                                <small>Service</small>
                                <p>Physiotherapy</p>

                                <div className="dashboardCardTime d-flex justify-content-between">
                                    <div className="timeCard">
                                        <small className="date">Date</small>
                                        <p>12/12/2024</p>
                                    </div>
                                    <div className="timeCard">
                                        <small className="date">Time</small>
                                        <p>11:00 - 12:00</p>
                                    </div>
                                </div>
                                <hr />

                                <div className="dashboardCardBottom d-flex gap-4">
                                <div className="acceptBtn">
                                    <p className='accrpt'>Accept Booking</p>
                                </div>

                                <div className="acceptBtn">
                                    <p>Decline</p>
                                </div>
                                </div>


                            </div>
                        </div>


                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="dashboardCard">
                                <h5>Amanda Chavez</h5>

                                <small>Service</small>
                                <p>Physiotherapy</p>

                                <div className="dashboardCardTime d-flex justify-content-between">
                                    <div className="timeCard">
                                        <small className="date">Date</small>
                                        <p>12/12/2024</p>
                                    </div>
                                    <div className="timeCard">
                                        <small className="date">Time</small>
                                        <p>11:00 - 12:00</p>
                                    </div>
                                </div>
                                <hr />

                                <div className="dashboardCardBottom d-flex gap-4">
                                <div className="acceptBtn">
                                    <p className='accrpt'>Accept Booking</p>
                                </div>

                                <div className="acceptBtn">
                                    <p>Decline</p>
                                </div>
                                </div>


                            </div>
                        </div>


                        <div className="col-sm-12 col-md-6 col-lg-4">
                            <div className="dashboardCard">
                                <h5>Amanda Chavez</h5>

                                <small>Service</small>
                                <p>Physiotherapy</p>

                                <div className="dashboardCardTime d-flex justify-content-between">
                                    <div className="timeCard">
                                        <small className="date">Date</small>
                                        <p>12/12/2024</p>
                                    </div>
                                    <div className="timeCard">
                                        <small className="date">Time</small>
                                        <p>11:00 - 12:00</p>
                                    </div>
                                </div>
                                <hr />

                                <div className="dashboardCardBottom d-flex gap-4">
                                <div className="acceptBtn">
                                    <p className='accrpt'>Accept Booking</p>
                                </div>

                                <div className="acceptBtn">
                                    <p>Decline</p>
                                </div>
                                </div>


                            </div>
                        </div>

                    </div> */}
                       <div className="row">

                        
{
    // memoizedData?.blog?.map((item) => (
    //     <div className="col-sm-12 col-md-6 col-lg-4">
    //         <div className="blogCard">
    //             <div className="blogCardImg">
    //                 <span className="blogCardBadge">Student</span>
    //                 <img src={why4} className="img-fluid" alt="" />
    //             </div>
    //             <div className="blogCardContent">
    //                 <Link className="cardLink" to="/blog-detail"> <h5>{item.title}</h5></Link>

    //                 <div className="contentBottom">
    //                     <p>7 mins read - September 20</p>
    //                     <div className="cardIcon">
    //                         <span >
    //                             <FiArrowRight className="icon" />
    //                         </span>
    //                     </div>
    //                 </div>
    //             </div>


    //         </div>
    //     </div>
    // ))
}




</div>
                </div>
            </section>

        </>
    )
}

export default Dashboard