import { Row, Col, Card } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

import Project from "./Project";

const ProjectList = ({}) => {
  const {
    auth: {
      user: { username },
    },
  } = useAuth();
  
  return (
    <div>
      <Card className="p-3 m-4 shadow">
        <Card.Title>{username}'s projects</Card.Title>
        <Project />
      </Card>
    </div>
  );
};

export default ProjectList;
