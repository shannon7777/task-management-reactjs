import { Row, Col, Card } from "react-bootstrap";

const Project = ({ project }) => {
  return (
    <Card>
      <Card.Title>{project.title}</Card.Title>
      <p>{project.description}</p>
      <p>{`Completion Date: ${project.completion_date}`}</p>
    </Card>
  );
};

export default Project;
