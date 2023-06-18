import React, { useState, useEffect } from 'react';
import axios from 'axios';
import images from '../../UserDashboard/assets/profile.png'
import { ToastContainer, toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import './quill-custom.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css'; // import styles
import StarRating from './Rating';
import { useSelector } from 'react-redux';
function AddComments({dorm_id,user_id}) {
//   const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [values, setValues] = useState('');
  const [value, setValue] = useState('');
  const [rating, setRating] = useState(0);
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
  const [replyingTo, setReplyingTo] = useState(null);
  const [reply, setReply] = useState('');
  const [reviews, setReviews] = useState([]);
 const token = useSelector((state) => state.token);
  useEffect(() => {
    console.log("helos gee",dorm_id,user_id?.id)
    // fetchReviews();
  }, []);
  const [blogData,setBlogData] = useState(null)

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
    getUser(dorm_id);
 console.log(blogData)

}, [])
const handleReply = async (event, reviewId) => {
  event.preventDefault();

  if (values =='' || rating == 0) {
    toast.error('Please fill in all fields.', {
      position: toast.POSITION.TOP_CENTER,
      toastClassName: "custom-toast",
    });
    return;
  }

  try {
    const formData = {
      comment_id: reviewId,
      reply: values,
   
    };

    const response = await axios.post('https://backend.uni-hive.net/api/comment_reply', formData,{
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      }
    });

    console.log('Reply posted successfully:', response.data);

    // Reset reply state
    setReply('');
    setValues('');
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
  // const fetchReviews = async () => {
  //   try {
  //       const formData = {
  //           blog_id: dorm_id,
         
  //         };
  //     const response = await axios.post(`https://backend.uni-hive.net/api/get_blog_comment/${dorm_id}`, formData);
  //     console.log("signa",response)
  //     setReviews(response.data.comments);
  //   } catch (error) {
  //     console.error('Error fetching reviews:', error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ( value == '' ) {
      toast.error('Please fill in all fields and provide a rating.', {
        position: toast.POSITION.TOP_CENTER,
        toastClassName: "custom-toast",
      });
      return;
    }

    try {
      const formData = {
        blog_id: dorm_id,
        user_id: user_id?.id,
        rating: rating,
        comment: value,
        // rating: rating,
      };

      const response = await axios.post('https://backend.uni-hive.net/api/post_blog_comment', formData,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
      });

      console.log('Review posted successfully:', response.data);
      // Clear the form
    //   setName('');
      setReview('');
      setValue('');
      setRating(0);
      getUser(dorm_id);
      // Fetch updated reviews
      // fetchReviews();

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

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div style={{display:"flex",flexDirection:"column",width:"90%",maxWidth:"1196px",margin:"0 auto"}}>
      <p>Add a Comment:</p>
      <form onSubmit={handleSubmit}>
        {/* <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label> */}
         <div className="input">
         {/* <textarea
         style={{maxWidth:"100%"}}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          /> */}
                    <ReactQuill theme="snow" value={value} onChange={setValue}  />

          </div>

          Rating:
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
           <p className="text-center"><button className='heroButtonOne' type='submit'>Add Review</button></p> 
      </form>

    <h2 style={{borderBottom:"1px solid black",padding:"6px"}}>All Reviews:</h2>
      {blogData?.comments?.length > 0 ?<> {blogData?.comments?.map((review) => (
       <div className='row' style={{flexWrap:"nowrap",alignItems:"flex-start",borderBottom:"1px solid black"}}> 
       <div style={{width:"70px",height:"70px",display:"flex",alignItems:"center",justifyContent:"center"}}>
         <img src={review?.user?.profile_image =="" ? images : `https://backend.uni-hive.net/storage/${review?.user?.profile_image}`} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
        </div>
       
        <div style={{padding:"6px"}} key={review.id}>
          <h4 style={{fontSize:"18px"}}>{review.user.username}</h4>
          <p  dangerouslySetInnerHTML={{ __html: review.comment }}></p>
          <StarRating rating={review.rating}/>
          {review?.replies.map((reply)=>{return   <div className='row' style={{flexWrap:"nowrap",alignItems:"flex-start"}}> 
          <div style={{width:"40px",height:"40px"}}>
         <img src={review?.user?.profile_image =="" ? images : `https://backend.uni-hive.net/storage/${review?.user?.profile_image}`} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
        </div>    <div style={{padding:"6px"}} key={review.id}>
          <h4 style={{fontSize:"18px"}}>{review.user.username}</h4>
          <p dangerouslySetInnerHTML={{ __html: reply?.reply }}></p>
          
          </div>
          

          </div>})}
             <button style={{border:"none",padding:"10px",background:"#7BB564",borderRadius:"10px",color:"white",fontSize:"10px"}} onClick={() => setReplyingTo(review.id)}>Reply</button>
{replyingTo === review.id && (
  <form onSubmit={(e) => handleReply(e, review.id)} style={{display:"flex",flexDirection:"column",width:"80%"}}>
              <ReactQuill theme="snow" value={values} onChange={setValues}  />

    {/* <textarea value={reply} onChange={(e) => setReply(e.target.value)} required  style={{margin:"10px 0px"}} /> */}
    <button style={{border:"none",padding:"10px",background:"#7BB564",borderRadius:"10px",color:"white",width:"150px",margin:"10px auto",fontSize:"10px"}}  type='submit'>Submit Reply</button>
  </form>           )}
          {/* <StarRating  /> */}
        </div>
        </div>  
      ))} </>:<p style={{margin:"0 auto"}}> No Comments yet.</p>}
      <ToastContainer />
    </div>
  );
}

// function StarRating({ rating, onRatingChange }) {
//   const handleClick = (selectedRating) => {
//     onRatingChange(selectedRating);
//   };

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           className={`star ${star <= rating ? 'filled' : ''}`}
//           onClick={() => handleClick(star)}
//         >
//           &#9733;
//         </span>
//       ))}
//     </div>
//   );
// }

export default AddComments;
