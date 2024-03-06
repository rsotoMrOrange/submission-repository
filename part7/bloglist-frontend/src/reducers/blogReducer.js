import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    like(state, action) {
      let filteredBlogs = state.filter((blog) => blog.id !== action.payload.id);
      return [...filteredBlogs, action.payload];
    },
    remove(state, action) {
      let filteredBlogs = state.filter((blog) => blog.id !== action.payload);
      return [...filteredBlogs];
    },
  },
});

export const { appendBlog, setBlogs, like, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlogThunk = (id) => {
  return async (dispatch, getState) => {
    let blog = getState().blogs.find((blog) => blog.id === id);
    blog = {
      ...blog,
      likes: blog.likes + 1,
    };
    const newBlog = await blogService.update(id, blog);
    dispatch(like(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(remove(id));
  };
};

export default blogSlice.reducer;
