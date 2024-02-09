import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PreviousFeedback.css';

const PreviousFeedbacks = ({ student, sender }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  //const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
  //const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.post(`http://ankur-backend-fnzd.vercel.app/api/user/prevfeedback`,
          { studentId: student._id, loggedInUserId: sender._id },
          config
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error.message);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleBlockClick = (index) => {
    setFeedbacks((prevFeedbacks) => {
      const updatedFeedbacks = [...prevFeedbacks];
      updatedFeedbacks[index].expanded = !updatedFeedbacks[index].expanded;
      return updatedFeedbacks;
    });
  };

  return (
    <div className="previous-feedbacks-container">
      <h3>Previous Feedbacks</h3>
      {feedbacks.map((feedback, index) => (
        <div key={feedback._id} className="feedback-block">
          <div className="feedback-header" onClick={() => handleBlockClick(index)}>
            <span>{`Sent to ${feedback.student.name}`}</span>
            <span className="date">{new Date(feedback.submittedAt).toLocaleDateString()}</span>
          </div>
          {feedback.expanded && (
            <div className="feedback-details">
              <p>Overall Performance: {feedback.overallPerformance}</p>
              <p>Academic Progress: {feedback.academicProgress}</p>
              <p>Behavioral Observations: {feedback.behavioralObservations}</p>
              <p>Communication Skills: {feedback.communicationSkills}</p>
              <p>Social Skills: {feedback.socialSkills}</p>
              <p>Emotional Wellbeing: {feedback.emotionalWellbeing}</p>
              <p>Physical Development: {feedback.physicalDevelopment}</p>
              <p>Attention And Focus: {feedback.attentionAndFocus}</p>
              <p>Memory And Learning: {feedback.memoryAndLearning}</p>
              <p>Problem Solving Skills: {feedback.problemSolvingSkills}</p>
              <p>Independence And Selfcare: {feedback.independenceAndSelfcare}</p>
              <p>Engagement In Activities: {feedback.engagementinActivities}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default PreviousFeedbacks;
