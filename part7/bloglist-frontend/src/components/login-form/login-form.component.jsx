import { Button, TextField } from "@mui/material";
import PropType from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  password,
  onChangeUsername,
  onChangePassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <TextField
        variant="outlined"
        label="username"
        id="username"
        value={username}
        name="Username"
        onChange={onChangeUsername}
        size="small"
        sx={{ m: 1, display: "block" }}
      />
      <TextField
        variant="outlined"
        label="password"
        id="password"
        value={password}
        name="Password"
        onChange={onChangePassword}
        size="small"
        sx={{ m: 1, display: "block" }}
        type="password"
      />
      <Button id="login-button" type="submit" sx={{ m: 1 }} variant="contained">
        Login
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropType.func.isRequired,
  username: PropType.string.isRequired,
  password: PropType.string.isRequired,
  onChangeUsername: PropType.func.isRequired,
  onChangePassword: PropType.func.isRequired,
};

export default LoginForm;
