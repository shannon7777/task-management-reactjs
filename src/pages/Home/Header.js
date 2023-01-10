import PropTypes from "prop-types";
import { Row, Col, Button, Badge } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";

const Header = ({ totalTasks, title, onAdd, showAddTask }) => {
  return (
    <Row className="justify-content-between mt-5" xs="auto">
      <Col className="d-flex">
        <h1>
          <Badge bg="dark">{title}</Badge>
        </h1>
        <h5 className="title-bubble mx-3">
          <span>{totalTasks}</span>
        </h5>
      </Col>

      <Col>
        <Button variant={showAddTask ? "danger" : "success"} onClick={onAdd}>
          {showAddTask ? "Close" : <FiPlus size={30} />}
        </Button>
      </Col>

      <Col>
        <form className="search-bar-form">
          <AiOutlineSearch className="search-icon" size={30} />
          <input
            className="search-bar shadow"
            type="search"
            placeholder="Search a task..."
          />
        </form>
      </Col>
    </Row>
  );
};

// We can also declare default props like so
Header.defaultProps = {
  title: "Personal Tasks",
};

// here we can set the type of property ( proptypes )
// we require a string to be the value of the title properly
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
