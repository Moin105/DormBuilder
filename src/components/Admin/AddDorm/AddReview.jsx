import React, { useState, useEffect } from 'react';
import axios from 'axios';
import images from '../../UserDashboard/assets/profile.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './Rating';
import ReactQuill from 'react-quill';
import './quill-custom.css'
import { useSelector } from 'react-redux';
import 'react-quill/dist/quill.snow.css'; // import styles
function  AddReview({dorm_id,user_id}) {
//   const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState('');
  const [reviews, setReviews] = useState([]);
  const role = useSelector((state) => state.role);
  const [dormData,setDormData] = useState(null)
  const [values, setValues] = useState('');
  const [value, setValue] = useState('');

 const token = useSelector((state) => state.token);
  useEffect(() => {
    console.log("helos gee",dorm_id,user_id.id)
    // fetchReviews();
  }, []);
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

      console.log("wert", response.data);
      setDormData(response.data.dorms)


    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };
useEffect(() => {
    getUser(dorm_id);
 console.log(dormData)

}, [])
  // const fetchReviews = async () => {
  //   try {
  //       const formData = {
  //           dorm_id: dorm_id,
         
  //         };
  //     const response = await axios.post('https://backend.uni-hive.net/api/get_dorm_review', formData);
  //     console.log("signa",response)
  //     setReviews(response.data.dorm[0].reviews);
      
  //   } catch (error) {
  //     console.error('Error fetching reviews:', error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ( value == '' || rating == 0) {
      toast.error('Please fill in all fields and provide a rating.', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
      return;
    }

    try {
      const formData = {
        dorm_id: dorm_id,
        user_id: user_id.id,
        review: value,
        rating: rating,
      };

      const response = await axios.post('https://backend.uni-hive.net/api/add_dorm_review', formData,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
      });

      console.log('Review posted successfully:', response.data);
   
      setReview('');
      setValue('');
      setRating(0);
      // fetchReviews();
      getUser(dorm_id);
      toast.success('Review submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
      
    } catch (error) {
      console.error('Error posting review:', error);
      toast.error('Failed to submit the review. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
    }
  };
  const handleReply = async (event, reviewId) => {
    event.preventDefault();
  
    if (values == '') {
      toast.error('Please fill in all fields.', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
      return;
    }
  
    try {
      const formData = {
        review_id: reviewId,
        reply: values,
      };
  
      const response = await axios.post('https://backend.uni-hive.net/api/review_reply', formData,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
      });
  
      console.log('Reply posted successfully:', response.data);
  
      // Reset reply state
      setReply('');
      setValue('');
      setReplyingTo(null);
      getUser(dorm_id);
      // Fetch reviews again to update the list with the new reply
      // fetchReviews();
  
      toast.success('Reply submitted successfully!', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error('Failed to submit the reply. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
    }
  };
  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };
// Create a toolbar with every feature
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }], // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
    [{ 'direction': 'rtl' }], // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'], // remove formatting button

    ['link', 'image', 'video'] // link and image, video
  ]
}
  return (
    <div style={{display:"flex",flexDirection:"column",maxWidth:"1196px",margin:"0 auto"}}>
      <p>Add a Review:</p>
      <form onSubmit={handleSubmit}>
     <div className="input">
     {/* <ReactQuill theme="snow" value={reply} onChange={setReply}  /> */}
     <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />

         {/* <textarea
         style={{maxWidth:"100%"}}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          /> */}
          </div>

          Rating:
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
           <p className="text-center"><button className='heroButtonOne' type='submit'>Add Review</button></p> 
      </form>

    <h2 style={{borderBottom:"1px solid black",padding:"6px"}}>All Reviews:</h2>
      {dormData?.reviews?.length > 0 ?<> {dormData?.reviews?.map((review) => (
       <div className='row' style={{flexWrap:"nowrap",alignItems:"baseline"}}> 
       <div style={{width:"70px",height:"70px"}}>
         <img src={review?.user?.profile_image =="" ? images : `https://backend.uni-hive.net/storage/${review?.user?.profile_image}`} style={{width:"100%",objectFit:"contain"}}/>
        </div>
       
        <div style={{padding:"6px"}} key={review.id}>
          <h4 style={{fontSize:"18px"}}>{review.user.username}</h4>
          <p dangerouslySetInnerHTML={{ __html: review?.review }}>{}</p>
          <StarRating rating={review.rating}/>
          {role == "admin" ?   <button style={{border:"none",padding:"10px",background:"#7BB564",borderRadius:"10px",color:"white",fontSize:"10px"}} onClick={() => setReplyingTo(review.id)}>Reply</button>: null
}

          {review?.review_replies.map((reply)=>{return   <div className='row' style={{flexWrap:"nowrap",alignItems:"center"}}> 
          <div style={{width:"70px",height:"70px"}}>
         <img src={!reply?.user?.profile_image  ? images : `https://backend.uni-hive.net/storage/${reply?.user?.profile_image}`} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
        </div>    <div style={{padding:"6px"}} key={review.id}>
          <h4 style={{fontSize:"18px"}}>{reply?.user?.username}</h4>
          <p  dangerouslySetInnerHTML={{ __html: reply?.reply }}>{}</p>
          
          </div>
          

          </div>})}
{replyingTo === review.id && (
  <form onSubmit={(e) => handleReply(e, review.id)} style={{display:"flex",flexDirection:"column",width:"80%"}}>
          {/* <ReactQuill theme="snow" value={reply} onChange={(e) => setReply(e.target.value)} modules={modules} /> */}
          <ReactQuill theme="snow" value={values} onChange={setValues} modules={modules} />

    {/* <textarea value={reply} onChange={(e) => setReply(e.target.value)} required  style={{margin:"10px 0px"}} /> */}
    <button style={{border:"none",padding:"10px",background:"#7BB564",borderRadius:"10px",color:"white",width:"150px",margin:"10px auto",fontSize:"10px"}}  type='submit'>Submit Reply</button>
  </form>           )}

        </div>
        
        </div>  
      ))} </>:<p style={{margin:"0 auto"}}> No reviews yet.</p>}
      <ToastContainer />
    </div>
  );
}

export default AddReview;
