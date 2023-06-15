import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({rating, onRatingChange}) {
   console.log("rating",rating)
  const [ratings, setRating] = useState(null);
  const [hover, setHover] = useState(null);
useEffect(() => {
if(rating !== null){
return  setRating(rating)
}
}, [])

  const handleRatingClick = (value) => {
    setRating(value);
  };
  const handleClick = (selectedRating) => {
        onRatingChange(selectedRating);
      };

  const handleRatingHover = (value) => {
    setHover(value);
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              style={{opacity: 0, position: 'absolute', zIndex: -1}}
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              onMouseEnter={() => handleRatingHover(ratingValue)}
              onMouseLeave={() => handleRatingHover(null)}
            />
            <FaStar
             style={{cursor: 'pointer',fontSize:"30px",margin:"10px"}}
              className="star"
              color={(ratingValue <= (hover || rating)) ? '#ffc107' : '#e4e5e9'}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;
