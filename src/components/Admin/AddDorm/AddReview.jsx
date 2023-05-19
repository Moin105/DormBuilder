import React, { useState } from 'react';

function AddReview() {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Review by:", name);
    console.log("Review:", review);
    // Here you would typically send the review to your backend...

    // Clear the form
    setName('');
    setReview('');
  };

  return (
    <div>
      <h2>Add a Review:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input 
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Review:
          <textarea
            value={review}
            onChange={e => setReview(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Submit Review" />
      </form>
    </div>
  );
}

export default AddReview;
