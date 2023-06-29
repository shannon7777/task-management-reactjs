import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { HowToReg, Login } from "@mui/icons-material";

const LoginForm = ({ onChange, onSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Card
        elevation={4}
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          p: 2,
          width: 500,
          background: colors.greenAccent[700],
          borderRadius: 4,
        }}
      >
        <Form>
          <CardContent sx={{ alignItems: "center" }}>
            <Typography
              color={colors.primary[500]}
              variant="h3"
              fontWeight="bold"
              mb={2}
            >
              Log in
            </Typography>
            <Stack gap={2}>
              <TextField
                required
                id="email"
                name="email"
                label="email"
                variant="standard"
                onChange={onChange}
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                onChange={onChange}
                variant="standard"
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              sx={{ bgcolor: colors.blueAccent[700], borderRadius: 2, m: 1 }}
              onClick={onSubmit}
              variant="contained"
              type="submit"
              endIcon={<Login />}
            >
              Continue
            </Button>

            <div className="d-flex">
              <Typography mx={1} mt={1} color="text.secondary">
                Need an Account?{" "}
              </Typography>
              <Button
                component={Link}
                to={`/register`}
                endIcon={<HowToReg />}
                sx={{ borderRadius: 2, bgcolor: colors.blueAccent[400] }}
                variant="contained"
              >
                Register
              </Button>
            </div>
          </CardActions>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;
