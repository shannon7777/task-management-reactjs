import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import TeamMembers from "../../components/TeamMember";
import EditMembersModal from "./EditMembersModal";
import ProjectItems from "./ProjectItems";
import DatePicker from "react-datepicker";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { Badge, Card, Col, Form } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faPenToSquare,
  faUsersLine,
  faUserGear,
  faXmark,
  faSquarePen,
  faStar,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";

const ProjectPage = ({ setError, setNotify, setInfo }) => {
  const [project, setProject] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [hover, setHover] = useState({
    title: false,
    description: false,
    users: false,
    datePicker: false,
  });
  const [showEdit, setShowEdit] = useState({
    title: false,
    description: false,
    users: false,
    datePicker: false,
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completion_date: "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const {
    auth: { user },
  } = useAuth();
  const { project_id } = useParams();
  const navigate = useNavigate();

  const owner = teamMembers?.filter(
    (member) => member._id === project?.creator
  );
  const projectOwner = (
    <TeamMembers className="profilePicNavbar" member_id={owner[0]?._id} />
  );
  const ownedByUser = owner[0]?._id === user._id ? "(You)" : null;

  const fetchAllData = async () => {
    try {
      const [fetchedProject, fetchedMembers] = await Promise.all([
        axios(`projects/one/${project_id}`),
        axios(`projects/members/${project_id}`),
      ]);
      setProject(fetchedProject.data);
      setTeamMembers(fetchedMembers.data.users);
    } catch (error) {
      setError({ text: error.response.data.message });
      navigate("/team-projects");
    }
  };

  const editProject = async (e) => {
    e.preventDefault();
    const editedObj = Object.fromEntries(
      Object.entries(formData).filter((value) => value[1] !== "")
    );
    const editedProject = {
      ...editedObj,
      completion_date:
        formData.completion_date && formData.completion_date.toDateString(),
    };
    try {
      const { data } = await axios.put(
        `projects/${project._id}`,
        editedProject
      );
      setProject(data.updatedProject);
      setShowEdit((prev) => !prev);
      setFormData({
        title: "",
        description: "",
        completion_date: new Date(data.updatedProject.completion_date),
      });
    } catch (error) {
      setError({ text: error.response.data.message });
    }
  };

  const addMember = async (membersArr) => {
    // Check for members that already exist in the project
    const newMembersArr = [...membersArr];
    teamMembers.forEach((teamMember) =>
      newMembersArr.forEach((member, index) => {
        if (member === teamMember.email) {
          newMembersArr.splice(index, 1);
        }
        return newMembersArr;
      })
    );
    if (newMembersArr.length < 1) {
      return setInfo({
        text: `${[...membersArr]} is already a team member`,
      });
    }
    try {
      const {
        data: { users, message },
      } = await axios.post(`projects/members/${project_id}`, newMembersArr);
      setNotify({ text: message });
      setTeamMembers([...teamMembers, ...users]);
    } catch (error) {
      console.log(error);
      throw setError({ text: error.response.data.message });
    }
  };
  const removeMember = async (membersArr) => {
    try {
      const { data } = await axios.put(
        `projects/members/${project_id}`,
        membersArr
      );
      setNotify({ text: data.message });
      setTeamMembers(
        teamMembers.filter((member) => !membersArr.includes(member.email))
      );
    } catch (error) {
      throw setError({ text: error.response.data.message });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const editMembersModal = showEdit.users && (
    <EditMembersModal
      project_id={project_id}
      owner_email={owner[0].email}
      addMember={addMember}
      removeMember={removeMember}
      showEditMember={showEdit.users}
      setShowEditMember={setShowEdit}
      teamMembers={teamMembers.map((member) => member.email)}
    />
  );

  return (
    <>
      <Card className="m-3">
        <h2>
          <Card.Header
            className="d-flex"
            onMouseOver={() => setHover({ title: true })}
            onMouseOut={() => setHover({ title: false })}
          >
            <Col className="d-flex text-uppercase" md={4}>
              <FontAwesomeIcon
                className="back-button p-2"
                icon={faCircleArrowLeft}
                onClick={() => navigate("/team-projects")}
                style={{ cursor: "pointer" }}
              />
            </Col>
            <Col className="d-flex mx-auto" md={8}>
              {showEdit.title ? (
                <Form className="d-flex">
                  <Form.Control
                    className="w-100 h-50 my-auto"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                  ></Form.Control>
                  <FontAwesomeIcon
                    className="my-auto mx-3"
                    icon={faCircleCheck}
                    onClick={editProject}
                    style={{ cursor: "pointer" }}
                    type="submit"
                  />

                  <FontAwesomeIcon
                    className="my-auto"
                    icon={faXmark}
                    onClick={() => setShowEdit({ title: false })}
                    style={{ cursor: "pointer" }}
                    type="button"
                  />
                </Form>
              ) : (
                <p>
                  {project?.title}{" "}
                  {hover.title && (
                    <FontAwesomeIcon
                      className="edit-project-button"
                      icon={faPenToSquare}
                      size="sm"
                      onClick={() => setShowEdit({ title: true })}
                    />
                  )}
                </p>
              )}
            </Col>
          </Card.Header>
        </h2>

        <Card.Header
          className="d-flex mb-3"
          onMouseOver={() => setHover({ users: true })}
          onMouseOut={() => setHover({ users: false })}
        >
          <FontAwesomeIcon className="p-2" icon={faUsersLine} size="xl" />
          <Badge className="h-50 my-2" bg="success">
            {teamMembers?.length}
          </Badge>
          <div className="vr mx-3" />
          <span className="p-2">
            {teamMembers &&
              teamMembers.map((member, index) => (
                <span key={index}>
                  <TeamMembers
                    className="profilePicNavbar"
                    member_id={member._id}
                  />
                </span>
              ))}
          </span>
          {hover.users && (
            <FontAwesomeIcon
              className="p-2 mt-1"
              icon={faUserGear}
              onClick={() => setShowEdit({ users: true })}
              style={{ cursor: "pointer" }}
            />
          )}
          {editMembersModal}
          <p className="ms-auto">
            <strong>Project Owner:</strong> {projectOwner} {ownedByUser}
          </p>
        </Card.Header>

        <Card.Body className="d-flex my-auto">
          <Col
            md={4}
            onMouseOver={() => setHover({ description: true })}
            onMouseOut={() => setHover({ description: false })}
          >
            <h6>
              <strong>
                <Badge className="shadow" bg="dark">
                  Project Description
                </Badge>
              </strong>
            </h6>

            {showEdit.description ? (
              <Form className="d-flex">
                <Form.Control
                  className="w-100 h-50"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  size="sm"
                ></Form.Control>
                <FontAwesomeIcon
                  className="my-auto mx-3"
                  icon={faCircleCheck}
                  onClick={editProject}
                  style={{ cursor: "pointer" }}
                  size="lg"
                  type="submit"
                />
                <FontAwesomeIcon
                  className="my-auto"
                  icon={faXmark}
                  onClick={() => setShowEdit({ description: false })}
                  style={{ cursor: "pointer" }}
                  size="lg"
                />
              </Form>
            ) : (
              <div className="d-flex">
                <p>{project?.description}</p>
                {hover.description && (
                  <FontAwesomeIcon
                    className="mx-3"
                    icon={faPenToSquare}
                    onClick={() => setShowEdit({ description: true })}
                    size="lg"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
            )}
          </Col>

          <Col md={2}>
            <Badge bg="dark">Priority:</Badge>
            <span className="mx-2">
              {[...Array(project?.priority)].map((star, index) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={index}
                  color={ratingColors[project?.priority]}
                />
              ))}
            </span>
          </Col>

          <Col md={2}>
            <div style={{ width: "20%" }}>
              <CircularProgressbar
                styles={buildStyles({
                  textColor: "black",
                  textSize: "2rem",
                  pathColor: "darkgreen",
                })}
                className="mx-5"
                value={30}
                text={`30%`}
                strokeWidth={12}
              />
            </div>
          </Col>

          <Col
            md={4}
            onMouseOver={() => setHover({ datePicker: true })}
            onMouseOut={() => setHover({ datePicker: false })}
          >
            <h6 className="mx-2">
              <strong>
                <Badge className="shadow" bg="success">
                  Date of completion
                </Badge>
                <FontAwesomeIcon
                  className="mx-1"
                  icon={faCalendarCheck}
                  onClick={() => setShowEdit({ datePicker: true })}
                  size="lg"
                />
                <span
                  className="mx-2"
                  onClick={() => setShowEdit({ datePicker: true })}
                  style={{ cursor: "pointer" }}
                >
                  {project?.completion_date}
                  {hover.datePicker && (
                    <FontAwesomeIcon
                      className="mx-2"
                      icon={faSquarePen}
                      size="lg"
                    />
                  )}
                </span>
              </strong>
              {showEdit.datePicker && (
                <>
                  <DatePicker
                    className="btn btn-outline-success shadow my-2"
                    selected={formData.completion_date}
                    value={formData.completion_date}
                    onChange={(date) =>
                      setFormData({ ...formData, completion_date: date })
                    }
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                    showPopperArrow={false}
                    placeholderText="Change project date"
                  />
                  <FontAwesomeIcon
                    className="my-auto mx-3"
                    icon={faCircleCheck}
                    onClick={editProject}
                    style={{ cursor: "pointer" }}
                    size="lg"
                  />
                  <FontAwesomeIcon
                    className="my-auto"
                    icon={faXmark}
                    onClick={() => setShowEdit({ datePicker: false })}
                    style={{ cursor: "pointer" }}
                    size="lg"
                  />
                </>
              )}
            </h6>
          </Col>
        </Card.Body>
      </Card>

      <ProjectItems teamMembers={teamMembers?.map((member) => member.email)} />
    </>
  );
};

export default ProjectPage;

const ratingColors = {
  1: "grey",
  2: "brown",
  3: "blue",
  4: "green",
  5: "red",
};
