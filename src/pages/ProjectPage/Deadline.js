import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import { ProgressBar } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

const Deadline = ({ deadline }) => {
  // const [deadline, setDeadline] = useState()

  return (
    <td className="">
      {deadline}
      <span className="d-flex">
        <ProgressBar
          variant="success"
          className="w-50"
          animated
          now={50}
        />
      <FontAwesomeIcon className="mx-3" icon={faFlag} />
      </span>
    </td>
  );
};

export default Deadline;
