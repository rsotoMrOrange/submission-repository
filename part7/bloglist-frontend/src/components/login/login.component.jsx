import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "../login-form/login-form.component";
import Togglable from "../togglable/togglable.component";

import { saveUser } from "../../reducers/userReducer";
import { useNotificationDispatch } from "../../NotificationContext";

import loginService from "../../services/login";

const ERROR = "error";
const SUCCESS = "success";

const Login = () => {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      dispatch(saveUser(user));

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

  if (user === null) {
    return (
      <div>
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <button
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Login;
