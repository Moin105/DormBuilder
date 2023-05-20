import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './Rating';
import { useSelector } from 'react-redux';
function AddReview({dorm_id,user_id}) {
//   const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
 const token = useSelector((state) => state.token);
  useEffect(() => {
    console.log("helos gee",dorm_id,user_id.id)
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.post('http://backend.uni-hive.net/api/get_dorm_review',{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if ( !review || rating == 0) {
      toast.error('Please fill in all fields and provide a rating.');
      return;
    }

    try {
      const formData = {
        dorm_id: dorm_id,
        user_id: user_id.id,
        review: review,
        rating: rating,
      };

      const response = await axios.post('http://backend.uni-hive.net/api/add_dorm_review', formData,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
      });

      console.log('Review posted successfully:', response.data);
      // Clear the form
    //   setName('');
      setReview('');
      setRating(0);

      // Fetch updated reviews
      fetchReviews();

      toast.success('Review submitted successfully!');
    } catch (error) {
      console.error('Error posting review:', error);
      toast.error('Failed to submit the review. Please try again.');
    }
  };

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div style={{display:"flex",flexDirection:"column"}}>
      <p>Add a Review:</p>
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
         <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          /></div>

          Rating:
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
           <p className="text-center"><button className='heroButtonOne' type='submit'>Book Now</button></p> 
      </form>

    {reviews.length > 0 &&  <h2>All Reviews:</h2>}
      {reviews.length > 0 && reviews?.map((review) => (
        <div key={review.id}>
          <h3>{review.name}</h3>
          <p>{review.review}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
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

export default AddReview;
