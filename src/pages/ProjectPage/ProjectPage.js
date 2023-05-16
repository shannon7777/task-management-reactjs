import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import { fetchProjectData, updateProject } from "../../services/projectDetail";

import TeamMembers from "../../components/TeamMember";
import EditMembersModal from "./EditMembersModal";
import Tables from "./Tables";
import DatePicker from "react-datepicker";
import "react-circular-progressbar/dist/styles.css";

import { Badge, Card, Col, Row } from "react-bootstrap";

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

  const {
    auth: { user },
  } = useAuth();
  const { project_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const owner = teamMembers?.filter(
    (member) => member._id === project?.creator
  );
  const projectOwner = (
    <TeamMembers className="profilePicNavbar" member={owner[0]} />
  );
  const ownedByUser = owner[0]?._id === user._id ? "(You)" : null;

  const fetchAllData = async () => {
    fetchProjectData(
      project_id,
      setProject,
      setTeamMembers,
      setError,
      navigate
    );
  };

  const editProject = async (e) => {
    e.preventDefault();
    updateProject(
      project_id,
      formData,
      setFormData,
      setProject,
      setShowEdit,
      setError
    );
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
      let updatedTeamMembers = JSON.parse(
        localStorage.getItem(`teamMembers-${project_id}`)
      );
      const {
        data: { users, message },
      } = await axios.post(`projects/members/${project_id}`, newMembersArr);
      setNotify({ text: message });
      updatedTeamMembers.push(...users);
      setTeamMembers(updatedTeamMembers);
      localStorage.setItem(
        `teamMembers-${project_id}`,
        JSON.stringify(updatedTeamMembers)
      );
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
      // Grab teamMembers and projectItems from localStorage and update them
      let currentMembers = JSON.parse(
        localStorage.getItem(`teamMembers-${project_id}`)
      );
      let filteredTeamMembers = currentMembers.filter(
        (member) => !membersArr.includes(member.email)
      );
      let teamMembersToRemove = currentMembers
        .filter((member) => membersArr.includes(member.email))
        .map((member) => member._id);

      // remove ownerid from owners array in projectItems
      let projectItems = JSON.parse(
        localStorage.getItem(`projectItems-${project_id}`)
      );
      projectItems.forEach(
        (item) =>
          (item.owners = item.owners.filter(
            (id) => !teamMembersToRemove.includes(id)
          ))
      );
      setTeamMembers(filteredTeamMembers);
      setNotify({ text: data.message });
      // Save updated teamMembers & projectItems back into localStorage
      localStorage.setItem(
        `teamMembers-${project_id}`,
        JSON.stringify(filteredTeamMembers)
      );
      localStorage.setItem(
        `projectItems-${project_id}`,
        JSON.stringify(projectItems)
      );
    } catch (error) {
      throw setError({ text: error.response.data.message });
    }
  };

  const onChangeEdit = (e) => {
    // must use e.target.getAttribute('name') if you are using anything other than <input> of <form> tags
    setFormData({
      ...formData,
      [e.target.getAttribute("name")]: e.target.innerHTML,
    });
  };

  const disableNewlines = (e) => {
    const keyCode = e.keyCode || e.which;

    if (keyCode === 13) {
      e.returnValue = false;
      if (e.preventDefault) e.preventDefault();
    }
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
      <Card className="my-3" style={{ borderColor: "white" }}>
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
              <p
                suppressContentEditableWarning={true}
                contentEditable={true}
                onBlur={editProject}
                onInput={onChangeEdit}
                onKeyDown={disableNewlines}
                value={formData.title}
                name="title"
                type="text"
                style={{ cursor: "pointer" }}
              >
                {project.title}
              </p>

              {hover.title && (
                <FontAwesomeIcon
                  className="m-2"
                  icon={faPenToSquare}
                  size="sm"
                />
              )}
            </Col>
          </Card.Header>
        </h2>

        <Row>
          <Col className="m-3 rounded shadow">
            <Card.Body className="p-4">
              <Card.Title>TEAM MEMBERS</Card.Title>
              <Card.Text
                className="mt-3"
                onMouseOver={() => setHover({ users: true })}
                onMouseOut={() => setHover({ users: false })}
              >
                <FontAwesomeIcon
                  className="px-2"
                  icon={faUsersLine}
                  size="xl"
                />
                <Badge className="h-50 my-2" bg="success">
                  {teamMembers?.length}
                </Badge>
                <span className="vr mx-3" />
                <span className="p-2">
                  {teamMembers &&
                    teamMembers.map((member, index) => (
                      <span key={index}>
                        <TeamMembers
                          className="profilePicNavbar"
                          member={member}
                        />
                      </span>
                    ))}
                </span>
                {hover.users && (
                  <FontAwesomeIcon
                    className=""
                    icon={faUserGear}
                    onClick={() => setShowEdit({ users: true })}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {editMembersModal}
              </Card.Text>
              <Card.Text>
                <Badge bg="dark" className="ms-auto">
                  Project Owner:
                </Badge>
                {projectOwner} {ownedByUser}
              </Card.Text>
            </Card.Body>
          </Col>

          <Col className="m-3 rounded shadow">
            <Card.Body className="p-4">
              <Card.Title>PROJECT DETAILS</Card.Title>
              <Card.Text className="d-flex justify-content-between">
                <span className="d-flex">
                  <Badge bg="dark">Description :</Badge>

                  {hover.description && (
                    <FontAwesomeIcon
                      className="mx-3"
                      icon={faPenToSquare}
                      size="lg"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </span>

                <span className="d-flex">
                  <Badge className="mx-3" bg="dark">
                    Priority :
                  </Badge>
                  {[...Array(project?.priority)].map((star, index) => (
                    <FontAwesomeIcon
                      icon={faStar}
                      key={index}
                      color={ratingColors[project?.priority]}
                    />
                  ))}
                </span>
              </Card.Text>

              <blockquote
                onMouseOver={() => setHover({ description: true })}
                onMouseOut={() => setHover({ description: false })}
                suppressContentEditableWarning={true}
                contentEditable={true}
                onBlur={editProject}
                onInput={onChangeEdit}
                onKeyDown={disableNewlines}
                value={formData.description}
                name="description"
                type="text"
              >
                {project.description}
              </blockquote>

              <span
                className=""
                onMouseOver={() => setHover({ datePicker: true })}
                onMouseOut={() => setHover({ datePicker: false })}
              >
                <strong>
                  <Badge className="shadow" bg="dark">
                    Date of completion :
                  </Badge>
                  <FontAwesomeIcon
                    className="mx-2"
                    icon={faCalendarCheck}
                    onClick={() => setShowEdit({ datePicker: true })}
                    size="lg"
                  />
                  <span
                    className="mx-2"
                    onClick={() => setShowEdit({ datePicker: true })}
                    style={{ cursor: "pointer" }}
                  >
                    {new Date(project?.completion_date).toDateString()}
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
                  <span>
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
                  </span>
                )}
              </span>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Tables
        teamMembers={teamMembers?.map((member) => member.email)}
        completion_date={project.completion_date}
      />
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
