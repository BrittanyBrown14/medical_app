import { useState, useEffect } from 'react';
import './CreateReview.css';

function CreateReview({id_number, onReviewSubmit, reviewContent})
{
    const [submit, setSubmit] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [reviewGiven, setReviewGiven] = useState(false);

    const [formName, setName] = useState('');
    const [formContent, setContent] = useState('');
    const [formRating, setRating] = useState('');
    const [formId, setFormId] = useState('');
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [reviewInfo, setReviewInfo] = useState({
        name: '',
        reviewContent: '',
        rating: 0
      });

      useEffect(() => {
        setReviewInfo({
          name: formName,
          reviewContent: formContent,
          rating: parseInt(formRating),
        });
      })
    
    function submitReview(e) {
      e.preventDefault();
      localStorage.setItem(`reviewFormSno_${JSON.stringify(id_number.id_number)}`, JSON.stringify(reviewInfo));
      setSubmittedMessage(reviewInfo);
          if (reviewInfo.name && reviewInfo.reviewContent && reviewInfo.rating > 0) {
            
            onReviewSubmit(id_number, reviewInfo.reviewContent);
            
            setShowWarning(false);
            setSubmit(true);
            setReviewGiven(true);
          } else {
            setShowWarning(true);
          }

/*         if (reviewInfo.name && reviewInfo.reviewContent && reviewInfo.rating > 0) {
        localStorage.setItem(`reviewFormData_${id_number}`, JSON.stringify(reviewInfo));
        onSubmit(id_number, reviewInfo.reviewContent); // Pass the review to the parent component
        setSubmit(true);
        setShowWarning(false);
      } else {
        setShowWarning(true);
      } */
    };

    if (submit) {
      return (
        <div className="create--main">
          <h2>Your Review has been Saved</h2>
          <p>
            <strong>Name:</strong> {reviewInfo.name}
          </p>
          <p>
            <strong>Review:</strong> {reviewInfo.reviewContent}
          </p>
          <p>
            <strong>Rating:</strong> {reviewInfo.rating}
          </p>
        </div>
      );
    }
    else{

      return (
          <div className="container">
            <form onSubmit={submitReview}>
              <h2>Give Your Review</h2>
              {showWarning && <p className="warning">Please fill out all fields.</p>}
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" onBlur={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="reviewContent">How was your experience?:</label>
                <textarea id="review" name="reviewContent" onBlur={(e) => setContent(e.target.value)}/>
              </div>
              <div>
                <label htmlFor="rating">Rating:</label>
                <div className="create--rating">
                <select onBlur={(e) => setRating(e.target.value)}>
                      <option value="none">Please choose a rating out of 5</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>
                  <br />
                </div>
              </div>
              <button className='create--submit-button' type="submit">Submit</button>
            </form>
          </div>
        );
      }
}

export default CreateReview;