import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";

const SearchBarT = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(
    JSON.parse(localStorage.getItem("selectedStudent")) || null
  );

  const handleSearch = async () => {
    try {
      const loggedInTherapistId = JSON.parse(localStorage.getItem("userInfo"))._id;
      const response = await axios.get(
        `https://ankurproject.onrender.com/api/user/searchstt?searchTerm=${searchTerm}&therapistId=${loggedInTherapistId}`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error searching for students:", error);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    localStorage.setItem("selectedStudent", JSON.stringify(student));
    setSearchTerm(student.name); // Update search term with the selected student's name
    setStudents([]); // Clear the list of students
  };

  return (
    <Form inline>
      <FormControl
        type="text"
        placeholder="Select Student"
        className="mr-sm-2"
        value={selectedStudent ? selectedStudent.name : searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-primary" onClick={handleSearch}>
        Search
      </Button>
      {students.length > 0 && (
        <ul>
          {students.map((student) => (
            <li key={student._id} onClick={() => handleSelectStudent(student)}>
              {student.name}
            </li>
          ))}
        </ul>
      )}
    </Form>
  );
};

export default SearchBarT;
