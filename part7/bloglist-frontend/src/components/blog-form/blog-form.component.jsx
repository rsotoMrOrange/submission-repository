import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import Togglable from "../togglable/togglable.component";

import { setNotification } from "../../reducers/notificationReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs";

const ERROR = "error";
const SUCCESS = "success";

const BlogForm = () => {
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);
  const togglableRef = useRef(null);
  const dispatch = useDispatch();

  const createBlogFunc = async (blogObject) => {
    try {
      togglableRef.current.toggleVisibility();
      newBlogMutation.mutate(blogObject);
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

  const addBlog = (event) => {
    event.preventDefault();
    createBlogFunc({
      author,
      title,
      url,
      likes,
    });

    setAuthor("");
    setTitle("");
    setUrl("");
    setLikes(0);
  };

  return (
    <Togglable buttonLabel="New Blog" ref={togglableRef}>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            className="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            className="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            className="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes
          <input
            className="likes"
            type="number"
            value={likes}
            name="Likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
