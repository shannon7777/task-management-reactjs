import { Col, Row } from "react-bootstrap";

const ProjectItem = ({ projectItem }) => {
  return(
    <Row>
      <Col>
        {projectItem?.item}
      </Col>
    </Row>
  );
};
export default ProjectItem;
