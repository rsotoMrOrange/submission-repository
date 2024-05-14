import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import blogService from "../../services/blogs";
import Blog from "../blog/blog.component";

import { useNotificationDispatch } from "../../NotificationContext";

const ERROR = "error";

const BlogList = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (likedBlog) => {
      queryClient.setQueryData(["blogs"], (oldData) => {
        return oldData.map((blog) => {
          if (blog.id === likedBlog.id) {
            return {
              ...blog,
              likes: likedBlog.likes,
            };
          }
          return blog;
        });
      });
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (id) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.filter((blog) => blog.id !== id),
      );
    },
  });

  const blogs = result.data;

  let sortedBlogs = [];

  const compareBlogs = (a, b) => {
    return b.likes - a.likes;
  };

  const updateBlog = async (id, blog) => {
    try {
      let newObject = {
        ...blog,
        likes: blog.likes + 1,
      };
      likeBlogMutation.mutate({
        id,
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

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  sortedBlogs = [...blogs].sort(compareBlogs);

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={() => updateBlog(blog.id, blog)}
          deleteBlog={deleteBlog}
        />
      ))}
    </>
  );
};

export default BlogList;
