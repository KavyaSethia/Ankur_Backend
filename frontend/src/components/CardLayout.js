import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPhone, faUsers, faChartBar, faGamepad, faBook, faStethoscope } from "@fortawesome/free-solid-svg-icons";

const CardLayout = ({ toggleFeedbackForm, toggleDairy }) => {
  return (
    <div>
      <Row className="card-container">
        {/* Chat */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faComment} size="3x" />
              <Card.Title>Chat</Card.Title>
              <Card.Text>Start a chat session</Card.Text>
              <Card.Link href="/chat">Start Chat</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Call/Video */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faPhone} size="3x" />
              <Card.Title>Call/Video</Card.Title>
              <Card.Text>Initiate a call or video session</Card.Text>
              <Card.Link href="/videocall">Initiate Call</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Feedback by Parents */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} size="3x" />
              <Card.Title>Feedback by Parents</Card.Title>
              <Card.Text>Submit student feedback weekly</Card.Text>
              <Card.Link onClick={toggleFeedbackForm}>Submit Feedback</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Report */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faChartBar} size="3x" />
              <Card.Title>Report</Card.Title>
              <Card.Text>Generate and view reports</Card.Text>
              <Card.Link href="/report">View Reports</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Games */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faGamepad} size="3x" />
              <Card.Title>Games</Card.Title>
              <Card.Text>Access mind games</Card.Text>
              <Card.Link href="/games">Play Games</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Therapy sessions */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faStethoscope} size="3x" />
              <Card.Title>Therapy Sessions</Card.Title>
              <Card.Text>View your past therapy sessions</Card.Text>
              <Card.Link href="/therapy">View Sessions</Card.Link>
            </Card.Body>
          </Card>
        </Col>
        {/* Dairy Entry */}
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faBook} size="3x" />
              <Card.Title>My Dairy</Card.Title>
              <Card.Text>Write your daily diary entries</Card.Text>
              <Card.Link onClick={toggleDairy}> Write Dairy</Card.Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardLayout;
