import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { Badge, Typography } from "@mui/material";

const Header = ({ title, variant, sx, color }) => {
  return (
    <Row xs="auto">
      <Col className="d-flex">
        <Typography variant={variant} fontWeight="bold" sx={sx} mb={2}>
          {title}
        </Typography>
      </Col>

      {/* <Col>
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
      </Col> */}
    </Row>
  );
};

// We can also declare default props like so
Header.defaultProps = {
  title: "Home",
};

// here we can set the type of property ( proptypes )
// we require a string to be the value of the title properly
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
