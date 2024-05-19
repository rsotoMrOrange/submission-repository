import React, { useState, useRef } from "react";

import Togglable from "../togglable/togglable.component";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../../services/blogs";
import { useNotificationDispatch } from "../../NotificationContext";

import { Button, Stack, TextField } from "@mui/material";

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
  const notificationDispatch = useNotificationDispatch();

  const createBlogFunc = async (blogObject) => {
    try {
      togglableRef.current.toggleVisibility();
      newBlogMutation.mutate(blogObject);
      notificationDispatch({
        type: "SHOW",
        payload: {
          message: `new blog added '${blogObject.title}' written by ${blogObject.author}`,
          className: SUCCESS,
        },
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE",
        });
      }, 5000);
    } catch (error) {
      notificationDispatch({
        type: "SHOW",
        payload: {
          message: `Something went wrong ${error.message}`,
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
        <Stack direction="row" spacing={2} mb={1}>
          <TextField
            margin="dense"
            size="small"
            className="title"
            name="Title"
            label="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            margin="dense"
            size="small"
            className="author"
            name="Author"
            label="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Stack>
        <Stack direction="row" spacing={2} mb={1}>
          <TextField
            margin="dense"
            size="small"
            className="url"
            name="url"
            label="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <TextField
            type="number"
            margin="dense"
            size="small"
            className="likes"
            name="Likes"
            label="Likes"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </Stack>
        <Button variant="contained" sx={{ mb: 1 }} type="submit">
          save
        </Button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
