import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import {
  HowToReg,
  Login,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";

const LoginForm = ({ onChange, onSubmit }) => {
  const [visible, setVisible] = useState(false);
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
                label="Email"
                variant="standard"
                onChange={onChange}
              />

              <TextField
                id="password"
                name="password"
                label="Password"
                type={visible ? "text" : "password"}
                onChange={onChange}
                variant="standard"
                helperText="Do not share your password with anyone"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {visible ? (
                        <IconButton
                          size="small"
                          onClick={() => setVisible(false)}
                        >
                          <Visibility />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          onClick={() => setVisible(true)}
                        >
                          <VisibilityOff />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              sx={{
                width: 200,
                bgcolor: colors.blueAccent[700],
                borderRadius: 2,
                my: 1,
              }}
              onClick={onSubmit}
              variant="contained"
              type="submit"
              endIcon={<Login />}
              size="large"
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
                sx={{ borderRadius: 2, bgcolor: colors.blueAccent[700] }}
                variant="contained"
                size=""
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
