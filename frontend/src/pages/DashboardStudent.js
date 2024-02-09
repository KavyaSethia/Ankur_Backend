import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import CardLayout from "../components/CardLayout";
import Navigation from "../components/Navigation";
import FeedbackFormS from "../components/FeedbackFormS";
import Dairy from "../components/Dairy";

const DashboardS = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showDairy, setShowDairy] = useState(false);

  const toggleFeedbackForm = () => {
    setShowFeedbackForm(!showFeedbackForm);
  };

  const toggleDairy = () => {
    setShowDairy(!showDairy);
  };

  return (
    <>
      <Navigation />
      <Container fluid>
        <Row>
          <Col sm={3} md={2} className="sidebar">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col sm={9} md={10} className="main-content">
            <h2>Welcome to the Dashboard</h2>
            <CardLayout toggleFeedbackForm={toggleFeedbackForm} toggleDairy={toggleDairy} />
            {showFeedbackForm && <FeedbackFormS />}
            {showDairy && <Dairy />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardS;
