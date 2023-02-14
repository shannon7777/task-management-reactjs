import { Form, Button, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";
import StarRating from "./StarRating";

const AddProjectForm = ({
  onChange,
  onSubmit,
  setFormData,
  formData,
  rating,
  setRating,
  ratingColors
}) => {
  return (
    <Form className="border border-secondary shadow p-4 m-5 rounded">
      <Form.Group className="mb-3" controlId="formTitle">
        <h2>Create a New Project</h2>
        <Form.Label>Title</Form.Label>
        <Form.Control
          className="shadow"
          type="title"
          name="title"
          value={formData.title}
          placeholder="Enter a title for your project"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          className="shadow"
          type="description"
          name="description"
          value={formData.description}
          placeholder="Describe this project"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="d-flex mb-3" controlId="formDateOfCompletion">
        <Col className="d-flex">
          <Form.Label>Date of completion</Form.Label>
          <DatePicker
            className="btn btn-outline-success shadow m-2"
            selected={formData.completion_date}
            value={formData.completion_date}
            onChange={(date) =>
              setFormData({ ...formData, completion_date: date })
            }
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
            showPopperArrow={false}
            placeholderText="No completion date set"
          />
        </Col>
        <div className="vr" />

        <Col className="p-3">
          <Form.Label className="mx-3">Priority rating</Form.Label>
          <StarRating rating={rating} setRating={setRating} ratingColors={ratingColors}/>
        </Col>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Create
      </Button>
    </Form>
  );
};
export default AddProjectForm;
