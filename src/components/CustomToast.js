import { Toast } from "react-bootstrap";

const CustomToast = ({text, show, onClose, bg}) => {
    return (
      <Toast className="w-100 text-white" bg={bg} show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    );
  };
  
  export default CustomToast;