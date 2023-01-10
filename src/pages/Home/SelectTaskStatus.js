import { Form } from "react-bootstrap";

const SelectTaskStatus = ({ selectOptions, onChange, progress }) => {
  return (
    <>
      <Form>
        <Form.Group
          className="d-flex justify-content-center"
          controlId="selectStatus"
        >
          <Form.Select
            className="border rounded border-success text-center shadow w-100"
            size="sm"
            onChange={onChange}
            defaultValue={progress}
          >
            {selectOptions.map((option, index) => {
              return (
                <option key={`option-${index}`} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </Form.Select>

        </Form.Group>
      </Form>
    </>
  );
};

export default SelectTaskStatus;
