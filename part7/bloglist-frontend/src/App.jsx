import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import BlogList from "./components/blog-list/blog-list.component";
import BlogForm from "./components/blog-form/blog-form.component";
import BlogView from "./components/blog-view/blow-view.component";
import Login from "./components/login/login.component";
import Notification from "./components/notification/notification.component";
import UserList from "./components/user-list/user-list.component";
import UserView from "./components/user-view/user-view.component";

import { useUserDispatch, useUserValue } from "./UserContext";

const Home = () => {
  return (
    <>
      <div></div>
      <BlogForm />
      <BlogList />
    </>
  );
};

const App = () => {
  const { user } = useUserValue();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET_USER", payload: { user: user } });
      userDispatch({ type: "SET_TOKEN", payload: { token: user.token } });
    } else {
      navigate("/login");
    }
  }, []);

  const padding = {
    padding: 5,
    margin: 5,
  };

  return (
    <div>
      {user && (
        <div style={padding}>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <span>{user?.name} logged in</span>
          <button
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            logout
          </button>
        </div>
      )}

      <h1>blogs</h1>
      <Notification />
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </div>
  );
};

export default App;
