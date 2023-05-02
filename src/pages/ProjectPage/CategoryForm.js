import { Button, Form, Row, Col } from "react-bootstrap";

const CategoryForm = ({ createCategory, setShowForm, setCategoryTitle, categoryTitle }) => {
  return (
    <Form>
      <Row className="my-3">
        <Col>
          <Form.Group controlId="categoryForm">
            <Form.Control
              type="text"
              placeholder="Create a category"
              value={categoryTitle}
              name="category"
              onChange={(e) => setCategoryTitle(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Button onClick={createCategory}>Create</Button>
          <Button
            className="mx-2"
            variant="danger"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
