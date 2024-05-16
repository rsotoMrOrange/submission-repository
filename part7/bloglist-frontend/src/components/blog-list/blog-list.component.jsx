import React from "react";
import { useQuery } from "@tanstack/react-query";

import blogService from "../../services/blogs";
import Blog from "../blog/blog.component";

const BlogList = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const blogs = result.data;

  let sortedBlogs = [];

  const compareBlogs = (a, b) => {
    return b.likes - a.likes;
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  sortedBlogs = [...blogs].sort(compareBlogs);

  return (
    <>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
