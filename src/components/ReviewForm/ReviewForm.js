import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Popup from "reactjs-popup";
import './ReviewForm.css'
import CreateReview from './CreateReview';

function Reviews(){

    const [reviewInfo, setReviewInfo] = useState({});

    const reportInfo = [
        {
            serialNumber: 1,
            doctorName: 'Dr. One',
            doctorSpeciality: 'MidWife',
        
        },
        {
            serialNumber: 2,
            doctorName: 'Dr. Two',
            doctorSpeciality: 'Dentist',
        }
    ]

    function giveReview (serialNumber){
        setReviewInfo((lastReviewInfo) => ({
          ...lastReviewInfo,
          [serialNumber]: ''
        }));
      };
    function submitReview(serialNumber, review){
        setReviewInfo((lastReviewInfo) => ({
          ...lastReviewInfo,
          [serialNumber]: review
        }));
      };


      const navigate = useNavigate();
      useEffect(() => {
           const authtoken = sessionStorage.getItem("auth-token");
           if (!authtoken) {
               navigate("/Login");
           }
      }, [])


    return(
        <div className="review--main">
            <table className="table--main">
                <thead className="table--header">
                    <tr className="table--row">
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>Provide Review</th>
                        <th>Review Feedback</th>
                    </tr>
                </thead>
                <tbody className="table--body">
                   { reportInfo.map((info) => (
                        <tr key={info.serialNumber}>
                        <td>{info.serialNumber}</td>
                        <td>{info.doctorName}</td>
                        <td>{info.doctorSpeciality}</td>
                        <td >
                            {!reviewInfo[info.serialNumber] ? (
                            <Popup
                                trigger={
                                <button
                                    className="table--review-button"
                                    onClick={() => giveReview(info.serialNumber)}
                                >
                                    Give Feedback
                                </button>
                                }
                                modal
                                nested
                            >
                                {(close) => (
                                <div className="modal">
                                    <CreateReview
                                    id_number={info.serialNumber}
                                    reviewContent={reviewInfo[info.serialNumber]} // Pass the review data
                                    onReviewSubmit={submitReview}

                                    />
                                    <button className="table--close-button" onClick={close}>
                                    Close
                                    </button>
                                </div>
                                )}
                            </Popup>
                            ) : (
                            <button className="table--reviewed-button" disabled>
                                Can only give one review
                            </button>
                            )}
                        </td>
                        <td>
                            {reviewInfo[info.serialNumber] && (
                            <div className="review-given">
                                <p>{reviewInfo[info.serialNumber]}</p>
                            </div>
                            )}
                        </td>
                        </tr>

                   ))}
                </tbody>
            </table>
        </div>
    )
}

export default Reviews;