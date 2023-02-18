import { Col, Row } from "react-bootstrap";

const ProjectItem = ({ ProjectItem }) => {
  return(
    <Row>
      <Col>
        {ProjectItem.item}
      </Col>
    </Row>
  );
};
export default ProjectItem;
