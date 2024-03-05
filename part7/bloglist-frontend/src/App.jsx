import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/blog/blog.component";
import LoginForm from "./components/login-form/login-form.component";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification/notification.component";
import BlogForm from "./components/blog-form/blog-form.component";
import Togglable from "./components/togglable/togglable.component";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";

const ERROR = "error";
const SUCCESS = "success";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const blogsReducer = useSelector((state) => state.blogs);
  let sortedBlogs = [];

  const blogFormRef = useRef();

  const compareBlogs = (a, b) => {
    return b.likes - a.likes;
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(setNotification(`Welcome ${username}`, SUCCESS, 5000));

      setPassword("");
      setUsername("");
    } catch (e) {
      dispatch(setNotification("Wrong credentials", ERROR, 5000));
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(createBlog(blogObject));
      dispatch(
        setNotification(
          `new blog added '${blogObject.title}' written by ${blogObject.author}`,
          SUCCESS,
          5000,
        ),
      );
    } catch (error) {
      dispatch(
        setNotification(`Something went wrong ${error.message}`, ERROR, 5000),
      );
    }
  };

  const updateBlog = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(
        blogs.map((blogItem) => (blogItem.id === id ? updatedBlog : blogItem)),
      );
    } catch (error) {
      dispatch(
        setNotification(`Something went wrong ${error.message}`, ERROR, 5000),
      );
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      dispatch(
        setNotification(`Something went wrong ${error.message}`, ERROR, 5000),
      );
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

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
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

  sortedBlogs = [...blogsReducer].sort(compareBlogs);
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
        {blogForm()}
      </div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={() => updateBlog(blog.id, blog)}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
