import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import BlogList from "./components/blog-list/blog-list.component";
import BlogForm from "./components/blog-form/blog-form.component";
import Login from "./components/login/login.component";
import Notification from "./components/notification/notification.component";
import UserList from "./components/user-list/user-list.component";

import { saveUser } from "./reducers/userReducer";

const Home = () => {
  return (
    <>
      <BlogForm />
      <BlogList />
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(saveUser(user));
    }
  }, []);

  const padding = {
    padding: 5,
    margin: 5,
  };

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <Login />

      {user !== null && (
        <Router>
          <hr />
          <div style={padding}>
            <Link style={padding} to="/">
              home
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
