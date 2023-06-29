import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import {
  fetchProjectData,
  updateProject,
  inviteMembers,
  deleteMembers,
} from "../../services/projectDetail";

import TeamMembers from "../../components/TeamMember";
import EditMembersModal from "./EditMembersModal";
import Tables from "./Tables";
import "react-circular-progressbar/dist/styles.css";

import {
  Box,
  Stack,
  Card,
  CardContent,
  Chip,
  Typography,
  CardActions,
  IconButton,
  Button,
  useTheme,
  Divider,
  Badge,
} from "@mui/material";
import {
  ArrowForward,
  Assignment,
  Diversity3,
  Edit,
  EditCalendar,
  Group,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

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
  });

  const {
    auth: { user },
  } = useAuth();
  const { project_id } = useParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetchAllData();
  }, []);

  const owner = teamMembers?.filter(
    (member) => member._id === project?.creator
  );
  const projectOwner = (
    <TeamMembers
      className="teamMemberpic mx-2"
      member={owner[0]}
      width={25}
      height={25}
    />
  );
  const ownedByUser =
    owner[0]?._id === user._id ? (
      <Typography color="text.secondary">( You )</Typography>
    ) : null;

  const fetchAllData = async () => {
    fetchProjectData(
      project_id,
      setProject,
      setTeamMembers,
      setError,
      navigate
    );
  };

  const editProject = async () => {
    updateProject(
      project_id,
      formData,
      setFormData,
      setProject,
      setShowEdit,
      setError
    );
  };

  const editCompletionDate = async (date) => {
    let dateObj = { completion_date: dayjs(date).toDate().toDateString() };
    await updateProject(
      project_id,
      dateObj,
      setFormData,
      setProject,
      setShowEdit,
      setError
    );
    setShowEdit({ datePicker: false });
  };

  const addMember = async (membersArr) => {
    inviteMembers(
      membersArr,
      teamMembers,
      setTeamMembers,
      setInfo,
      setError,
      setNotify,
      project_id
    );
  };

  const removeMember = async (membersArr) => {
    deleteMembers(membersArr, setTeamMembers, project_id, setNotify, setError);
  };

  const onChangeEdit = (e) => {
    // must use e.target.getAttribute('name') if you are using anything other than <input> of <form> tags
    setFormData({
      ...formData,
      [e.target.getAttribute("name")]: e.target.innerHTML,
    });
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
      <Stack direction="row">
        <Chip
          sx={{
            borderRadius: 1,
            px: 1,
            height: 50,
            bgcolor: colors.grey[600],
            boxShadow: 4,
          }}
          variant="filled"
          label={<Typography variant="h2">Project :</Typography>}
        />

        <Typography
          onMouseOver={() => setHover({ title: true })}
          onMouseOut={() => setHover({ title: false })}
          variant="h2"
          suppressContentEditableWarning={true}
          contentEditable={true}
          onBlur={editProject}
          onInput={onChangeEdit}
          onKeyDown={disableNewlines}
          value={formData.title}
          name="title"
          type="text"
          sx={{
            "&:focus": {
              outline: "none",
              border: "none",
            },
            cursor: "pointer",
            mx: 3,
            mt: 1,
          }}
        >
          {project.title}
        </Typography>
        {hover.title && <Edit sx={{ mt: 2 }} />}
      </Stack>

      <Box display="flex" justifyContent="space-between">
        <Card
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            minWidth: "45%",
            maxWidth: "45%",
            my: 2,
            p: 1,
            background: colors.primary[400],
          }}
        >
          <CardContent>
            <Stack spacing={1}>
              <div className="d-flex">
                <Typography variant="h4" mr={2}>
                  Description
                </Typography>
                {hover.description && <Edit />}
              </div>
              <Typography
                overflow="auto"
                onMouseOver={() => setHover({ description: true })}
                onMouseOut={() => setHover({ description: false })}
                suppressContentEditableWarning={true}
                contentEditable={true}
                onBlur={editProject}
                onInput={onChangeEdit}
                onKeyDown={disableNewlines}
                value={formData.description}
                name="description"
                variant="h6"
                sx={{
                  background: colors.grey[500],
                  borderRadius: 1,
                  p: 1,
                  maxHeight: "5rem",
                  overflow: "auto",
                  cursor: "pointer",
                }}
              >
                {project.description}
              </Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                gap={1}
                py={1}
                onMouseOver={() => setHover({ datePicker: true })}
                onMouseOut={() => setHover({ datePicker: false })}
                onMouseLeave={() => setShowEdit({ datePicker: false })}
                onClick={() => setShowEdit({ datePicker: true })}
                sx={{ cursor: "pointer" }}
              >
                {showEdit.datePicker ? (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{
                        width: 150,
                      }}
                      className="mt-3"
                      label="Edit the completion date"
                      value={dayjs(project.completion_date)}
                      onChange={(date) => editCompletionDate(date)}
                      slotProps={{ textField: { size: "small" } }}
                      closeOnSelect={true}
                    />
                  </LocalizationProvider>
                ) : (
                  <>
                    <EditCalendar />
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{
                        color: colors.greenAccent[500],
                      }}
                    >
                      Completion Date
                    </Typography>
                    {hover.datePicker && <Edit />}
                  </>
                )}
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  ml="auto"
                  fontWeight="bold"
                >
                  {new Date(project.completion_date).toDateString()}
                </Typography>
              </Box>
            </Stack>
          </CardContent>

          <Box mt="auto">
            <Divider color="darkgrey" />

            <CardActions sx={{ mt: 0.5 }}>
              <Button
                component={Link}
                to={`/project-dashboard/${project_id}`}
                variant="contained"
                startIcon={<Assignment />}
                endIcon={<ArrowForward />}
                sx={{ bgcolor: colors.blueAccent[600], borderRadius: 3 }}
              >
                Project Dashboard
              </Button>
            </CardActions>
          </Box>
        </Card>

        <Card
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
            minWidth: "45%",
            my: 2,
            p: 1,
            background: colors.primary[400],
          }}
        >
          <CardContent>
            <Typography variant="h4">Team Members</Typography>
            <Stack direction="row" my={2}>
              <span className="d-flex mt-1">
                {teamMembers &&
                  teamMembers.map((member, index) => (
                    <TeamMembers
                      key={index}
                      member={member}
                      width={25}
                      height={25}
                    />
                  ))}
              </span>
              <IconButton
                sx={{ mx: 2 }}
                onClick={() => setShowEdit({ users: true })}
              >
                <Badge
                  badgeContent={
                    <Typography fontSize={12}>{teamMembers.length}</Typography>
                  }
                  color="success"
                  sx={{
                    ".MuiBadge-badge": {
                      height: 15,
                      width: 15,
                      minWidth: 15,
                    },
                  }}
                >
                  <Diversity3 />
                </Badge>
              </IconButton>
              {editMembersModal}
            </Stack>

            <Stack direction="row" gap={2}>
              <Typography
                sx={{ color: colors.greenAccent[400] }}
                display="flex"
                variant="h6"
                color="text.secondary"
              >
                Project Owner:
              </Typography>
              <span>{projectOwner}</span>
              {ownedByUser}
            </Stack>
          </CardContent>

          <Box mt="auto">
            <Divider color="darkgrey" />

            <CardActions sx={{ mt: 0.5 }}>
              <Button
                component={Link}
                to={`/members-dashboard/${project_id}`}
                variant="contained"
                endIcon={<ArrowForward />}
                startIcon={<Group />}
                sx={{ bgcolor: colors.blueAccent[600], borderRadius: 3 }}
              >
                Members Dashboard
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Box>

      {/* <Card className="my-3" style={{ borderColor: "white" }}>
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
              <Box
                onMouseOver={() => setHover({ users: true })}
                onMouseOut={() => setHover({ users: false })}
              >
                <Stack direction="row">
                  <FontAwesomeIcon
                    className="px-2"
                    icon={faUsersLine}
                    size="xl"
                  />
                  <Badge className="h-50 my-2" bg="success">
                    {teamMembers?.length}
                  </Badge>
                  <span className="vr mx-3" />
                  {teamMembers &&
                    teamMembers.map((member, index) => (
                      <TeamMembers
                        key={index}
                        member={member}
                        width={25}
                        height={25}
                      />
                    ))}
                  {hover.users && (
                    <FontAwesomeIcon
                      className=""
                      icon={faUserGear}
                      onClick={() => setShowEdit({ users: true })}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  {editMembersModal}
                </Stack>
              </Box>
              <Box>
                <Badge bg="dark">Project Owner:</Badge>
                {projectOwner} {ownedByUser}
              </Box>
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
      </Card> */}

      <Tables completion_date={project.completion_date} />
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

export const disableNewlines = (e) => {
  const keyCode = e.keyCode || e.which;

  if (keyCode === 13) {
    e.returnValue = false;
    if (e.preventDefault) e.preventDefault();
  }
};
