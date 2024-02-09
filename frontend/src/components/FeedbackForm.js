import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import PreviousFeedbacks from "./PreviousFeedback";

const FeedbackForm = () => {
  const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [showPreviousFeedbacks, setShowPreviousFeedbacks] = useState(false);

  const toast = useToast();

  const [formData, setFormData] = useState({
    student: {
      id: selectedStudent ? selectedStudent._id : "",
      name: selectedStudent ? selectedStudent.name : "",
    },
    submittedBy: {
      id: userInfo ? userInfo._id : "",
      name: userInfo ? userInfo.name : "",
    },
    overallPerformance: "",
    academicProgress: "",
    behavioralObservations: "",
    communicationSkills: "",
    socialSkills: "",
    emotionalWellbeing: "",
    physicalDevelopment: "",
    attentionAndFocus: "",
    memoryAndLearning: "",
    problemSolvingSkills: "",
    independenceAndSelfcare: "",
    engagementinActivities: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) {
      toast({
        title: "No Student Selected",
        description: "Please select a student first.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    //console.log("Form data:", formData);
    try {
      const updatedFormData = {
        ...formData,
        student: {
          id: selectedStudent._id,
          name: selectedStudent.name,
        },
      };

      const response = await axios.post(
        "http://ankur-backend-fnzd.vercel.app/api/user/feedback",
        updatedFormData
      );
      if (response.status === 201) {
        console.log("Feedback submitted successfully");
        toast({
          title: "Feedback submitted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setFormData({
          student: {
            id: selectedStudent._id,
            name: selectedStudent.name,
          },
          submittedBy: {
            id: userInfo._id,
            name: userInfo.name,
          },
          overallPerformance: "",
          academicProgress: "",
          behavioralObservations: "",
          communicationSkills: "",
          socialSkills: "",
          emotionalWellbeing: "",
          physicalDevelopment: "",
          attentionAndFocus: "",
          memoryAndLearning: "",
          problemSolvingSkills: "",
          independenceAndSelfcare: "",
          engagementinActivities: "",
        });
      } else {
        console.error("Failed to submit feedback");
        toast({
          title: "Failed to submit feedback!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      toast({
        title: "Error submitting feedback!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const togglePreviousFeedbacks = () => {
    setShowPreviousFeedbacks((prevState) => !prevState);
  };

  const questions = [
    {
      key: "overallPerformance",
      question:
        "Overall Performance: How would you rate the student's overall performance this week?",
      options: ["Excellent", "Good", "Average", "Poor"],
    },
    {
      key: "academicProgress",
      question:
        "Academic Progress: What progress did the student make in their academic skills this week?",
    },
    {
      key: "behavioralObservations",
      question:
        "Behavioral Observations: Describe any notable changes in the student's behavior or mood this week.",
    },
    {
      key: "communicationSkills",
      question:
        "Communication Skills: How well did the student communicate and interact with others this week?",
    },
    {
      key: "socialSkills",
      question:
        "Social Skills: Describe any improvements or challenges the student faced in social situations.",
    },
    {
      key: "emotionalWellbeing",
      question:
        "Emotional Well-being: How did the student express their emotions and handle difficult situations this week?",
    },
    {
      key: "physicalDevelopment",
      question:
        "Physical Development: Comment on the student's physical coordination and motor skills progress.",
    },
    {
      key: "attentionAndFocus",
      question:
        "Attention and Focus: Assess the student's ability to maintain attention and focus during activities.",
    },
    {
      key: "memoryAndLearning",
      question:
        "Memory and Learning: Comment on the student's memory skills and ability to retain learned information.",
    },
    {
      key: "problemSolvingSkills",
      question:
        "Problem-Solving Skills: Describe any instances where the student demonstrated problem-solving abilities.",
    },
    {
      key: "independenceAndSelfcare",
      question:
        "Independence and Self-Care: Comment on the student's progress towards independence and self-care tasks.",
    },
    {
      key: "engagementinActivities",
      question:
        "Engagement in Activities: Describe the student's level of engagement and participation in various activities.",
    },
  ];

  return (
    <Container className="feedback-form">
      <h3 className="mb-4">Feedback Form</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          {questions.map((q) => (
            <Col key={q.key} md={6}>
              <Form.Group controlId={q.key}>
                <Form.Label>{q.question}</Form.Label>
                {q.options ? (
                  <Form.Control
                    as="select"
                    name={q.key}
                    value={formData[q.key]}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {q.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name={q.key}
                    value={formData[q.key]}
                    onChange={handleChange}
                  />
                )}
              </Form.Group>
            </Col>
          ))}
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Button variant="secondary" onClick={togglePreviousFeedbacks}>
        {showPreviousFeedbacks
          ? "Hide Previous Feedbacks"
          : "View Previous Feedbacks"}
      </Button>

      {showPreviousFeedbacks && (
        <PreviousFeedbacks student={selectedStudent} sender={userInfo} />
      )}
    </Container>
  );
};

export default FeedbackForm;
