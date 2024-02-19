import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/blog/blog.component";
import LoginForm from "./components/login-form/login-form.component";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/notification/notification.component";
import BlogForm from "./components/blog-form/blog-form.component";
import Togglable from "./components/togglable/togglable.component";

const ERROR = "error";
const SUCCESS = "success";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  let sortedBlogs = [];

  const blogFormRef = useRef();

  const setDisplayMessage = (display, className, timer) => {
    setMessage({ display, className });
    setTimeout(() => {
      setMessage(null);
    }, timer);
  };

  const compareBlogs = (a, b) => {
    return b.likes - a.likes;
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

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
      setDisplayMessage(`Welcome ${username}`, SUCCESS, 5000);
      setPassword("");
      setUsername("");
    } catch (e) {
      setDisplayMessage("Wrong credentials", ERROR, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setDisplayMessage(
        `new blog added '${newBlog.title}' written by ${newBlog.author}`,
        SUCCESS,
        5000,
      );
    } catch (error) {
      setDisplayMessage(`Something went wrong ${error.message}`, ERROR, 5000);
    }
  };

  const updateBlog = async (id, blog) => {
    console.log(`id: ${id}, blog: ${blog}`);
    try {
      const updatedBlog = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(
        blogs.map((blogItem) => (blogItem.id === id ? updatedBlog : blogItem)),
      );
    } catch (error) {
      setDisplayMessage(`Something went wrong ${error.message}`, ERROR, 5000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      setDisplayMessage(`Something went wrong ${error.message}`, ERROR, 5000);
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
        <Notification message={message} />
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
      </div>
    );
  }

  sortedBlogs = blogs;
  sortedBlogs.sort(compareBlogs);
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
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
