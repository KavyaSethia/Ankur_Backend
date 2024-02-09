import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaUser, FaFemale, FaMale } from "react-icons/fa";
import { Col, Button } from "react-bootstrap";
import EditProfileModal from "./EditProfileModal";
import axios from "axios";
import "./Sidebar.css";
import { useToast } from "@chakra-ui/react";

const Sidebar = () => {
  const [userData, setUserData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const toast = useToast();
  const history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("selectedStudent");
    toast({
      title: "Logout Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    history("/");
};

  const userFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userFromLocalStorage && userFromLocalStorage._id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://ankur-backend-fnzd.vercel.app/api/user/${userFromLocalStorage._id}`
          );
          setUserData(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };

      fetchUserData();
    } else {
      console.log("User information not found");
    }
  }, []);

  const getProfileIcon = () => {
    if (userData && userData.gender === "female") {
      return <FaFemale />;
    } else if (userData && userData.gender === "male") {
      return <FaMale />;
    } else {
      return <FaUser />;
    }
  };

  //console.log("userData:", userData);

  return (
    <>
      <Col className="sidebar">
        <div className="profile-section">
          <div className="profile-icon">{getProfileIcon()}</div>
          <div className="user-details">
            <h4>{userData ? userData.name : "Guest"}</h4>
            <p>{userData ? userData.email : "guest@example.com"}</p>
          </div>
        </div>

        <div className="additional-details">
          <p>
            {userData
              ? `Age: ${userData.age !== "*%$*&###" ? userData.age : "--"}`
              : ""}
          </p>
          <p>
            {userData
              ? `Location: ${
                  userData.location !== "*%$*&###" ? userData.location : "--"
                }`
              : ""}
          </p>
          <p>
            {userData
              ? `Gender: ${
                  userData.gender !== "*%$*&###" ? userData.gender : "--"
                }`
              : ""}
          </p>
          <p>
            {userData
              ? `Phone: ${
                  userData.phone !== "*%$*&###" ? userData.phone : "--"
                }`
              : ""}
          </p>

          {userData && userData.role === "student" && (
            <>
              <p>{`Class: ${
                userData.studentDetails.class !== "*%$*&###"
                  ? userData.studentDetails.class
                  : "--"
              }`}</p>
              <p>{`School: ${
                userData.studentDetails.school !== "*%$*&###"
                  ? userData.studentDetails.school
                  : "--"
              }`}</p>
              <p>{`Educator: ${
                userData.studentDetails.educator &&
                userData.studentDetails.educator.name
                  ? userData.studentDetails.educator.name
                  : "--"
                }`}</p>
              <p>{`Therapist: ${
                userData.studentDetails.therapist &&
                userData.studentDetails.therapist.name
                  ? userData.studentDetails.therapist.name
                  : "--"
              }`}</p>
            </>
          )}

          {/* {userData && userData.role === "educator" && (
            <>
              <p>{`School: ${
                userData.school_st !== "*%$*&###" ? userData.school_st : "--"
              }`}</p>
            </>
          )} */}

          {userData && userData.role === "therapist" && (
            <>
              <p>{`Current Company: ${
                userData.therapistDetails.curr_company !== "*%$*&###"
                  ? userData.therapistDetails.curr_company
                  : "--"
              }`}</p>
              <p>{`Experience: ${
                userData.therapistDetails.experience_year !== "*%$*&###"
                  ? userData.therapistDetails.experience_year
                  : "--"
              }`}</p>
              <p>{`Work Description: ${
                userData.therapistDetails.work_desc !== "*%$*&###"
                  ? userData.therapistDetails.work_desc
                  : "--"
              }`}</p>
              <p>{`Portfolio: ${
                userData.therapistDetails.portfolio !== "*%$*&###"
                  ? userData.therapistDetails.portfolio
                  : "--"
              }`}</p>
              <p>{`Specialization 1: ${
                userData.therapistDetails.spec1 !== "*%$*&###"
                  ? userData.therapistDetails.spec1
                  : "--"
              }`}</p>
              <p>{`Specialization 2: ${
                userData.therapistDetails.spec2 !== "*%$*&###"
                  ? userData.therapistDetails.spec2
                  : "--"
              }`}</p>
              <p>{`Specialization 3: ${
                userData.therapistDetails.spec3 !== "*%$*&###"
                  ? userData.therapistDetails.spec3
                  : "--"
              }`}</p>
            </>
          )}
        </div>
        <Button onClick={handleEditClick}>
          Edit Profile
        </Button>

        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Col>
      {/* {console.log("test",userData)} */}
      <EditProfileModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        userData={userData}
      />
    </>
  );
};

export default Sidebar;
