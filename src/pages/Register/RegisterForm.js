import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { HowToReg, Login } from "@mui/icons-material";

const Register = ({ onChange, onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Card
        elevation={4}
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
          width: 700,
          background: colors.greenAccent[700],
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ alignItems: "center" }}>
          <Typography
            color={colors.primary[500]}
            variant="h3"
            fontWeight="bold"
            mb={2}
          >
            Create Your Account
          </Typography>
          <Stack gap={2}>
            <Box gap={7} display="flex" justifyContent="space-between">
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                variant="standard"
                type="text"
                onChange={onChange}
                fullWidth
              />

              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                variant="standard"
                onChange={onChange}
                fullWidth
              />
            </Box>

            <Box gap={7} display="flex" justifyContent="space-between">
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                type="text"
                variant="standard"
                onChange={onChange}
                fullWidth
              />
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                type="text"
                variant="standard"
                onChange={onChange}
                fullWidth
              />
            </Box>

            <TextField
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={onChange}
              variant="standard"
            />

            <TextField
              required
              id="passwordRetype"
              name="passwordRetype"
              label="Retype Password"
              type="password"
              variant="standard"
              onChange={onChange}
            />
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            sx={{ bgcolor: colors.blueAccent[700], borderRadius: 2, m: 1 }}
            onClick={onSubmit}
            variant="contained"
            type="submit"
            endIcon={<HowToReg />}
          >
            Register
          </Button>

          <div className="d-flex">
            <Typography mx={1} mt={1} color="text.secondary">
              Already have an account?{" "}
            </Typography>
            <Button
              component={Link}
              to={`/login`}
              endIcon={<Login />}
              sx={{ borderRadius: 2, bgcolor: colors.blueAccent[400] }}
              variant="contained"
            >
              Log In
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  );
};

export default Register;
