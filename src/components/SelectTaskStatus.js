import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";

const SelectTaskStatus = ({ selectOptions, onChange, progress, label }) => {
  return (
    <>
      <FormControl size="small">
        <InputLabel id="age-label">{label}</InputLabel>
        <Select
          labelId="age-label"
          id="demo-simple-select"
          value={progress}
          label="Change status of task"
          onChange={onChange}
        >
          {selectOptions.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectTaskStatus;
