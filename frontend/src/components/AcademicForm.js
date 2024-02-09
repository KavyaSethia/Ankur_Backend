import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import PreviousAcademicResults from "./PreviousAcademicResults";

const AcademicForm = () => {
  const selectedStudent = JSON.parse(localStorage.getItem("selectedStudent"));

  const [showPreviousAcademicResults, setShowPreviousAcademicResults] =
    useState(false);

  const toast = useToast();

  const [formData, setFormData] = useState({
    student: {
      id: selectedStudent ? selectedStudent._id : "",
      name: selectedStudent ? selectedStudent.name : "",
    },
    subject1: 0,
    subject2: 0,
    subject3: 0,
    subject4: 0,
    subject5: 0,
    examType: "",
    totalmarks: 0,
    aquiredmarks: 0,
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
        "http://ankur-backend-fnzd.vercel.app/api/user/academics",
        updatedFormData
      );
      if (response.status === 201) {
        console.log("Academic results added successfully");
        toast({
          title: "Academic results added successfully",
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
          subject1: 0,
          subject2: 0,
          subject3: 0,
          subject4: 0,
          subject5: 0,
          examType: "",
          totalmarks: 0,
          aquiredmarks: 0,
        });
      } else {
        console.error("Failed to add academic results");
        toast({
          title: "Failed to add academics results!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast({
        title: "Error submitting results!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const togglePreviousAcademicResults = () => {
    setShowPreviousAcademicResults((prevState) => !prevState);
  };

  return (
    <Container className="academic-form">
      <h3 className="mb-4">Enter Academic Results</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="subject1">
          <Form.Label>Subject 1</Form.Label>
          <Form.Control
            type="text"
            name="subject1"
            value={formData.subject1}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="subject2">
          <Form.Label>Subject 2</Form.Label>
          <Form.Control
            type="text"
            name="subject2"
            value={formData.subject2}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="subject3">
          <Form.Label>Subject 3</Form.Label>
          <Form.Control
            type="text"
            name="subject3"
            value={formData.subject3}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="subject4">
          <Form.Label>Subject 4</Form.Label>
          <Form.Control
            type="text"
            name="subject4"
            value={formData.subject4}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="subject5">
          <Form.Label>Subject 5</Form.Label>
          <Form.Control
            type="text"
            name="subject5"
            value={formData.subject5}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="examType">
          <Form.Label>Exam Type</Form.Label>
          <Form.Control
            type="text"
            name="examType"
            value={formData.examType}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="totalmarks">
          <Form.Label>Total Marks</Form.Label>
          <Form.Control
            type="number"
            name="totalmarks"
            value={formData.totalmarks}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="aquiredmarks">
          <Form.Label>Acquired Marks</Form.Label>
          <Form.Control
            type="number"
            name="aquiredmarks"
            value={formData.aquiredmarks}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Button variant="secondary" onClick={togglePreviousAcademicResults}>
        {showPreviousAcademicResults ? "Hide" : "View"} Previous Academic
        Results
      </Button>

      {showPreviousAcademicResults && (
        <PreviousAcademicResults student={selectedStudent} />
      )}
    </Container>
  );
};

export default AcademicForm;
