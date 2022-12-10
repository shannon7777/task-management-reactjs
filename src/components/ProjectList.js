import React from "react";
import useAuth from "../hooks/useAuth";

const ProjectList = ({}) => {
  const {
    auth: {
      user: { username },
    },
  } = useAuth();
  
  return <div>Team Projects</div>;
};

export default ProjectList;
