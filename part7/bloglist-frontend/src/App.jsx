import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlogList from "./components/blog-list/blog-list.component";
import BlogForm from "./components/blog-form/blog-form.component";
import Login from "./components/login/login.component";
import Notification from "./components/notification/notification.component";

import { initializeBlogs } from "./reducers/blogReducer";
import { saveUser } from "./reducers/userReducer";

const App = () => {
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

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      <Login />
      {user !== null && <BlogForm />}
      {user !== null && <BlogList />}
    </div>
  );
};

export default App;
