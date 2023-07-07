import { useEffect } from "react";
import Header from "../../components/Header";
import useFetchImg from "../../hooks/useFetchImg";
import { fetchAllTasks } from "../../services/task";
import { getProjects } from "../../services/projectDetail";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { AddTask, ArrowForward, AssignmentInd } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Homepage = ({ user, setTasks, setProjects }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchImg = useFetchImg();

  useEffect(() => {
    if (localStorage.getItem("userImg")) return;
    fetchImg();
    fetchAllTasks(user._id, setTasks);
    getProjects(user._id, setProjects);
  }, [user]);

  const allTasks = JSON.parse(localStorage.getItem("tasks"));
  const completedTasks = allTasks?.filter(
    (task) => task.progress === "Completed"
  );

  const allProjects = JSON.parse(localStorage.getItem("projects"));

  let upcomingTasks = allTasks
    .sort((a, b) => new Date(a.dateToComplete) - new Date(b.dateToComplete))
    .slice(0, 3);

  const cardStyle = {
    p: 1,
    width: 300,
    borderRadius: 5,
    background: colors.primary[400],
  };

  const buttonStyle = {
    color: colors.grey[100],
    borderRadius: 3,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 14,
  };

  return (
    <Box>
      <Header title="Overview" variant="h1" sx={{ mt: 2 }} />
      <Header title={`Welcome, ${user.username}`} variant="h3" sx={{ mt: 2 }} />

      <Grid alignContent="" container spacing={4}>
        <Grid item xs={6} alignItems="center">
          <Card sx={cardStyle} elevation={5}>
            <CardContent sx={{ display: "flex", gap: 4 }}>
              <AddTask
                color="success"
                sx={{ fontSize: 40, color: colors.greenAccent[600] }}
              />
              <div>
                <Typography variant="h5" color="text.secondary">
                  Done Tasks
                </Typography>
                <Typography variant="h1" fontWeight="bold">
                  {completedTasks?.length}
                </Typography>
              </div>
            </CardContent>

            <Divider flexItem />

            <CardActions>
              <Button
                variant="outline"
                to={`/tasks`}
                component={Link}
                endIcon={<ArrowForward />}
                sx={buttonStyle}
              >
                See all Tasks
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card sx={cardStyle} elevation={5}>
            <CardContent sx={{ display: "flex", gap: 4 }}>
              <AssignmentInd
                sx={{ fontSize: 40, color: colors.greenAccent[500] }}
              />
              <div>
                <Typography variant="h5" color="text.secondary">
                  Team Projects
                </Typography>

                <Typography variant="h1" fontWeight="bold">
                  {allProjects?.length}
                </Typography>
              </div>
            </CardContent>

            <Divider flexItem />

            <CardActions>
              <Button
                variant="outline"
                sx={buttonStyle}
                to={`/team-projects`}
                component={Link}
                endIcon={<ArrowForward />}
              >
                See all projects
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card
            sx={{
              p: 1,
              width: 500,
              borderRadius: 5,
              background: colors.primary[400],
            }}
            elevation={5}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                Upcoming tasks
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Sorted by due date
              </Typography>

              <Divider flexItem sx={{ my: 1 }} />

              {upcomingTasks.map((task, index) => (
                <div key={index} className="d-flex">
                  <Box p={1}>
                    <p>{task.dateToComplete.split(" ")[1]}</p>
                    <p>{new Date(task.dateToComplete).getDate()}</p>
                  </Box>
                  <Typography variant="h5">{task.text}</Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Homepage;
