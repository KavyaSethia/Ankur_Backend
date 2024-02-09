import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Navigation from "../components/Navigation";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [nameOfUser, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");

  console.log({ email });
  console.log({ password });
  console.log({ phone });
  console.log({ nameOfUser });
  console.log({ role });

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const toast = useToast();

  const history = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!nameOfUser || !email || !password || !role || !phone) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    console.log({ nameOfUser, email, password, role, phone });
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://ankurproject.onrender.com/api/user",
        {
          name: nameOfUser,
          email,
          password,
          phone,
          role,
        },
        config
      );
      console.log("Data:", data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      switch (role) {
        case "student":
          history("/dashboardS");
          break;
        case "educator":
          history("/dashboardE");
          break;
        case "therapist":
          history("/dashboardT");
          break;
        default:
          // Default redirection if role is not recognized
          history("/");
          break;
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      {" "}
      <Navigation />
      <Container>
        <Row>
          <Col md={5} className="signup__bg" />
          <Col
            md={7}
            className="d-flex align-items-center justify-content-center flex-direction-column"
          >
            {/* </Col> */}
            <Form style={{ width: "80%", maxWidth: 500 }}>
              <br />
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Enter your Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  value={nameOfUser}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter your Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                  required
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />{" "}
                <button
                  style={{
                    height: "27px",
                    background: "#efefef",
                    border: "transparent",
                  }}
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Enter your Phone</Form.Label>
                <Form.Control
                  required
                  type="phone"
                  placeholder="Enter phone "
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicRole">
                <Form.Label>Select your Role</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Student"
                    name="role"
                    id="student"
                    onChange={() => setRole("student")}
                    checked={role === "student"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Educator"
                    name="role"
                    id="educator"
                    onChange={() => setRole("educator")}
                    checked={role === "educator"}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Therapist"
                    name="role"
                    id="therapist"
                    onChange={() => setRole("therapist")}
                    checked={role === "therapist"}
                  />
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={submitHandler}>
                {/* Signup<Spinner animation="border" /> */}
                Sign Up
              </Button>
              <div className="py-4">
                <p className="text-center">
                  Already have an account ?{" "}
                  <Link to="/login">
                    <u style={{ color: "blue" }}> Login</u>
                  </Link>
                </p>
              </div>
            </Form>{" "}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
