import PropTypes from 'prop-types';

const Button = ({ color, text, onClick }) => {
  return (
    <div>
      <button onClick={onClick} style={{ backgroundColor: color }} className="btn">{text}</button>
    </div>
  );
}

Button.defaultProps = {
    color: 'green',
}

Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
}

export default Button;
