import { Badge, Col, ProgressBar } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { timelineBar, progressColors } from "../Projectlist/Project";

const ProgressAndTimeline = ({ projectItems, project }) => {
  const completionBar = () => {
    let completedItems = projectItems?.filter(
      (item) => item.progress === "Completed"
    ).length;
    let totalItems = projectItems?.length;
    let percentage = (completedItems / totalItems) * 100;
    return Math.round(percentage);
  };

  const colors = () => {
    if (completionBar <= 25) return "crimson";
    if (completionBar > 25 && completionBar <= 50) return "Darkcyan";
    if (completionBar > 50 && completionBar <= 75) return "Indianred";
    if (completionBar > 75) return "olivedrab";
    return "green";
  };

  const daysLeft = () => {
    let totalDays =
      (new Date(project.completion_date) - new Date(project.createdAt)) /
      1000 /
      60 /
      60 /
      24;
    let daysPassed =
      (new Date() - new Date(project.createdAt)) / 1000 / 60 / 60 / 24;
    return Math.round(totalDays - daysPassed);
  };

  return (
    <Col className="d-flex m-2 shadow border rounded" style={{ height: 230 }}>
      <Col>
        <p className="p-1 text-center">
          <strong>Completion Rate</strong>
        </p>
        <div
          style={{
            width: "180px",
            height: "180px",
            padding: "20px 20px",
            marginLeft: "2.5rem",
          }}
        >
          <CircularProgressbar
            styles={buildStyles({
              textColor: "black",
              textSize: "1rem",
              pathColor: colors(),
            })}
            value={completionBar()}
            text={`${completionBar()} %`}
            strokeWidth={9}
          />
        </div>
      </Col>

      <Col className="" style={{ height: "180px" }}>
        <p className="p-1 text-center">
          <strong>Timeline</strong>
        </p>
        <ProgressBar
          className="mt-5"
          striped
          variant={progressColors(project.createdAt, project.completion_date)}
          now={timelineBar(project.createdAt, project.completion_date)}
          animated
          label={`${timelineBar(project.createdAt, project.completion_date)} %`}
        />
        <Badge variant="success">Days left: {daysLeft()} </Badge>
        <Badge variant="success">
          Date Today: {new Date().toDateString()}{" "}
        </Badge>
        <Badge variant="success">
          Completion date: {new Date(project.completion_date).toDateString()}{" "}
        </Badge>
      </Col>
    </Col>
  );
};

export default ProgressAndTimeline;
