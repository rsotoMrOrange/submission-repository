import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogList from "./components/blog-list/blog-list.component";
import BlogForm from "./components/blog-form/blog-form.component";
import LoginForm from "./components/login-form/login-form.component";
import Notification from "./components/notification/notification.component";
import Togglable from "./components/togglable/togglable.component";

import loginService from "./services/login";

import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { saveUser } from "./reducers/userReducer";

const ERROR = "error";
const SUCCESS = "success";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(saveUser(user));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      dispatch(saveUser(user));

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      dispatch(setNotification(`Welcome ${username}`, SUCCESS, 5000));

      setPassword("");
      setUsername("");
    } catch (e) {
      dispatch(setNotification("Wrong credentials", ERROR, 5000));
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
        <Notification />
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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
        <BlogForm />
      </div>
      <BlogList />
    </div>
  );
};

export default App;
