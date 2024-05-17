import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getById, update, remove, createComment } from "../../services/blogs";
import { useNotificationDispatch } from "../../NotificationContext";
import { useState } from "react";

import { Button, Box, Link, IconButton, Typography } from "@mui/material";

const ERROR = "error";

const BlogView = () => {
  const blogId = useParams().id;
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const result = useQuery({
    queryKey: ["blogs", { id: blogId }],
    queryFn: () => getById(blogId),
    refetchOnWindowFocus: false,
  });

  const blog = result.data;

  const removeBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id);
    }
  };

  const addCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (commentedBlog) => {
      queryClient.setQueryData(
        ["blogs", { id: blogId }],
        (oldBlog) => commentedBlog,
      );
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (likedBlog) => {
      queryClient.setQueryData(["blogs", { id: blogId }], (oldBlog) =>
        oldBlog
          ? {
              ...oldBlog,
              likes: likedBlog.likes,
            }
          : oldBlog,
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: (id) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.filter((blog) => blog.id !== id),
      );
    },
  });

  const addComment = async () => {
    try {
      addCommentMutation.mutate({
        blogId: blog.id,
        content: comment,
      });
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

  const updateBlog = async () => {
    try {
      let newObject = {
        ...blog,
        likes: blog.likes + 1,
      };
      likeBlogMutation.mutate({
        id: blog.id,
        newObject,
      });
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

  const deleteBlog = async (id) => {
    try {
      deleteBlogMutation.mutate(id);
      navigate("/");
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

  const isLoggedUserOwner = () => {
    const username = JSON.parse(
      window.localStorage.getItem("loggedBlogappUser"),
    )?.username;
    return username === blog?.user?.username;
  };

  if (!blog) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {blog.title}
      </Typography>
      <Box marginBottom={1}>
        <Link href={blog.url} underline="hover">
          {blog.url}
        </Link>
      </Box>
      <Typography variant="body">
        {blog.likes} <Button onClick={updateBlog}>like</Button>
      </Typography>
      <p>added by {blog?.user?.name}</p>
      {isLoggedUserOwner() && <button onClick={removeBlog}>remove</button>}
      <h3>Comments</h3>
      <input
        type="text"
        placeholder="add your comment..."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      <button onClick={addComment}>add comment</button>
      {blog.comments.length > 0 && (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogView;
