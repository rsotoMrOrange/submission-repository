import React, { useState, useEffect } from "react";

import LoginForm from "../login-form/login-form.component";
import Togglable from "../togglable/togglable.component";

import { useNotificationDispatch } from "../../NotificationContext";

import loginService from "../../services/login";
import { useUserDispatch } from "../../UserContext";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

const ERROR = "error";
const SUCCESS = "success";

const Login = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET_USER", payload: { user: user } });
      userDispatch({ type: "SET_TOKEN", payload: { token: user.token } });
      navigate("/");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "SET_USER", payload: { user: user } });
      userDispatch({ type: "SET_TOKEN", payload: { token: user.token } });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      notificationDispatch({
        type: "SHOW",
        payload: {
          message: `Welcome ${username}`,
          className: SUCCESS,
        },
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE",
        });
      }, 5000);

      setPassword("");
      setUsername("");
      navigate("/");
    } catch (e) {
      notificationDispatch({
        type: "SHOW",
        payload: {
          message: "Wrong credentials",
          className: ERROR,
        },
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE",
        });
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          onChangeUsername={({ target }) => setUsername(target.value)}
          onChangePassword={({ target }) => setPassword(target.value)}
        />
      </Togglable>
    );
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        log in to application
      </Typography>
      {loginForm()}
    </Box>
  );
};

export default Login;
