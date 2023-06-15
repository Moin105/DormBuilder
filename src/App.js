import "./App.css";
import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Home from "./components/Home/Home";
import Blogs from "./components/Blogs/Blogs";
import Gallery from "./components/Gallery/Gallery";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import GalleryDetail from "./components/GalleryDetail/GalleryDetail";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import AddDorm from "./components/Admin/AddDorm/AddDorm";

import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import EditDorm from "./components/Admin/AddDorm/EditDorm";
import ManageBlogs from "./components/Admin/ManageStudents/ManageBlogs";
import AddBlog from "./components/Admin/AddBlog/AddBlog";
import Register from "./components/Auth/Register/Register";
import UserContext from "./Context";
import Cookies from "js-cookie";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import ManageStudents from "./components/Admin/ManageStudents/ManageStudents";
import { ToastContainer } from "react-toastify";
import Faqs from "./components/Faqs/Faqs";
import StudentEdit from "./components/Admin/ManageStudents/StudentEdit";
import BlogEdit from "./components/Admin/ManageStudents/BlogEdit";
import ForgetPassword from "./components/Auth/Login/ForgetPassword";
import ConfirmOTP from "./components/Auth/Login/ConfirmOtp";
import ManageDorms from "./components/Admin/ManageStudents/ManageDorms";
import Testimonials from "./components/Home/Testimonials";
import About from "./components/About/About";
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("admin");
  const GuestRoutes = [
    { path: "/", element: <Home />, name: "Home" },
    { path: "/login", element: <Login />, name: "Login" },
    { path: "/register", element: <Register />, name: "Register" },
    { path: "/forget-password", element: <ForgetPassword/>, name: "" }, 
    { path: "/blog-detail/:id", element: <BlogDetail />, name: "" },
    {path: "/blogs", element: <Blogs />, name: "" },
    {path:"/faqs",element:<Faqs/>,name:""},
    {path:"/testimonials" ,element:<Testimonials/>,name:""},
    { path: "/dorm-show/:id", element: <GalleryDetail />, name: "" },
    {path:"/about",element:<About/>,name:"About"},
    
    { path: "/dorm", element: <Gallery />, name: "" },
    { path: "/otp", element: <ConfirmOTP />, name: "" },
    // {path:'/reset-password',element:<ResetPassword/>,name:""}
  ]; 
  const AdminRoutes = [
    { path: "/admin/dashboard", element: <Dashboard />, name: "" },
    { path: "/admin/add-dorm", element: <AddDorm />, name: "" },
    { path: "/", element: <Home />, name: "Home" },
    {path:"/testimonials" ,element:<Testimonials/>,name:""},
    { path: "/admin/add-blog", element: <AddBlog />, name: "" },
    {path:'/admin/edit-dorm/:id' ,element:<EditDorm/>,name:""},
    {path:"/faqs",element:<Faqs/>,name:""},
    { path: "/blog-detail/:id", element: <BlogDetail />, name: "" },
    { path: "/admin/manage-students", element: <ManageStudents/>, name: "" },
     { path: "/dorm", element: <Gallery />, name: "" },
     {path:"/about",element:<About/>,name:"About"},
    {path:"/admin/manage-dorms" , element: <ManageDorms/> , name:""},
    {path:'/admin/manage-blogs' ,element:<ManageBlogs/>,name:''},
    {path:"/admin-profile",element:<UserDashboard/>,name:""},
    { path: "/admin/student-edit/:id", element: <StudentEdit/>, name: "" },
    { path: "/admin/dorm-show/:id", element: <GalleryDetail />, name: "" },    
    { path: "/admin/blog-detail/:id", element: <BlogDetail />, name: "" },
    { path: "/blogs", element: <Blogs />, name: "" },
    {path:"/admin/blog-edit/:id",element:<BlogEdit/>,name:""},
    { path: "/otp", element: <ConfirmOTP />, name: "" },
  ];
  const StudentRoutes = [
    { path: "/student-dashboard", element: <UserDashboard />, name: "" },
    { path: "/blogs", element: <Blogs />, name: "" },
    // { path: "/blog-detail", element: <BlogDetail />, name: "" }, student/blog-detail/
    { path: "/student/blog-detail/:id", element: <BlogDetail />, name: "" },
    { path: "/", element: <Home />, name: "Home" },
    {path:"/about",element:<About/>,name:"About"},
    {path:"/faqs",element:<Faqs/>,name:""},
    {path:"/testimonials" ,element:<Testimonials/>,name:""},

    { path: "/dorm", element: <Gallery />, name: "" },
    { path: "/otp", element: <ConfirmOTP />, name: "" },
    // { path: "/gallery-detail", element: <GalleryDetail />, name: "" },
    { path: "/student/dorm-show/:id", element: <GalleryDetail />, name: "" },
  ];
  const authenticatedRoutes = userRole == "admin" ? AdminRoutes : StudentRoutes;
// student/dorm-show/27
// const token = localStorage.getItem("token")
// const role = localStorage.getItem("role")
// const token = Cookies.get("token")
// const role = Cookies.get("role")
const token = useSelector((state) => state.token)
const role = useSelector((state) => state.role);
const user = useSelector((state) => state.user);
useEffect(() => {
     console.log("token",token)
    if(token){
      setIsAuthenticated(true)
      if(role == "student"){
        setUserRole(role)
      }else if(role == "admin"){
        setUserRole(role)
      }
    }else{
      setIsAuthenticated(false)
    }
  }, [token,role])
  useEffect(() => {
    console.log("user",user)
  }, [])
useEffect(() => {
  console.log("role",role)
  console.log("user",user)
  console.log("token",token)
}, [token,role,user])

  return (
    
    <div className="App">
      <Router>
  <Routes>
    {isAuthenticated
      ? authenticatedRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))
      : GuestRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
    <Route path="*" element={<Home />} />
  </Routes>
</Router>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/student-dashboard" element={<UserDashboard/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/blog-detail" element={<BlogDetail/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/gallery-detail" element={<GalleryDetail/>} />


           ADMIN DASHBOARD 
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route path="/admin/add-dorm" element={<AddDorm/>} />
          <Route path="/admin/add-blog" element={<AddBlog/>} />


        </Routes>
      </Router> */}
    {/* <UserContext.Provider value={{ user, setUser }}> */}
        {/* <Routes>
          {isAuthenticated
            ? authenticatedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))
            : GuestRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
          <Route path="*" element={<Home/>} />
        </Routes> */}
      {/* <Router>
          {token && role === "admin" && <Routes> { authenticatedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))} </Routes>}
          {token && role === "student" && <Routes> { authenticatedRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))} </Routes>}
          {!token && <Routes> {GuestRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))} </Routes>}
               <Route path="*" element={<Home/>} />
      </Router> */}
      {/* </UserContext.Provider> */}

    </div>
  );
}

export default App;
