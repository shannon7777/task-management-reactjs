import { Alert, Toast, Collapse } from "react-bootstrap";
// import { useEffect } from "react";

const CustomAlert = ({ text, show, onClose, bg }) => {
  return (
    <Toast
      className="w-100 text-white text-center mb-3"
      show={show}
      onClose={onClose}
      bg={bg}
      delay={3000}
      autohide
    >
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};
// const CustomAlert = ({ text, variant, show, setError, setNotify, setInfo }) => {
//   const clearAlert = () => {
//     if (setError) return setError({ show: false });
//     if (setNotify) return setNotify({ show: false });
//     if (setInfo) return setInfo({ show: false });
//   };

//   useEffect(() => {
//     setTimeout(clearAlert, 2000);
//   }, []);

//   return (
//     <Alert show={show} className="text-center shadow" variant={variant}>
//       {text}
//     </Alert>
//   );
// };

export default CustomAlert;
