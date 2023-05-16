import { ProgressBar as Progress } from "react-bootstrap";

const ProgressBar = ({ progressBarDataTest }) => {
  return (
    <Progress className="h-50 w-75 m-3">
      {progressBarDataTest.map((data, index) => (
        <Progress
          striped
          style={{ backgroundColor: data.color }}
          animated
          now={data.value}
          key={index}
        />
      ))}
    </Progress>
  );
};

export default ProgressBar;
