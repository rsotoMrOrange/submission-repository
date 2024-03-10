import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "../blog/blog.component";

import { setNotification } from "../../reducers/notificationReducer";
import { likeBlogThunk, removeBlog } from "../../reducers/blogReducer";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  let sortedBlogs = [];

  const compareBlogs = (a, b) => {
    return b.likes - a.likes;
  };

  const updateBlog = async (id, blog) => {
    try {
      dispatch(likeBlogThunk(id));
    } catch (error) {
      dispatch(
        setNotification(`Something went wrong ${error.message}`, ERROR, 5000),
      );
    }
  };

  const deleteBlog = async (id) => {
    try {
      dispatch(removeBlog(id));
    } catch (error) {
      dispatch(
        setNotification(`Something went wrong ${error.message}`, ERROR, 5000),
      );
    }
  };

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
