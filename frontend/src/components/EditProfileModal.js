import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EditProfileModal = ({ show, handleClose, userData }) => {
  const [editedFields, setEditedFields] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [educatorSearchResults, setEducatorSearchResults] = useState([]);
  const [selectedEducator, setSelectedEducator] = useState(
    JSON.parse(localStorage.getItem("userInfo.studentDetails.educator.name")) ||
      null
  );
  const [therapistSearchResults, setTherapistSearchResults] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState({});

  const toast = useToast();

  if (!userData) {
    return null; // or render a loading state
  }

  //console.log("udm:", userData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSearchEducators = async () => {
    try {
      const response = await axios.get(
        `http://ankur-backend-fnzd.vercel.app/api/user/search?role=educator&searchTerm=${searchTerm}`
      );
      setEducatorSearchResults(response.data);
    } catch (error) {
      console.error("Error searching educators:", error.message);
    }
  };

  const handleSearchTherapists = async () => {
    try {
      const response = await axios.get(
        `http://ankur-backend-fnzd.vercel.app/api/user/search?role=therapist&searchTerm=${searchTerm}`
      );
      setTherapistSearchResults(response.data);
    } catch (error) {
      console.error("Error searching therapist:", error.message);
    }
  };

  const handleSelectEducator = (educator) => {
    setSelectedEducator(educator);
    setSearchTerm("");
    setEducatorSearchResults([]);
    setEditedFields((prevFields) => ({
      ...prevFields,
      educator_st: { id: educator._id, name: educator.name },
    }));
  };

  const handleSelectTherapist = (therapist) => {
    setSelectedTherapist(therapist);
    setSearchTerm("");
    setTherapistSearchResults([]);
    setEditedFields((prevFields) => ({
      ...prevFields,
      therapist_st: { id: therapist._id, name: therapist.name },
    }));
  };

  //console.log("selectedEducator:", selectedEducator);
  //console.log("selectedTherapist:", selectedTherapist);
  //console.log("educator_st", editedFields["educator_st"]);

  const handleSaveChanges = async () => {
    try {
      const updatedFields = {
        ...editedFields,
        educator_st: selectedEducator
          ? { id: selectedEducator._id, name: selectedEducator.name }
          : editedFields.educator_st,
        therapist_st: selectedTherapist
          ? { id: selectedTherapist._id, name: selectedTherapist.name }
          : editedFields.therapist_st,
      };
      //console.log("Updated fields:", updatedFields);
      const response = await axios.put(
        `http://ankur-backend-fnzd.vercel.app/api/user/${userData._id}`,
        updatedFields
      );

      console.log("Changes saved:", response.data);
      toast({
        title: "Changes Saved",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      handleClose();
    } catch (error) {
      console.error("Error saving changes:", error.message);
      toast({
        title: "Error Saving Changes!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  //console.log("educatorSearchResults:", educatorSearchResults);
  //console.log("up", updatedFields);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* General Fields */}
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              name="age"
              defaultValue={userData.age !== "*%$*&###" ? userData.age : ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              defaultValue={
                userData.gender !== "*%$*&###" ? userData.gender : ""
              }
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              defaultValue={userData.phone !== "*%$*&###" ? userData.phone : ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              defaultValue={
                userData.location !== "*%$*&###" ? userData.location : ""
              }
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* Role-specific Fields */}
          {userData.role === "student" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  type="text"
                  name="class_st"
                  defaultValue={
                    userData.studentDetails.class !== "*%$*&###"
                      ? userData.studentDetails.class
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>School</Form.Label>
                <Form.Control
                  type="text"
                  name="school_st"
                  defaultValue={
                    userData.studentDetails.school !== "*%$*&###"
                      ? userData.studentDetails.school
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Educator</Form.Label>
                {educatorSearchResults.length === 0 && (
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      name="educator_st"
                      value={selectedEducator ? selectedEducator.name : ""}
                      onChange={handleInputChange}
                    />
                    <Button variant="primary" onClick={handleSearchEducators}>
                      Search
                    </Button>
                  </div>
                )}
                {educatorSearchResults.length > 0 && (
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Search educator..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearchEducators}>
                      Search
                    </Button>
                    <ul>
                      {educatorSearchResults.map((educator) => (
                        <li
                          key={educator._id}
                          onClick={() => handleSelectEducator(educator)}
                        >
                          {educator.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Therapist</Form.Label>
                {therapistSearchResults.length === 0 && (
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="text"
                      name="therapist_st"
                      value={selectedTherapist ? selectedTherapist.name : ""}
                      onChange={handleInputChange}
                    />
                    <Button variant="primary" onClick={handleSearchTherapists}>
                      Search
                    </Button>
                  </div>
                )}
                {therapistSearchResults.length > 0 && (
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Search therapist..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleSearchTherapists}>
                      Search
                    </Button>
                    <ul>
                      {therapistSearchResults.map((therapist) => (
                        <li
                          key={therapist._id}
                          onClick={() => handleSelectTherapist(therapist)}
                        >
                          {therapist.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Form.Group>
            </>
          )}

          {userData.role === "therapist" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Current Company</Form.Label>
                <Form.Control
                  type="text"
                  name="curr_company_thep"
                  defaultValue={
                    userData.therapistDetails.curr_company !== "*%$*&###"
                      ? userData.therapistDetails.curr_company
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Portfolio</Form.Label>
                <Form.Control
                  type="text"
                  name="portfolio"
                  defaultValue={
                    userData.therapistDetails.portfolio !== "*%$*&###"
                      ? userData.therapistDetails.portfolio
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Work Description</Form.Label>
                <Form.Control
                  type="text"
                  name="work_desc_thep"
                  defaultValue={
                    userData.therapistDetails.work_desc !== "*%$*&###"
                      ? userData.therapistDetails.work_desc
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Years of experience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience_year_thep"
                  defaultValue={
                    userData.therapistDetails.experience_year !== "*%$*&###"
                      ? userData.therapistDetails.experience_year
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label> Specialization 1</Form.Label>
                <Form.Control
                  type="text"
                  name="spec1"
                  defaultValue={
                    userData.therapistDetails.spec1 !== "*%$*&###"
                      ? userData.therapistDetails.spec1
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Specialization 2</Form.Label>
                <Form.Control
                  type="text"
                  name="spec2"
                  defaultValue={
                    userData.therapistDetails.spec2 !== "*%$*&###"
                      ? userData.therapistDetails.spec2
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Specialization 3</Form.Label>
                <Form.Control
                  type="text"
                  name="spec3"
                  defaultValue={
                    userData.therapistDetails.spec3 !== "*%$*&###"
                      ? userData.therapistDetails.spec3
                      : ""
                  }
                  onChange={handleInputChange}
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
