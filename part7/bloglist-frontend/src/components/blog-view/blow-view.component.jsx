import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getById, update, remove, createComment } from "../../services/blogs";
import { useNotificationDispatch } from "../../NotificationContext";
import { useState } from "react";

import {
  Button,
  Box,
  Link,
  Typography,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    } finally {
      setComment("");
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
    <Box>
      <Typography variant="h2" gutterBottom>
        {blog.title} by {blog.author}
      </Typography>
      <Box m={2}>
        <Link href={blog.url} underline="hover">
          {blog.url}
        </Link>
        <Typography variant="body" sx={{ display: "block" }}>
          {blog.likes} <Button onClick={updateBlog}>like</Button>
        </Typography>
        <Typography variant="body" sx={{ display: "block" }}>
          added by {blog?.user?.name}
        </Typography>
        {isLoggedUserOwner() && (
          <Button
            sx={{ mt: 2 }}
            onClick={removeBlog}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            remove
          </Button>
        )}
      </Box>
      <Typography variant="h3" gutterBottom>
        Comments
      </Typography>
      <TextField
        label="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        size="small"
        sx={{ mx: 1 }}
      />
      <Button variant="contained" onClick={addComment}>
        add comment
      </Button>
      {blog.comments.length > 0 && (
        <List>
          {blog.comments.map((comment) => (
            <ListItem key={comment.id}>
              <Box
                padding={1}
                sx={{
                  "&:hover": {
                    background: "#def1ff",
                    borderRadius: "8%",
                  },
                }}
              >
                <Typography variant="body">{comment.content}</Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default BlogView;
